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

