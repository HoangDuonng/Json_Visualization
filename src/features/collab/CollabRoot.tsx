"use client";

import React from "react";
import { CollabType } from "../../constants/enumData";
import { getCollabType } from "./collabMode";
import {
  CollabProvider as SocketCollabProvider,
  useCollab as useSocketCollab,
} from "./Collab";
import { TrysteroCollabProvider, useTrysteroCollab } from "./TrysteroCollab";

export const CollabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const type = getCollabType();

  if (type === CollabType.Socket) {
    return <SocketCollabProvider>{children}</SocketCollabProvider>;
  }

  return <TrysteroCollabProvider>{children}</TrysteroCollabProvider>;
};

export const useCollab = () => {
  const type = getCollabType();

  if (type === CollabType.Socket) {
    return useSocketCollab();
  }

  return useTrysteroCollab();
};

