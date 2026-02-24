import { useEffect, useRef } from "react";
// Import reconcile utilities from the local JsonDraw package
import {
  getSceneVersion,
  reconcileElements,
  restoreElements,
} from "../../jsondraw/packages/jsondraw";
import { useCollab } from "./Collab";

// Define the shape of our JsonDraw API reference
interface JsonDrawAPI {
  getSceneElementsIncludingDeleted: () => any[];
  getAppState: () => any;
  updateScene: (data: {
    elements?: any[];
    appState?: any;
    commitToHistory?: boolean;
    collaborators?: Map<string, any>;
  }) => void;
}

export const useDrawingSync = (apiRef: React.MutableRefObject<JsonDrawAPI | null>) => {
  const { socket, isCollaborating, roomId, collaborators } = useCollab();
  const lastBroadcastedVersion = useRef<number>(-1);
  const remoteCollaboratorsRef = useRef<Map<string, any>>(new Map());

  // Convert `collaborators` state into Excalidraw Map
  useEffect(() => {
    const newMap = new Map();
    // Pre-populate with existings users
    collaborators.forEach(user => {
      // Don't render ourselves
      if (socket && user.id === socket.id) return;

      const existing = remoteCollaboratorsRef.current.get(user.id);

      newMap.set(user.id, {
        pointer: existing?.pointer,
        button: existing?.button || "up",
        username: user.username,
        color: {
          background: user.color || "#eee",
          stroke: user.color || "#eee",
        },
        id: user.id,
        socketId: user.id,
      });
    });

    remoteCollaboratorsRef.current = newMap;

    if (apiRef.current && isCollaborating) {
      apiRef.current.updateScene({ collaborators: newMap });
    }
  }, [collaborators, apiRef, isCollaborating, socket]);

  // 1. Listen for incoming remote drawing updates
  useEffect(() => {
    if (!socket || !isCollaborating) return;

    const handleClientDraw = (remoteElements: any[]) => {
      const api = apiRef.current;
      if (!api) return;

      const localElements = api.getSceneElementsIncludingDeleted();
      const appState = api.getAppState();

      // Ensure remote elements are restored correctly (e.g. adding missing fields)
      const restoredRemoteElements = restoreElements(remoteElements, localElements);

      // Reconcile conflicts using Excalidraw's built-in CRDT-like algorithm
      const reconciledElements = reconcileElements(localElements, restoredRemoteElements, appState);

      // Avoid self-broadcasting the scene we just received
      lastBroadcastedVersion.current = getSceneVersion(reconciledElements);

      // Update the canvas with the merged elements
      api.updateScene({
        elements: reconciledElements,
        commitToHistory: false, // Optionally avoid flooding the undo history with remote changes
      });
    };

    socket.on("client-draw", handleClientDraw);

    return () => {
      socket.off("client-draw", handleClientDraw);
    };
  }, [socket, isCollaborating, apiRef]);

  // 2. Listen for remote pointers
  useEffect(() => {
    if (!socket || !isCollaborating) return;

    const handleClientPointer = (peerId: string, pointerData: any) => {
      const api = apiRef.current;
      if (!api) return;

      const collabsMap = remoteCollaboratorsRef.current;
      const user = collabsMap.get(peerId);

      if (user) {
        user.pointer = pointerData.pointer;
        user.button = pointerData.button;

        // Excalidraw's update scene requires a new Map instance to trigger render of new cursors
        const newMap = new Map(collabsMap);
        remoteCollaboratorsRef.current = newMap;

        // Explicitly update only collaborators to avoid flickering canvas states
        api.updateScene({ collaborators: newMap });
      }
    };

    socket.on("client-pointer", handleClientPointer);

    return () => {
      socket.off("client-pointer", handleClientPointer);
    };
  }, [socket, isCollaborating, apiRef]);

  // 3. Broadcast local drawing changes
  const broadcastDrawingChanges = (elements: any[]) => {
    if (!socket || !isCollaborating || !roomId) return;

    // Only broadcast if the scene has actually changed
    const currentVersion = getSceneVersion(elements);
    if (currentVersion > lastBroadcastedVersion.current) {
      // Excalidraw syncable elements check could be added here to filter out non-syncable ones
      socket.emit("server-draw", roomId, elements);
      lastBroadcastedVersion.current = currentVersion;
    }
  };

  // 4. Broadcast local pointer position
  const broadcastPointer = (pointerPayload: any) => {
    if (!socket || !isCollaborating || !roomId) return;
    socket.emit("server-pointer", roomId, pointerPayload);
  };

  // 5. Handle new users requesting the latest drawing (sync init)
  useEffect(() => {
    if (!socket || !isCollaborating) return;

    const handleNewUser = () => {
      const api = apiRef.current;
      if (!api) return;

      const elements = api.getSceneElementsIncludingDeleted();
      if (elements.length > 0) {
        socket.emit("server-draw", roomId, elements);
      }
    };

    socket.on("new-user", handleNewUser);

    return () => {
      socket.off("new-user", handleNewUser);
    };
  }, [socket, isCollaborating, roomId, apiRef]);

  return { broadcastDrawingChanges, broadcastPointer };
};
