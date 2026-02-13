import { sceneCoordsToViewportCoords } from "@jsondraw/common";
import { getElementAbsoluteCoords } from "@jsondraw/element";

import type {
  ElementsMap,
  NonDeletedJsonDrawElement,
} from "@jsondraw/element/types";

import { useJsonDrawAppState } from "../components/App";

import "./ElementCanvasButtons.scss";

import type { AppState } from "../types";

const CONTAINER_PADDING = 5;

const getContainerCoords = (
  element: NonDeletedJsonDrawElement,
  appState: AppState,
  elementsMap: ElementsMap,
) => {
  const [x1, y1] = getElementAbsoluteCoords(element, elementsMap);
  const { x: viewportX, y: viewportY } = sceneCoordsToViewportCoords(
    { sceneX: x1 + element.width, sceneY: y1 },
    appState,
  );
  const x = viewportX - appState.offsetLeft + 10;
  const y = viewportY - appState.offsetTop;
  return { x, y };
};

export const ElementCanvasButtons = ({
  children,
  element,
  elementsMap,
}: {
  children: React.ReactNode;
  element: NonDeletedJsonDrawElement;
  elementsMap: ElementsMap;
}) => {
  const appState = useJsonDrawAppState();

  if (
    appState.contextMenu ||
    appState.newElement ||
    appState.resizingElement ||
    appState.isRotating ||
    appState.openMenu ||
    appState.viewModeEnabled
  ) {
    return null;
  }

  const { x, y } = getContainerCoords(element, appState, elementsMap);

  return (
    <div
      className="jsondraw-canvas-buttons"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        // width: CONTAINER_WIDTH,
        padding: CONTAINER_PADDING,
      }}
    >
      {children}
    </div>
  );
};
