"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import * as Y from "yjs";
import { MAX_COLLABORATORS_PER_ROOM } from "../../constants/enumData";
import useJson from "../../store/useJson";

const WS_SERVER_URL = process.env.NEXT_PUBLIC_WS_SERVER_URL || "ws://localhost:3002";

export interface CollaboratorUser {
  id: string;
  username?: string;
  color?: string;
  isOwner?: boolean;
}

interface StartCollaborationOptions {
  asOwner?: boolean;
}

interface RoomUserChangePayload {
  clients?: CollaboratorUser[];
  ownerId?: string;
}

interface JoinSuccessPayload {
  isOwner?: boolean;
  userId?: string;
}

export interface JoinRequest {
  userId: string;
  username: string;
  color?: string;
}

interface CollabContextType {
  socket: Socket | null;
  roomId: string | null;
  isCollaborating: boolean;
  startCollaboration: (
    roomId: string,
    password?: string,
    options?: StartCollaborationOptions
  ) => void;
  stopCollaboration: () => void;
  collaborators: CollaboratorUser[];
  currentUserId: string | null;
  isRoomOwner: boolean;
  maxCollaborators: number;
  kickCollaborator: (collaboratorId: string) => void;
  passwordRequiredRoom: string | null;
  setPasswordRequiredRoom: (roomId: string | null) => void;

  waitingForApproval: boolean;
  pendingRequests: JoinRequest[];
  approveJoin: (userId: string) => void;
  rejectJoin: (userId: string) => void;
  submitRoomPassword: (password: string) => void;
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
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isRoomOwner, setIsRoomOwner] = useState(false);
  const [passwordRequiredRoom, setPasswordRequiredRoom] = useState<string | null>(null);

  const [waitingForApproval, setWaitingForApproval] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<JoinRequest[]>([]);

  const { json, setJson } = useJson();

  // Yjs instance managed by state so we can recreate it easily when leaving room
  const [docState, setDocState] = useState(() => {
    const doc = new Y.Doc();
    return { doc, text: doc.getText("json-content") };
  });
  const { doc: yDoc, text: yText } = docState;

  // We need a ref to keep track of the socket for the yDoc observer
  const socketRef = React.useRef<Socket | null>(null);
  const currentUserIdRef = React.useRef<string | null>(null);
  const isRoomOwnerRef = React.useRef(false);

  const resetConnectionState = () => {
    setSocket(null);
    socketRef.current = null;
    setIsCollaborating(false);
    setRoomId(null);
    setCollaborators([]);
    setCurrentUserId(null);
    currentUserIdRef.current = null;
    setIsRoomOwner(false);
    isRoomOwnerRef.current = false;
    setWaitingForApproval(false);
    setPendingRequests([]);
  };

  // Start collaboration session
  const startCollaboration = (
    newRoomId: string,
    password?: string,
    options?: StartCollaborationOptions
  ) => {
    if (socketRef.current) return;

    setIsCollaborating(true);
    setRoomId(newRoomId);
    const ownerByClientIntent = Boolean(options?.asOwner);
    setIsRoomOwner(ownerByClientIntent);
    isRoomOwnerRef.current = ownerByClientIntent;

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
      const ownId = newSocket.id ?? null;
      setCurrentUserId(ownId);
      currentUserIdRef.current = ownId;

      if (ownerByClientIntent) {
        newSocket.emit("join-room", newRoomId, password);
      } else {
        newSocket.emit("request-join", newRoomId);
      }
    });

    newSocket.on("collab-error", (msg: string) => {
      if (msg === "Invalid room password") {
        setPasswordRequiredRoom(newRoomId);
        // Do not disconnect so user can submit password and stay in the same socket session
      } else {
        newSocket.disconnect();
        resetConnectionState();
        Modal.error({
          title: "Connection Error",
          content: msg,
          centered: true,
        });
      }
    });

    newSocket.on("waiting-for-approval", () => {
      setWaitingForApproval(true);
    });

    newSocket.on("join-approved", () => {
      setWaitingForApproval(false);
      // Now actually join the room; if password required, backend will send 'collab-error' 'Invalid room password'
      newSocket.emit("join-room", newRoomId, password);
    });

    newSocket.on("join-rejected", () => {
      setWaitingForApproval(false);
      newSocket.disconnect();
      resetConnectionState();
      Modal.info({
        title: "Join Rejected",
        content: "The room owner rejected your request to join.",
        centered: true,
      });
    });

    newSocket.on("join-request", (payload: JoinRequest) => {
      setPendingRequests(prev => [...prev, payload]);
    });

    newSocket.on("join-success", (payload?: JoinSuccessPayload) => {
      if (payload?.userId) {
        setCurrentUserId(payload.userId);
        currentUserIdRef.current = payload.userId;
      }
      if (typeof payload?.isOwner === "boolean") {
        setIsRoomOwner(payload.isOwner);
        isRoomOwnerRef.current = payload.isOwner;
      }

      console.log("Joined room successfully");
    });

    // Room info updates (receives list or room metadata object)
    newSocket.on("room-user-change", (payload: CollaboratorUser[] | RoomUserChangePayload) => {
      const clients = Array.isArray(payload) ? payload : payload.clients || [];
      const ownerId = Array.isArray(payload) ? undefined : payload.ownerId;

      if (ownerId && currentUserIdRef.current) {
        const ownerState = ownerId === currentUserIdRef.current;
        setIsRoomOwner(ownerState);
        isRoomOwnerRef.current = ownerState;
      }

      if (!isRoomOwnerRef.current && clients.length > MAX_COLLABORATORS_PER_ROOM) {
        newSocket.disconnect();
        resetConnectionState();
        Modal.warning({
          title: "Room is full",
          content: `Maximum ${MAX_COLLABORATORS_PER_ROOM} users are allowed.`,
          centered: true,
        });
        return;
      }

      setCollaborators(clients);
    });

    newSocket.on("room-full", () => {
      newSocket.disconnect();
      resetConnectionState();
      Modal.warning({
        title: "Room is full",
        content: `Maximum ${MAX_COLLABORATORS_PER_ROOM} users are allowed.`,
        centered: true,
      });
    });

    newSocket.on("kicked-from-room", (msg?: string) => {
      newSocket.disconnect();
      resetConnectionState();
      Modal.warning({
        title: "Kicked from room",
        content: msg || "You were removed from this room by the room owner.",
        centered: true,
      });
    });

    newSocket.on("disconnect", () => {
      resetConnectionState();
    });

    // Listen for incoming Yjs updates from the socket server
    newSocket.on("client-broadcast", (updateData: ArrayBuffer) => {
      const update = new Uint8Array(updateData);
      Y.applyUpdate(newDoc, update, "remote");
    });

    // Handle new users joining to send them the current state
    newSocket.on("new-user", () => {
      if (!isRoomOwnerRef.current) return; // Only owner sends the full document state!

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

  const kickCollaborator = (collaboratorId: string) => {
    if (!socketRef.current || !roomId || !isRoomOwnerRef.current) {
      return;
    }

    if (collaboratorId === currentUserIdRef.current) {
      return;
    }

    socketRef.current.emit("kick-user", roomId, collaboratorId);
  };

  const approveJoin = (userId: string) => {
    if (socketRef.current && roomId && isRoomOwnerRef.current) {
      socketRef.current.emit("approve-join", roomId, userId);
      setPendingRequests(prev => prev.filter(req => req.userId !== userId));
    }
  };

  const rejectJoin = (userId: string) => {
    if (socketRef.current && roomId && isRoomOwnerRef.current) {
      socketRef.current.emit("reject-join", roomId, userId);
      setPendingRequests(prev => prev.filter(req => req.userId !== userId));
    }
  };

  const submitRoomPassword = (password: string) => {
    if (socketRef.current && roomId) {
      socketRef.current.emit("join-room", roomId, password);
    }
  };

  const stopCollaboration = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    resetConnectionState();

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
        currentUserId,
        isRoomOwner,
        maxCollaborators: MAX_COLLABORATORS_PER_ROOM,
        kickCollaborator,
        passwordRequiredRoom,
        setPasswordRequiredRoom,
        waitingForApproval,
        pendingRequests,
        approveJoin,
        rejectJoin,
        submitRoomPassword,
      }}
    >
      {children}
    </CollabContext.Provider>
  );
};
