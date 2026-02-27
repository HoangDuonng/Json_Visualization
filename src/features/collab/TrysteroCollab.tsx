"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import type { Socket } from "socket.io-client";
import * as Y from "yjs";
import { joinRoom } from "trystero/torrent";
import { selfId } from "trystero";
import { MAX_COLLABORATORS_PER_ROOM } from "../../constants/enumData";
import useJson from "../../store/useJson";
import { COLLAB_ANIMALS, COLLAB_COLORS } from "./collabConstants";
import { TRYSTERO_APP_ID, TRYSTERO_RELAY_URLS } from "./collabMode";
import type { CollaboratorUser, JoinRequest } from "./Collab";

interface StartCollaborationOptions {
  asOwner?: boolean;
}

interface TrysteroCollabContextType {
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

  // Internal Trystero room instance for advanced consumers (drawing sync, etc.)
  _trysteroRoom: any | null;
  canSync: boolean;
}

const TrysteroCollabContext = createContext<TrysteroCollabContextType | null>(null);

const pickRandom = (items: string[]): string =>
  items[Math.floor(Math.random() * items.length)] || items[0];

export const TrysteroCollabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [collaborators, setCollaborators] = useState<CollaboratorUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isRoomOwner, setIsRoomOwner] = useState(false);
  const [passwordRequiredRoom, setPasswordRequiredRoom] = useState<string | null>(null);

  const [waitingForApproval, setWaitingForApproval] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<JoinRequest[]>([]);
  const [isApproved, setIsApproved] = useState(false);

  const [trysteroRoom, setTrysteroRoom] = useState<any | null>(null);

  const { json, setJson } = useJson();

  const [docState, setDocState] = useState(() => {
    const doc = new Y.Doc();
    return { doc, text: doc.getText("json-content") };
  });
  const { doc: yDoc, text: yText } = docState;

  const currentUserIdRef = React.useRef<string | null>(null);
  const isRoomOwnerRef = React.useRef(false);
  const isApprovedRef = React.useRef(false);
  const collaboratorsRef = React.useRef<Map<string, CollaboratorUser>>(new Map());
  const roomPasswordRef = React.useRef<string | null>(null);
  const ownerPeerIdRef = React.useRef<string | null>(null);

  const resetConnectionState = () => {
    setIsCollaborating(false);
    setRoomId(null);
    setCollaborators([]);
    setCurrentUserId(null);
    currentUserIdRef.current = null;
    setIsRoomOwner(false);
    isRoomOwnerRef.current = false;
    setIsApproved(false);
    isApprovedRef.current = false;
    setPasswordRequiredRoom(null);
    setWaitingForApproval(false);
    setPendingRequests([]);
    setTrysteroRoom(null);
    collaboratorsRef.current = new Map();
  };

  const ensureSelfCollaborator = (owner: boolean) => {
    const id = selfId;
    const self: CollaboratorUser = {
      id,
      username: pickRandom(COLLAB_ANIMALS),
      color: pickRandom(COLLAB_COLORS),
      isOwner: owner,
    };
    collaboratorsRef.current.set(id, self);
    setCollaborators(Array.from(collaboratorsRef.current.values()));
    setCurrentUserId(id);
    currentUserIdRef.current = id;
  };

  const startCollaboration = (
    newRoomId: string,
    password?: string,
    options?: StartCollaborationOptions
  ) => {
    if (trysteroRoom) return;

    setIsCollaborating(true);
    setRoomId(newRoomId);

    const ownerByClientIntent = Boolean(options?.asOwner);
    setIsRoomOwner(ownerByClientIntent);
    isRoomOwnerRef.current = ownerByClientIntent;

    if (ownerByClientIntent) {
      setIsApproved(true);
      isApprovedRef.current = true;
      roomPasswordRef.current = password || null;
    } else {
      setIsApproved(false);
      isApprovedRef.current = false;
      setWaitingForApproval(true);
    }

    const newDoc = new Y.Doc();
    const newText = newDoc.getText("json-content");
    setDocState({ doc: newDoc, text: newText });

    const config: any = {
      appId: TRYSTERO_APP_ID,
    };

    if (TRYSTERO_RELAY_URLS.length > 0) {
      config.relayUrls = TRYSTERO_RELAY_URLS;
    }

    const room = joinRoom(config, newRoomId);
    setTrysteroRoom(room);

    ensureSelfCollaborator(ownerByClientIntent);

    const selfProfile = collaboratorsRef.current.get(selfId);

    const [sendIdentity, getIdentity] = room.makeAction("ident");
    const [sendYUpdate, getYUpdate] = room.makeAction("yupd");
    const [sendYFull, getYFull] = room.makeAction("yfull");
    const [sendJoinRequest, getJoinRequest] = room.makeAction("jreq");
    const [, getJoinResponse] = room.makeAction("jrsp");
    const [, getPasswordCheck] = room.makeAction("pwchk");
    const [, getPasswordResult] = room.makeAction("pwres");
    const [, getKick] = room.makeAction("kick");

    if (selfProfile) {
      void sendIdentity({
        ...selfProfile,
        isOwner: ownerByClientIntent,
      });
    }

    if (!ownerByClientIntent && selfProfile) {
      setWaitingForApproval(true);
      const joinPayload: JoinRequest = {
        userId: selfProfile.id,
        username: selfProfile.username || selfProfile.id,
        color: selfProfile.color,
      };
      void sendJoinRequest(joinPayload as any);
    }

    getYUpdate((data: any) => {
      if (!data) return;
      if (!isRoomOwnerRef.current && !isApprovedRef.current) return;
      const buffer = data instanceof ArrayBuffer ? data : (data as ArrayBuffer);
      const update = new Uint8Array(buffer);
      Y.applyUpdate(newDoc, update, "remote");
    });

    getYFull((data: any) => {
      if (!data) return;
      if (!isRoomOwnerRef.current && !isApprovedRef.current) return;
      const buffer = data instanceof ArrayBuffer ? data : (data as ArrayBuffer);
      const update = new Uint8Array(buffer);
      Y.applyUpdate(newDoc, update, "remote");
    });

    getIdentity((data: any, peerId: string) => {
      if (!data) return;
      const profile = data as CollaboratorUser;
      const existing = collaboratorsRef.current.get(peerId);

      const next: CollaboratorUser = {
        id: peerId,
        username: profile.username || existing?.username || pickRandom(COLLAB_ANIMALS),
        color: profile.color || existing?.color || pickRandom(COLLAB_COLORS),
        isOwner: Boolean(profile.isOwner),
      };

      collaboratorsRef.current.set(peerId, next);
      setCollaborators(Array.from(collaboratorsRef.current.values()));

      if (next.isOwner) {
        ownerPeerIdRef.current = peerId;
      }
    });

    getJoinRequest((data: any) => {
      if (!isRoomOwnerRef.current) return;
      if (!data) return;

      const payload = data as JoinRequest;
      setPendingRequests(prev => {
        if (prev.some(req => req.userId === payload.userId)) {
          return prev;
        }
        return [...prev, payload];
      });
    });

    getJoinResponse((data: any) => {
      if (isRoomOwnerRef.current) return;
      if (!data) return;

      const payload = data as { approved: boolean; requiresPassword?: boolean; reason?: string };

      setWaitingForApproval(false);

      if (!payload.approved) {
        room.leave();
        resetConnectionState();
        Modal.info({
          title: "Join Rejected",
          content: payload.reason || "The room owner rejected your request to join.",
          centered: true,
        });
        return;
      }

      if (payload.requiresPassword) {
        setPasswordRequiredRoom(newRoomId);
      } else {
        setIsApproved(true);
        isApprovedRef.current = true;
      }
    });

    getPasswordCheck((data: any, peerId: string) => {
      if (!isRoomOwnerRef.current) return;
      if (!data) return;

      const payload = data as { password: string };
      const ok = payload.password === roomPasswordRef.current;
      const [sendPasswordResult] = room.makeAction("pwres");

      void sendPasswordResult({ ok, reason: ok ? undefined : "Invalid room password" } as any, peerId);
    });

    getPasswordResult((data: any) => {
      if (isRoomOwnerRef.current) return;
      if (!data) return;

      const payload = data as { ok: boolean; reason?: string };

      if (payload.ok) {
        setPasswordRequiredRoom(null);
        setIsApproved(true);
        isApprovedRef.current = true;
      } else {
        Modal.error({
          title: "Connection Error",
          content: payload.reason || "Invalid room password",
          centered: true,
        });
      }
    });

    getKick((data: any) => {
      if (isRoomOwnerRef.current) return;

      const payload = data as { reason?: string };
      room.leave();
      resetConnectionState();
      Modal.warning({
        title: "Kicked from room",
        content: payload?.reason || "You were removed from this room by the room owner.",
        centered: true,
      });
    });

    room.onPeerJoin(peerId => {
      if (!collaboratorsRef.current.has(peerId)) {
        const peer: CollaboratorUser = {
          id: peerId,
          username: pickRandom(COLLAB_ANIMALS),
          color: pickRandom(COLLAB_COLORS),
          isOwner: false,
        };
        collaboratorsRef.current.set(peerId, peer);
      }

      const totalPeers = collaboratorsRef.current.size;
      if (!isRoomOwnerRef.current && totalPeers > MAX_COLLABORATORS_PER_ROOM) {
        Modal.warning({
          title: "Room is full",
          content: `Maximum ${MAX_COLLABORATORS_PER_ROOM} users are allowed.`,
          centered: true,
        });
        room.leave();
        resetConnectionState();
        return;
      }

      setCollaborators(Array.from(collaboratorsRef.current.values()));

      if (selfProfile) {
        void sendIdentity(selfProfile as any, peerId);
      }

      if (isRoomOwnerRef.current) {
        const stateUpdate = Y.encodeStateAsUpdate(newDoc);
        void sendYFull(stateUpdate, peerId);
      }
    });

    room.onPeerLeave(peerId => {
      collaboratorsRef.current.delete(peerId);
      setCollaborators(Array.from(collaboratorsRef.current.values()));
    });

    newDoc.on("update", (update: Uint8Array, origin: unknown) => {
      if (origin !== "remote" && (isRoomOwnerRef.current || isApprovedRef.current)) {
        void sendYUpdate(update);
      }
    });
  };

  const stopCollaboration = () => {
    if (trysteroRoom) {
      trysteroRoom.leave();
    }

    resetConnectionState();

    const freshDoc = new Y.Doc();
    setDocState({ doc: freshDoc, text: freshDoc.getText("json-content") });
  };

  const kickCollaborator = (collaboratorId: string) => {
    if (!trysteroRoom || !roomId || !isRoomOwnerRef.current) {
      return;
    }

    if (collaboratorId === currentUserIdRef.current) {
      return;
    }

    const [sendKick] = trysteroRoom.makeAction("kick");
    void sendKick(
      { reason: "You were removed from this room by the room owner." },
      collaboratorId
    );

    setCollaborators(prev => prev.filter(c => c.id !== collaboratorId));
    setPendingRequests(prev => prev.filter(req => req.userId !== collaboratorId));
  };

  const approveJoin = (userId: string) => {
    if (!trysteroRoom || !roomId || !isRoomOwnerRef.current) {
      return;
    }

    const [sendJoinResponse] = trysteroRoom.makeAction("jrsp");
    void sendJoinResponse(
      {
        approved: true,
        requiresPassword: Boolean(roomPasswordRef.current),
      },
      userId
    );

    setPendingRequests(prev => prev.filter(req => req.userId !== userId));
  };

  const rejectJoin = (userId: string) => {
    if (!trysteroRoom || !roomId || !isRoomOwnerRef.current) {
      return;
    }

    const [sendJoinResponse] = trysteroRoom.makeAction("jrsp");
    void sendJoinResponse(
      {
        approved: false,
        requiresPassword: false,
        reason: "The room owner rejected your request to join.",
      },
      userId
    );

    setPendingRequests(prev => prev.filter(req => req.userId !== userId));
  };

  const submitRoomPassword = (password: string) => {
    if (!trysteroRoom || !roomId) {
      return;
    }

    const [sendPasswordCheck] = trysteroRoom.makeAction("pwchk");
    const targetPeer = ownerPeerIdRef.current || null;
    void sendPasswordCheck({ password }, targetPeer);
  };

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

  useEffect(() => {
    const currentYText = yText.toString();

    if (isCollaborating && json !== currentYText && typeof json === "string") {
      yDoc.transact(() => {
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

  // For Trystero mode, derive pending join requests from collaborators list on owner side.
  // This ensures the UI always has a "Pending Requests" entry for each non-owner peer,
  // even if a specific join-request action was missed.
  useEffect(() => {
    if (!isRoomOwnerRef.current) return;

    setPendingRequests(prev => {
      const existingIds = new Set(prev.map(r => r.userId));
      const additions: JoinRequest[] = [];

      collaboratorsRef.current.forEach(user => {
        if (!user) return;
        if (user.id === currentUserIdRef.current) return;
        if (existingIds.has(user.id)) return;

        additions.push({
          userId: user.id,
          username: user.username || user.id,
          color: user.color,
        });
      });

      if (additions.length === 0) {
        return prev;
      }

      return [...prev, ...additions];
    });
  }, [collaborators]);

  return React.createElement(
    TrysteroCollabContext.Provider,
    {
      value: {
        socket: null,
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
        _trysteroRoom: trysteroRoom,
        canSync: isRoomOwner || isApproved,
      },
    },
    children
  );
};

export const useTrysteroCollab = () => {
  const context = useContext(TrysteroCollabContext);
  if (!context) {
    throw new Error("useTrysteroCollab must be used within a TrysteroCollabProvider");
  }
  return context;
};

