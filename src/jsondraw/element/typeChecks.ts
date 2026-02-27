import { ROUNDNESS, assertNever } from "@jsondraw/common";

import { pointsEqual } from "@jsondraw/math";

import type { ElementOrToolType } from "@jsondraw/jsondraw/types";

import type { MarkNonNullable } from "@jsondraw/common/utility-types";

import type {
  JsonDrawElement,
  JsonDrawTextElement,
  JsonDrawEmbeddableElement,
  JsonDrawLinearElement,
  JsonDrawBindableElement,
  JsonDrawFreeDrawElement,
  InitializedJsonDrawImageElement,
  JsonDrawImageElement,
  JsonDrawTextElementWithContainer,
  JsonDrawTextContainer,
  JsonDrawFrameElement,
  RoundnessType,
  JsonDrawFrameLikeElement,
  JsonDrawElementType,
  JsonDrawIframeElement,
  JsonDrawIframeLikeElement,
  JsonDrawMagicFrameElement,
  JsonDrawArrowElement,
  JsonDrawElbowArrowElement,
  JsonDrawLineElement,
  JsonDrawFlowchartNodeElement,
  JsonDrawLinearElementSubType,
} from "./types";

export const isInitializedImageElement = (
  element: JsonDrawElement | null,
): element is InitializedJsonDrawImageElement => {
  return !!element && element.type === "image" && !!element.fileId;
};

export const isImageElement = (
  element: JsonDrawElement | null,
): element is JsonDrawImageElement => {
  return !!element && element.type === "image";
};

export const isEmbeddableElement = (
  element: JsonDrawElement | null | undefined,
): element is JsonDrawEmbeddableElement => {
  return !!element && element.type === "embeddable";
};

export const isIframeElement = (
  element: JsonDrawElement | null,
): element is JsonDrawIframeElement => {
  return !!element && element.type === "iframe";
};

export const isIframeLikeElement = (
  element: JsonDrawElement | null,
): element is JsonDrawIframeLikeElement => {
  return (
    !!element && (element.type === "iframe" || element.type === "embeddable")
  );
};

export const isTextElement = (
  element: JsonDrawElement | null,
): element is JsonDrawTextElement => {
  return element != null && element.type === "text";
};

export const isFrameElement = (
  element: JsonDrawElement | null,
): element is JsonDrawFrameElement => {
  return element != null && element.type === "frame";
};

export const isMagicFrameElement = (
  element: JsonDrawElement | null,
): element is JsonDrawMagicFrameElement => {
  return element != null && element.type === "magicframe";
};

export const isFrameLikeElement = (
  element: JsonDrawElement | null,
): element is JsonDrawFrameLikeElement => {
  return (
    element != null &&
    (element.type === "frame" || element.type === "magicframe")
  );
};

export const isFreeDrawElement = (
  element?: JsonDrawElement | null,
): element is JsonDrawFreeDrawElement => {
  return element != null && isFreeDrawElementType(element.type);
};

export const isFreeDrawElementType = (
  elementType: JsonDrawElementType,
): boolean => {
  return elementType === "freedraw";
};

export const isLinearElement = (
  element?: JsonDrawElement | null,
): element is JsonDrawLinearElement => {
  return element != null && isLinearElementType(element.type);
};

export const isLineElement = (
  element?: JsonDrawElement | null,
): element is JsonDrawLineElement => {
  return element != null && element.type === "line";
};

export const isArrowElement = (
  element?: JsonDrawElement | null,
): element is JsonDrawArrowElement => {
  return element != null && element.type === "arrow";
};

export const isElbowArrow = (
  element?: JsonDrawElement,
): element is JsonDrawElbowArrowElement => {
  return isArrowElement(element) && element.elbowed;
};

/**
 * sharp or curved arrow, but not elbow
 */
export const isSimpleArrow = (
  element?: JsonDrawElement,
): element is JsonDrawArrowElement => {
  return isArrowElement(element) && !element.elbowed;
};

export const isSharpArrow = (
  element?: JsonDrawElement,
): element is JsonDrawArrowElement => {
  return isArrowElement(element) && !element.elbowed && !element.roundness;
};

export const isCurvedArrow = (
  element?: JsonDrawElement,
): element is JsonDrawArrowElement => {
  return (
    isArrowElement(element) && !element.elbowed && element.roundness !== null
  );
};

export const isLinearElementType = (
  elementType: ElementOrToolType,
): boolean => {
  return (
    elementType === "arrow" || elementType === "line" // || elementType === "freedraw"
  );
};

export const isBindingElement = (
  element?: JsonDrawElement | null,
  includeLocked = true,
): element is JsonDrawArrowElement => {
  return (
    element != null &&
    (!element.locked || includeLocked === true) &&
    isBindingElementType(element.type)
  );
};

export const isBindingElementType = (
  elementType: ElementOrToolType,
): boolean => {
  return elementType === "arrow";
};

export const isBindableElement = (
  element: JsonDrawElement | null | undefined,
  includeLocked = true,
): element is JsonDrawBindableElement => {
  return (
    element != null &&
    (!element.locked || includeLocked === true) &&
    (element.type === "rectangle" ||
      element.type === "diamond" ||
      element.type === "ellipse" ||
      element.type === "image" ||
      element.type === "iframe" ||
      element.type === "embeddable" ||
      element.type === "frame" ||
      element.type === "magicframe" ||
      (element.type === "text" && !element.containerId))
  );
};

export const isRectanguloidElement = (
  element?: JsonDrawElement | null,
): element is JsonDrawBindableElement => {
  return (
    element != null &&
    (element.type === "rectangle" ||
      element.type === "diamond" ||
      element.type === "image" ||
      element.type === "iframe" ||
      element.type === "embeddable" ||
      element.type === "frame" ||
      element.type === "magicframe" ||
      (element.type === "text" && !element.containerId))
  );
};

// TODO: Remove this when proper distance calculation is introduced
// @see binding.ts:distanceToBindableElement()
export const isRectangularElement = (
  element?: JsonDrawElement | null,
): element is JsonDrawBindableElement => {
  return (
    element != null &&
    (element.type === "rectangle" ||
      element.type === "image" ||
      element.type === "text" ||
      element.type === "iframe" ||
      element.type === "embeddable" ||
      element.type === "frame" ||
      element.type === "magicframe" ||
      element.type === "freedraw")
  );
};

export const isTextBindableContainer = (
  element: JsonDrawElement | null,
  includeLocked = true,
): element is JsonDrawTextContainer => {
  return (
    element != null &&
    (!element.locked || includeLocked === true) &&
    (element.type === "rectangle" ||
      element.type === "diamond" ||
      element.type === "ellipse" ||
      isArrowElement(element))
  );
};

export const isJsonDrawElement = (
  element: any,
): element is JsonDrawElement => {
  const type: JsonDrawElementType | undefined = element?.type;
  if (!type) {
    return false;
  }
  switch (type) {
    case "text":
    case "diamond":
    case "rectangle":
    case "iframe":
    case "embeddable":
    case "ellipse":
    case "arrow":
    case "freedraw":
    case "line":
    case "frame":
    case "magicframe":
    case "image":
    case "selection": {
      return true;
    }
    default: {
      assertNever(type, null);
      return false;
    }
  }
};

export const isFlowchartNodeElement = (
  element: JsonDrawElement,
): element is JsonDrawFlowchartNodeElement => {
  return (
    element.type === "rectangle" ||
    element.type === "ellipse" ||
    element.type === "diamond"
  );
};

export const hasBoundTextElement = (
  element: JsonDrawElement | null,
): element is MarkNonNullable<JsonDrawBindableElement, "boundElements"> => {
  return (
    isTextBindableContainer(element) &&
    !!element.boundElements?.some(({ type }) => type === "text")
  );
};

export const isBoundToContainer = (
  element: JsonDrawElement | null,
): element is JsonDrawTextElementWithContainer => {
  return (
    element !== null &&
    "containerId" in element &&
    element.containerId !== null &&
    isTextElement(element)
  );
};

export const isArrowBoundToElement = (element: JsonDrawArrowElement) => {
  return !!element.startBinding || !!element.endBinding;
};

export const isUsingAdaptiveRadius = (type: string) =>
  type === "rectangle" ||
  type === "embeddable" ||
  type === "iframe" ||
  type === "image";

export const isUsingProportionalRadius = (type: string) =>
  type === "line" || type === "arrow" || type === "diamond";

export const canApplyRoundnessTypeToElement = (
  roundnessType: RoundnessType,
  element: JsonDrawElement,
) => {
  if (
    (roundnessType === ROUNDNESS.ADAPTIVE_RADIUS ||
      // if legacy roundness, it can be applied to elements that currently
      // use adaptive radius
      roundnessType === ROUNDNESS.LEGACY) &&
    isUsingAdaptiveRadius(element.type)
  ) {
    return true;
  }
  if (
    roundnessType === ROUNDNESS.PROPORTIONAL_RADIUS &&
    isUsingProportionalRadius(element.type)
  ) {
    return true;
  }

  return false;
};

export const getDefaultRoundnessTypeForElement = (
  element: JsonDrawElement,
) => {
  if (isUsingProportionalRadius(element.type)) {
    return {
      type: ROUNDNESS.PROPORTIONAL_RADIUS,
    };
  }

  if (isUsingAdaptiveRadius(element.type)) {
    return {
      type: ROUNDNESS.ADAPTIVE_RADIUS,
    };
  }

  return null;
};

export const getLinearElementSubType = (
  element: JsonDrawLinearElement,
): JsonDrawLinearElementSubType => {
  if (isSharpArrow(element)) {
    return "sharpArrow";
  }
  if (isCurvedArrow(element)) {
    return "curvedArrow";
  }
  if (isElbowArrow(element)) {
    return "elbowArrow";
  }
  return "line";
};

/**
 * Checks if current element points meet all the conditions for polygon=true
 * (this isn't a element type check, for that use isLineElement).
 *
 * If you want to check if points *can* be turned into a polygon, use
 *  canBecomePolygon(points).
 */
export const isValidPolygon = (
  points: JsonDrawLineElement["points"],
): boolean => {
  return points.length > 3 && pointsEqual(points[0], points[points.length - 1]);
};

export const canBecomePolygon = (
  points: JsonDrawLineElement["points"],
): boolean => {
  return (
    points.length > 3 ||
    // 3-point polygons can't have all points in a single line
    (points.length === 3 && !pointsEqual(points[0], points[points.length - 1]))
  );
};
