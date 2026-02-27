import {
  getBoundTextElement,
  redrawTextBoundingBox,
} from "@jsondraw/element";
import { hasBoundTextElement, isTextElement } from "@jsondraw/element";

import { isInGroup } from "@jsondraw/element";

import type {
  JsonDrawElement,
  JsonDrawTextElement,
  NonDeletedSceneElementsMap,
} from "@jsondraw/element/types";

import type { Scene } from "@jsondraw/element";

import { fontSizeIcon } from "../icons";

import StatsDragInput from "./DragInput";
import { getStepSizedValue } from "./utils";

import type { DragInputCallbackType } from "./DragInput";
import type { AppState } from "../../types";

interface MultiFontSizeProps {
  elements: readonly JsonDrawElement[];
  scene: Scene;
  elementsMap: NonDeletedSceneElementsMap;
  appState: AppState;
  property: "fontSize";
}

const MIN_FONT_SIZE = 4;
const STEP_SIZE = 4;

const getApplicableTextElements = (
  elements: readonly (JsonDrawElement | undefined)[],
  elementsMap: NonDeletedSceneElementsMap,
) =>
  elements.reduce(
    (acc: JsonDrawTextElement[], el) => {
      if (!el || isInGroup(el)) {
        return acc;
      }
      if (isTextElement(el)) {
        acc.push(el);
        return acc;
      }
      if (hasBoundTextElement(el)) {
        const boundTextElement = getBoundTextElement(el, elementsMap);
        if (boundTextElement) {
          acc.push(boundTextElement);
          return acc;
        }
      }

      return acc;
    },

    [],
  );

const handleFontSizeChange: DragInputCallbackType<
  MultiFontSizeProps["property"],
  JsonDrawTextElement
> = ({
  accumulatedChange,
  originalElements,
  shouldChangeByStepSize,
  nextValue,
  scene,
}) => {
  const elementsMap = scene.getNonDeletedElementsMap();
  const latestTextElements = originalElements.map((el) =>
    elementsMap.get(el.id),
  ) as JsonDrawTextElement[];

  let nextFontSize;

  if (nextValue) {
    nextFontSize = Math.max(Math.round(nextValue), MIN_FONT_SIZE);

    for (const textElement of latestTextElements) {
      scene.mutateElement(textElement, {
        fontSize: nextFontSize,
      });

      redrawTextBoundingBox(
        textElement,
        scene.getContainerElement(textElement),
        scene,
      );
    }

    scene.triggerUpdate();
  } else {
    const originalTextElements = originalElements as JsonDrawTextElement[];

    for (let i = 0; i < latestTextElements.length; i++) {
      const latestElement = latestTextElements[i];
      const originalElement = originalTextElements[i];

      const originalFontSize = Math.round(originalElement.fontSize);
      const changeInFontSize = Math.round(accumulatedChange);
      let nextFontSize = Math.max(
        originalFontSize + changeInFontSize,
        MIN_FONT_SIZE,
      );
      if (shouldChangeByStepSize) {
        nextFontSize = getStepSizedValue(nextFontSize, STEP_SIZE);
      }
      scene.mutateElement(latestElement, {
        fontSize: nextFontSize,
      });

      redrawTextBoundingBox(
        latestElement,
        scene.getContainerElement(latestElement),
        scene,
      );
    }

    scene.triggerUpdate();
  }
};

const MultiFontSize = ({
  elements,
  scene,
  appState,
  property,
  elementsMap,
}: MultiFontSizeProps) => {
  const latestTextElements = getApplicableTextElements(elements, elementsMap);

  if (!latestTextElements.length) {
    return null;
  }

  const fontSizes = latestTextElements.map(
    (textEl) => Math.round(textEl.fontSize * 10) / 10,
  );
  const value = new Set(fontSizes).size === 1 ? fontSizes[0] : "Mixed";
  const editable = fontSizes.length > 0;

  return (
    <StatsDragInput
      label="F"
      icon={fontSizeIcon}
      elements={latestTextElements}
      dragInputCallback={handleFontSizeChange}
      value={value}
      editable={editable}
      scene={scene}
      property={property}
      appState={appState}
    />
  );
};

export default MultiFontSize;
