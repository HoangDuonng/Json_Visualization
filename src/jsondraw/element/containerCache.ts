import type { JsonDrawTextContainer } from "./types";

export const originalContainerCache: {
  [id: JsonDrawTextContainer["id"]]:
    | {
        height: JsonDrawTextContainer["height"];
      }
    | undefined;
} = {};

export const updateOriginalContainerCache = (
  id: JsonDrawTextContainer["id"],
  height: JsonDrawTextContainer["height"],
) => {
  const data =
    originalContainerCache[id] || (originalContainerCache[id] = { height });
  data.height = height;
  return data;
};

export const resetOriginalContainerCache = (
  id: JsonDrawTextContainer["id"],
) => {
  if (originalContainerCache[id]) {
    delete originalContainerCache[id];
  }
};

export const getOriginalContainerHeightFromCache = (
  id: JsonDrawTextContainer["id"],
) => {
  return originalContainerCache[id]?.height ?? null;
};
