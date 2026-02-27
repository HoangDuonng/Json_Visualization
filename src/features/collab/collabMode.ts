"use client";

import { CollabType } from "../../constants/enumData";

export const getCollabType = (): CollabType => {
  const optionRaw = process.env.NEXT_PUBLIC_TRYSTERO_OPTION;

  if (optionRaw === "1") {
    return CollabType.Socket;
  }

  if (optionRaw === "2") {
    return CollabType.Trystero;
  }

  const raw = process.env.NEXT_PUBLIC_COLLAB_TYPE?.toLowerCase();

  if (raw === CollabType.Socket) {
    return CollabType.Socket;
  }

  if (raw === CollabType.Trystero) {
    return CollabType.Trystero;
  }

  return CollabType.Trystero;
};

export const TRYSTERO_APP_ID =
  process.env.NEXT_PUBLIC_TRYSTERO_APP_ID || "jsonviz-collab";

const relayA = process.env.NEXT_PUBLIC_TRYSTERO_RELAY_URLS_A;
const relayB = process.env.NEXT_PUBLIC_TRYSTERO_RELAY_URLS_B;

export const TRYSTERO_RELAY_URLS =
  relayA && relayA.length > 0
    ? [relayA]
    : relayB && relayB.length > 0
      ? [relayB]
      : [];

