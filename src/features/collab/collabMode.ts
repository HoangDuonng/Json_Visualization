"use client";

import { CollabType } from "../../constants/enumData";

export const getCollabType = (): CollabType => {
  const optionRaw = process.env.NEXT_PUBLIC_P2P_OPTION;

  if (optionRaw === "1") {
    return CollabType.Socket;
  }

  if (optionRaw === "2") {
    return CollabType.P2P;
  }

  const raw = process.env.NEXT_PUBLIC_COLLAB_TYPE?.toLowerCase();

  if (raw === CollabType.Socket) {
    return CollabType.Socket;
  }

  if (raw === CollabType.P2P) {
    return CollabType.P2P;
  }

  return CollabType.P2P;
};

export const P2P_APP_ID = process.env.NEXT_PUBLIC_P2P_APP_ID || "jsonviz-collab";

const relayA = process.env.NEXT_PUBLIC_P2P_RELAY_URLS_A;
const relayB = process.env.NEXT_PUBLIC_P2P_RELAY_URLS_B;

export const P2P_RELAY_URLS =
  relayA && relayA.length > 0
    ? [relayA]
    : relayB && relayB.length > 0
      ? [relayB]
      : [];

// TURN servers for P2P when peers are behind strict NAT/firewall (different networks).
// Trystero uses these in addition to default STUN so peers can relay via TURN if direct connection fails.
const turnUrlsRaw = process.env.NEXT_PUBLIC_P2P_TURN_URLS;
const turnUsername = process.env.NEXT_PUBLIC_P2P_TURN_USERNAME;
const turnCredential = process.env.NEXT_PUBLIC_P2P_TURN_CREDENTIAL;

/** ICE server config for Trystero turnConfig. Empty if TURN not configured. */
export const getP2PTurnConfig = (): Array<{ urls: string | string[]; username?: string; credential?: string }> => {
  if (!turnUrlsRaw?.trim()) return [];
  const urls = turnUrlsRaw.split(",").map(u => u.trim()).filter(Boolean);
  if (urls.length === 0) return [];
  return [
    {
      urls: urls.length === 1 ? urls[0] : urls,
      ...(turnUsername && turnCredential ? { username: turnUsername, credential: turnCredential } : {}),
    },
  ];
};

