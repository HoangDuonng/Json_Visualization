"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import * as Y from "yjs";
import useJson from "../../store/useJson";

const WS_SERVER_URL = process.env.NEXT_PUBLIC_WS_SERVER_URL || "ws://localhost:3002";

export interface CollaboratorUser {
  id: string;
  username?: string;
  color?: string;
}

interface CollabContextType {
  socket: Socket | null;
  roomId: string | null;
  isCollaborating: boolean;
  startCollaboration: (roomId: string, password?: string) => void;
  stopCollaboration: () => void;
  collaborators: CollaboratorUser[];
  passwordRequiredRoom: string | null;
  setPasswordRequiredRoom: (roomId: string | null) => void;
}

const CollabContext = createContext<CollabContextType | null>(null);

export const useCollab = () => {
  const context = useContext(CollabContext);
  if (!context) {
    throw new Error("useCollab must be used within a CollabProvider");
  }
  return context;
};

export const CollabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [collaborators, setCollaborators] = useState<CollaboratorUser[]>([]);
  const [passwordRequiredRoom, setPasswordRequiredRoom] = useState<string | null>(null);

  const { json, setJson } = useJson();

  // Yjs instance managed by state so we can recreate it easily when leaving room
  const [docState, setDocState] = useState(() => {
    const doc = new Y.Doc();
    return { doc, text: doc.getText("json-content") };
  });
  const { doc: yDoc, text: yText } = docState;

  // We need a ref to keep track of the socket for the yDoc observer
  const socketRef = React.useRef<Socket | null>(null);

  // Start collaboration session
  const startCollaboration = (newRoomId: string, password?: string) => {
    if (socket) return;

    setIsCollaborating(true);
    setRoomId(newRoomId);

    const newDoc = new Y.Doc();
    const newText = newDoc.getText("json-content");
    setDocState({ doc: newDoc, text: newText });

    const newSocket = io(WS_SERVER_URL, {
      transports: ["websocket", "polling"],
    });

    setSocket(newSocket);
    socketRef.current = newSocket;

    // Initial connection
    newSocket.on("connect", () => {
      console.log("Connected to collab server:", newSocket.id);
      newSocket.emit("join-room", newRoomId, password);
    });

    newSocket.on("collab-error", (msg: string) => {
      newSocket.disconnect();
      setSocket(null);
      socketRef.current = null;
      setIsCollaborating(false);
      setRoomId(null);
      setCollaborators([]);

      if (msg === "Invalid room password") {
        setPasswordRequiredRoom(newRoomId);
      } else {
        alert(msg);
      }
    });

    newSocket.on("join-success", () => {
      console.log("Joined room successfully");
    });

    // Room info updates (now receives objects with names/colors)
    newSocket.on("room-user-change", (clients: CollaboratorUser[]) => {
      setCollaborators(clients);
    });

    // Listen for incoming Yjs updates from the socket server
    newSocket.on("client-broadcast", (updateData: ArrayBuffer) => {
      const update = new Uint8Array(updateData);
      Y.applyUpdate(newDoc, update, "remote");
    });

    // Handle new users joining to send them the current state
    newSocket.on("new-user", () => {
      // It's okay to send the full state for synchronization of newly joined users
      const stateUpdate = Y.encodeStateAsUpdate(newDoc);
      newSocket.emit("server-broadcast", newRoomId, stateUpdate);
    });

    // Send incremental delta updates to peers
    newDoc.on("update", (update: Uint8Array, origin: any) => {
      if (origin !== "remote" && socketRef.current) {
        socketRef.current.emit("server-broadcast", newRoomId, update);
      }
    });
  };

  const stopCollaboration = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      socketRef.current = null;
    }
    setIsCollaborating(false);
    setRoomId(null);
    setCollaborators([]);

    // Clear document state locally so old room data won't conflict
    const freshDoc = new Y.Doc();
    setDocState({ doc: freshDoc, text: freshDoc.getText("json-content") });
  };

  // Observe Y.Doc changes and update the local zustand store
  useEffect(() => {
    const observer = (event: Y.YTextEvent, transaction: Y.Transaction) => {
      if (transaction.origin !== "local") {
        setJson(yText.toString());
      }
    };
    yText.observe(observer);
    return () => {
      yText.unobserve(observer);
    };
  }, [yText, setJson]);

  // Synchronize local zustand `json` changes back to Yjs
  useEffect(() => {
    // Only update YText if the local JSON is different from what YText has.
    const currentYText = yText.toString();
    if (isCollaborating && json !== currentYText && typeof json === "string") {
      yDoc.transact(() => {
        // Implement a basic prefix-suffix diff so we don't erase the whole text
        let start = 0;
        while (
          start < currentYText.length &&
          start < json.length &&
          currentYText[start] === json[start]
        ) {
          start++;
        }

        let oldEnd = currentYText.length - 1;
        let newEnd = json.length - 1;
        while (oldEnd >= start && newEnd >= start && currentYText[oldEnd] === json[newEnd]) {
          oldEnd--;
          newEnd--;
        }

        const deleteCount = oldEnd - start + 1;
        const insertText = json.substring(start, newEnd + 1);

        if (deleteCount > 0) {
          yText.delete(start, deleteCount);
        }
        if (insertText.length > 0) {
          yText.insert(start, insertText);
        }
      }, "local");
    }
  }, [json, isCollaborating, yDoc, yText]);

  return (
    <CollabContext.Provider
      value={{
        socket,
        roomId,
        isCollaborating,
        startCollaboration,
        stopCollaboration,
        collaborators,
        passwordRequiredRoom,
        setPasswordRequiredRoom,
      }}
    >
      {children}
    </CollabContext.Provider>
  );
};
