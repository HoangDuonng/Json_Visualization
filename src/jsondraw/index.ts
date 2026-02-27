// src/jsondraw/index.ts
// Public API gateway — Json-viz imports JsonDraw only through this file

// Core component
export { JsonDraw } from "./engine";

// Types
export type {
  JsonDrawImperativeAPI,
  AppState,
  BinaryFiles,
  JsonDrawInitialDataState,
  JsonDrawProps,
} from "./engine/types";
export type { JsonDrawElement, JsonDrawArrowElement } from "./element/types";

// Data utilities
export { saveAsJSON } from "./engine/data";
export { restoreAppState, restoreElements } from "./engine/data/restore";
export { reconcileElements } from "./engine/data/reconcile";
export { getSceneVersion } from "./engine";

// UI components
export { default as HamsterLoader } from "./engine/components/ui/HamsterLoader";
