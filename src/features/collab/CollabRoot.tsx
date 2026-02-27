"use client";

import React from "react";
import { CollabType } from "../../constants/enumData";
import { getCollabType } from "./collabMode";
import {
  CollabProvider as SocketCollabProvider,
  useCollab as useSocketCollab,
} from "./Collab";
import { P2PCollabProvider, useP2PCollab } from "./P2PCollab";

export const CollabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const type = getCollabType();

  if (type === CollabType.Socket) {
    return <SocketCollabProvider>{children}</SocketCollabProvider>;
  }

  return <P2PCollabProvider>{children}</P2PCollabProvider>;
};

export const useCollab = () => {
  const type = getCollabType();

  if (type === CollabType.Socket) {
    return useSocketCollab();
  }

  return useP2PCollab();
};

