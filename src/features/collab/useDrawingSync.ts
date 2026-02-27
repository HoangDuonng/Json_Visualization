import { useEffect, useRef } from "react";
// Import reconcile utilities from the JsonDraw drawing engine
import { getSceneVersion, reconcileElements, restoreElements } from "../../jsondraw";
import { useCollab } from "./CollabRoot";
import { getCollabType } from "./collabMode";
import { CollabType } from "../../constants/enumData";

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
  const collab = useCollab() as any;
  const { socket, isCollaborating, roomId, collaborators, isRoomOwner } = collab;
  const p2pRoom = collab._p2pRoom as any | null;
  const canSync: boolean = typeof collab.canSync === "boolean" ? collab.canSync : true;
  const collabType = getCollabType();

  const lastBroadcastedVersion = useRef<number>(-1);
  const remoteCollaboratorsRef = useRef<Map<string, any>>(new Map());
  const hasReceivedInitialSync = useRef<boolean>(false);

  const sendDrawRef = useRef<((elements: any[]) => void) | null>(null);
  const sendPointerRef = useRef<((payload: any) => void) | null>(null);

  // When room changes or collaboration stops, reset sync flag
  useEffect(() => {
    if (isCollaborating && canSync) {
      hasReceivedInitialSync.current = isRoomOwner;
    } else {
      hasReceivedInitialSync.current = false;
      lastBroadcastedVersion.current = -1;
    }
  }, [isCollaborating, isRoomOwner, canSync]);

  // Convert `collaborators` state into Excalidraw Map
  useEffect(() => {
    const newMap = new Map();
    collaborators.forEach((user: any) => {
      if (socket && user.id === socket.id) return;
      if (!socket && collabType === CollabType.P2P && user.id === collab.currentUserId) {
        return;
      }

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

    if (apiRef.current && isCollaborating && canSync) {
      apiRef.current.updateScene({ collaborators: newMap });
    }
  }, [collaborators, apiRef, isCollaborating, socket, collabType, collab, canSync]);

  // 1. Listen for incoming remote drawing updates
  useEffect(() => {
    if (!isCollaborating || !canSync) return;

    if (collabType === CollabType.Socket) {
      if (!socket) return;

      const handleClientDraw = (remoteElements: any[]) => {
        const api = apiRef.current;
        if (!api) return;

        const localElements = api.getSceneElementsIncludingDeleted();
        const appState = api.getAppState();

        let finalElements: any[] = [];

        if (!isRoomOwner && !hasReceivedInitialSync.current) {
          finalElements = restoreElements(remoteElements, null);
          hasReceivedInitialSync.current = true;
        } else {
          const restoredRemoteElements = restoreElements(remoteElements, localElements);
          finalElements = reconcileElements(localElements, restoredRemoteElements, appState);
        }

        lastBroadcastedVersion.current = getSceneVersion(finalElements);

        api.updateScene({
          elements: finalElements,
          commitToHistory: false,
        });
      };

      socket.on("client-draw", handleClientDraw);
      sendDrawRef.current = (elements: any[]) => {
        if (!roomId) return;
        socket.emit("server-draw", roomId, elements);
      };

      return () => {
        socket.off("client-draw", handleClientDraw);
        sendDrawRef.current = null;
      };
    }

    if (collabType === CollabType.P2P && p2pRoom) {
      const [sendDraw, getDraw] = p2pRoom.makeAction("draw");

      const handleDraw = (remoteElements: any[]) => {
        const api = apiRef.current;
        if (!api) return;

        const localElements = api.getSceneElementsIncludingDeleted();
        const appState = api.getAppState();

        let finalElements: any[] = [];

        if (!isRoomOwner && !hasReceivedInitialSync.current) {
          finalElements = restoreElements(remoteElements, null);
          hasReceivedInitialSync.current = true;
        } else {
          const restoredRemoteElements = restoreElements(remoteElements, localElements);
          finalElements = reconcileElements(localElements, restoredRemoteElements, appState);
        }

        lastBroadcastedVersion.current = getSceneVersion(finalElements);

        api.updateScene({
          elements: finalElements,
          commitToHistory: false,
        });
      };

      getDraw(handleDraw);
      sendDrawRef.current = (elements: any[]) => {
        void sendDraw(elements);
      };

      return () => {
        sendDrawRef.current = null;
      };
    }
  }, [socket, isCollaborating, apiRef, isRoomOwner, collabType, p2pRoom, roomId, canSync]);

  // 2. Listen for remote pointers
  useEffect(() => {
    if (!isCollaborating || !canSync) return;

    if (collabType === CollabType.Socket) {
      if (!socket) return;

      const handleClientPointer = (peerId: string, pointerData: any) => {
        const api = apiRef.current;
        if (!api) return;

        const collabsMap = remoteCollaboratorsRef.current;
        const user = collabsMap.get(peerId);

        if (user) {
          user.pointer = pointerData.pointer;
          user.button = pointerData.button;
          user.viewport = pointerData.viewport || user.viewport;

          const newMap = new Map(collabsMap);
          remoteCollaboratorsRef.current = newMap;

          api.updateScene({ collaborators: newMap });

          // If we are following this user and they sent a viewport,
          // snap our camera to their scroll/zoom (canvas background),
          // ignoring their pointer position.
          try {
            const appState =
              typeof api.getAppState === "function" ? api.getAppState() : null;
            const targetSocketId = appState?.userToFollow?.socketId as
              | string
              | undefined;

            if (targetSocketId && targetSocketId === peerId && pointerData.viewport) {
              const viewport = pointerData.viewport as {
                scrollX: number;
                scrollY: number;
                zoom: number;
              };

              const nextZoomValue =
                appState?.zoom && typeof appState.zoom.value === "number"
                  ? { ...appState.zoom, value: viewport.zoom }
                  : { value: viewport.zoom };

              api.updateScene({
                appState: {
                  scrollX: viewport.scrollX,
                  scrollY: viewport.scrollY,
                  zoom: nextZoomValue,
                },
              });
            }
          } catch {
            // best-effort only
          }
        }
      };

      socket.on("client-pointer", handleClientPointer);
      sendPointerRef.current = (pointerPayload: any) => {
        if (!roomId) return;
        socket.emit("server-pointer", roomId, pointerPayload);
      };

      return () => {
        socket.off("client-pointer", handleClientPointer);
        sendPointerRef.current = null;
      };
    }

    if (collabType === CollabType.P2P && p2pRoom) {
      const [sendPointer, getPointer] = p2pRoom.makeAction("pointer");

      const handlePointer = (payload: any, peerId: string) => {
        const api = apiRef.current;
        if (!api) return;

        const collabsMap = remoteCollaboratorsRef.current;
        const user = collabsMap.get(peerId);

        if (user) {
          user.pointer = payload.pointer;
          user.button = payload.button;
          user.viewport = payload.viewport || user.viewport;

          const newMap = new Map(collabsMap);
          remoteCollaboratorsRef.current = newMap;

          api.updateScene({ collaborators: newMap });

          // Same logic for P2P: if we are following this peer and
          // they included a viewport, sync our canvas background.
          try {
            const appState =
              typeof api.getAppState === "function" ? api.getAppState() : null;
            const targetSocketId = appState?.userToFollow?.socketId as
              | string
              | undefined;

            if (targetSocketId && targetSocketId === peerId && payload.viewport) {
              const viewport = payload.viewport as {
                scrollX: number;
                scrollY: number;
                zoom: number;
              };

              const nextZoomValue =
                appState?.zoom && typeof appState.zoom.value === "number"
                  ? { ...appState.zoom, value: viewport.zoom }
                  : { value: viewport.zoom };

              api.updateScene({
                appState: {
                  scrollX: viewport.scrollX,
                  scrollY: viewport.scrollY,
                  zoom: nextZoomValue,
                },
              });
            }
          } catch {
            // best-effort only
          }
        }
      };

      getPointer(handlePointer);
      sendPointerRef.current = (pointerPayload: any) => {
        void sendPointer(pointerPayload);
      };

      return () => {
        sendPointerRef.current = null;
      };
    }
  }, [socket, isCollaborating, apiRef, collabType, p2pRoom, roomId, canSync]);

  // 3. Broadcast local drawing changes
  const broadcastDrawingChanges = (elements: any[]) => {
    if (!isCollaborating || !canSync) return;

    if (!isRoomOwner && !hasReceivedInitialSync.current) return;

    const currentVersion = getSceneVersion(elements);
    if (currentVersion > lastBroadcastedVersion.current) {
      if (sendDrawRef.current) {
        sendDrawRef.current(elements);
      }
      lastBroadcastedVersion.current = currentVersion;
    }
  };

  // 4. Broadcast local pointer position
  const broadcastPointer = (pointerPayload: any) => {
    if (!isCollaborating) return;
    if (sendPointerRef.current) {
      sendPointerRef.current(pointerPayload);
    }
  };

  // 6. Center viewport on the currently followed user immediately (best-effort).
  const centerOnFollowedUser = () => {
    const api = apiRef.current;
    if (!api) return;

    try {
      const appState = typeof api.getAppState === "function" ? api.getAppState() : null;
      const targetSocketId = appState?.userToFollow?.socketId as string | undefined;
      if (!targetSocketId) return;

      const collabsMap = remoteCollaboratorsRef.current;
      const user = collabsMap.get(targetSocketId) as any;
      const viewport = user?.viewport as
        | { scrollX: number; scrollY: number; zoom: number }
        | undefined;

      if (viewport) {
        const nextZoomValue =
          appState?.zoom && typeof appState.zoom.value === "number"
            ? { ...appState.zoom, value: viewport.zoom }
            : { value: viewport.zoom };

        api.updateScene({
          appState: {
            scrollX: viewport.scrollX,
            scrollY: viewport.scrollY,
            zoom: nextZoomValue,
          },
        });
        return;
      }

      const pointer = user?.pointer;
      if (!pointer) return;

      const viewportWidth = appState.width || 0;
      const viewportHeight = appState.height || 0;
      const { x, y } = pointer;

      const nextScrollX = x - viewportWidth / 2;
      const nextScrollY = y - viewportHeight / 2;

      api.updateScene({
        appState: {
          scrollX: nextScrollX,
          scrollY: nextScrollY,
        },
      });
    } catch {
      // best-effort only
    }
  };

  // 5. Handle new users requesting the latest drawing (sync init)
  useEffect(() => {
    if (!isCollaborating || !isRoomOwner || !canSync) return;

    if (collabType === CollabType.Socket) {
      if (!socket) return;

      const handleNewUser = () => {
        const api = apiRef.current;
        if (!api) return;

        const elements = api.getSceneElementsIncludingDeleted();
        if (elements.length > 0 && sendDrawRef.current) {
          sendDrawRef.current(elements);
        }
      };

      socket.on("new-user", handleNewUser);

      return () => {
        socket.off("new-user", handleNewUser);
      };
    }

    if (collabType === CollabType.P2P && p2pRoom) {
      const handlePeerJoin = (peerId: string) => {
        const api = apiRef.current;
        if (!api) return;

        const elements = api.getSceneElementsIncludingDeleted();
        if (elements.length === 0) return;

        const [sendDraw] = p2pRoom.makeAction("draw");
        void sendDraw(elements, peerId);
      };

      p2pRoom.onPeerJoin(handlePeerJoin);

      return () => {
        p2pRoom.onPeerJoin(() => {});
      };
    }
  }, [socket, isCollaborating, roomId, apiRef, isRoomOwner, collabType, p2pRoom, canSync]);

  return { broadcastDrawingChanges, broadcastPointer, centerOnFollowedUser };
};
