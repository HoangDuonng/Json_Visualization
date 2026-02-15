import React, { useEffect } from "react";
import { DEFAULT_UI_OPTIONS, isShallowEqual } from "@jsondraw/common";
import App from "./components/App";
import { InitializeApp } from "./components/InitializeApp";
import Footer from "./components/footer/FooterCenter";
import LiveCollaborationTrigger from "./components/live-collaboration/LiveCollaborationTrigger";
import MainMenu from "./components/main-menu/MainMenu";
import WelcomeScreen from "./components/welcome-screen/WelcomeScreen";
import "./css/app.scss";
import "./css/styles.scss";
import { EditorJotaiProvider, editorJotaiStore } from "./editor-jotai";
import "./fonts/fonts.css";
import { defaultLang } from "./i18n";
import polyfill from "./polyfill";
import type { AppProps, JsonDrawProps } from "./types";

polyfill();

const JsonDrawBase = (props: JsonDrawProps) => {
  const {
    onChange,
    onIncrement,
    initialData,
    jsondrawAPI,
    isCollaborating = false,
    onPointerUpdate,
    renderTopLeftUI,
    renderTopRightUI,
    langCode = defaultLang.code,
    viewModeEnabled,
    zenModeEnabled,
    gridModeEnabled,
    libraryReturnUrl,
    theme,
    name,
    renderCustomStats,
    onPaste,
    detectScroll = true,
    handleKeyboardGlobally = false,
    onLibraryChange,
    autoFocus = false,
    generateIdForFile,
    onLinkOpen,
    generateLinkForSelection,
    onPointerDown,
    onPointerUp,
    onScrollChange,
    onDuplicate,
    children,
    validateEmbeddable,
    renderEmbeddable,
    aiEnabled,
    showDeprecatedFonts,
    renderScrollbars,
  } = props;

  const canvasActions = props.UIOptions?.canvasActions;

  // FIXME normalize/set defaults in parent component so that the memo resolver
  // compares the same values
  const UIOptions: AppProps["UIOptions"] = {
    ...props.UIOptions,
    canvasActions: {
      ...DEFAULT_UI_OPTIONS.canvasActions,
      ...canvasActions,
    },
    tools: {
      image: props.UIOptions?.tools?.image ?? true,
    },
  };

  if (canvasActions?.export) {
    UIOptions.canvasActions.export.saveFileToDisk =
      canvasActions.export?.saveFileToDisk ??
      DEFAULT_UI_OPTIONS.canvasActions.export.saveFileToDisk;
  }

  if (UIOptions.canvasActions.toggleTheme === null && typeof theme === "undefined") {
    UIOptions.canvasActions.toggleTheme = true;
  }

  useEffect(() => {
    const importPolyfill = async () => {
      //@ts-ignore
      await import("canvas-roundrect-polyfill");
    };

    importPolyfill();

    // Block pinch-zooming on iOS outside of the content area
    const handleTouchMove = (event: TouchEvent) => {
      // @ts-ignore
      if (typeof event.scale === "number" && event.scale !== 1) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <EditorJotaiProvider store={editorJotaiStore}>
      <InitializeApp langCode={langCode} theme={theme}>
        <App
          onChange={onChange}
          onIncrement={onIncrement}
          initialData={initialData}
          jsondrawAPI={jsondrawAPI}
          isCollaborating={isCollaborating}
          onPointerUpdate={onPointerUpdate}
          renderTopLeftUI={renderTopLeftUI}
          renderTopRightUI={renderTopRightUI}
          langCode={langCode}
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
          libraryReturnUrl={libraryReturnUrl}
          theme={theme}
          name={name}
          renderCustomStats={renderCustomStats}
          UIOptions={UIOptions}
          onPaste={onPaste}
          detectScroll={detectScroll}
          handleKeyboardGlobally={handleKeyboardGlobally}
          onLibraryChange={onLibraryChange}
          autoFocus={autoFocus}
          generateIdForFile={generateIdForFile}
          onLinkOpen={onLinkOpen}
          generateLinkForSelection={generateLinkForSelection}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onScrollChange={onScrollChange}
          onDuplicate={onDuplicate}
          validateEmbeddable={validateEmbeddable}
          renderEmbeddable={renderEmbeddable}
          aiEnabled={aiEnabled !== false}
          showDeprecatedFonts={showDeprecatedFonts}
          renderScrollbars={renderScrollbars}
        >
          {children}
        </App>
      </InitializeApp>
    </EditorJotaiProvider>
  );
};

const areEqual = (prevProps: JsonDrawProps, nextProps: JsonDrawProps) => {
  // short-circuit early
  if (prevProps.children !== nextProps.children) {
    return false;
  }

  const { initialData: prevInitialData, UIOptions: prevUIOptions = {}, ...prev } = prevProps;
  const { initialData: nextInitialData, UIOptions: nextUIOptions = {}, ...next } = nextProps;

  // comparing UIOptions
  const prevUIOptionsKeys = Object.keys(prevUIOptions) as (keyof Partial<
    typeof DEFAULT_UI_OPTIONS
  >)[];
  const nextUIOptionsKeys = Object.keys(nextUIOptions) as (keyof Partial<
    typeof DEFAULT_UI_OPTIONS
  >)[];

  if (prevUIOptionsKeys.length !== nextUIOptionsKeys.length) {
    return false;
  }

  const isUIOptionsSame = prevUIOptionsKeys.every(key => {
    if (key === "getFormFactor") {
      return true;
    }
    if (key === "canvasActions") {
      const canvasOptionKeys = Object.keys(prevUIOptions.canvasActions!) as (keyof Partial<
        typeof DEFAULT_UI_OPTIONS.canvasActions
      >)[];
      return canvasOptionKeys.every(key => {
        if (
          key === "export" &&
          prevUIOptions?.canvasActions?.export &&
          nextUIOptions?.canvasActions?.export
        ) {
          return (
            prevUIOptions.canvasActions.export.saveFileToDisk ===
            nextUIOptions.canvasActions.export.saveFileToDisk
          );
        }
        return prevUIOptions?.canvasActions?.[key] === nextUIOptions?.canvasActions?.[key];
      });
    }
    return prevUIOptions[key] === nextUIOptions[key];
  });

  return isUIOptionsSame && isShallowEqual(prev, next);
};

export const JsonDraw = React.memo(JsonDrawBase, areEqual);
JsonDraw.displayName = "JsonDraw";

export {
  getSceneVersion,
  hashElementsVersion,
  hashString,
  getNonDeletedElements,
} from "@jsondraw/element";

export { getTextFromElements } from "@jsondraw/element";
export { isInvisiblySmallElement } from "@jsondraw/element";

export { defaultLang, useI18n, languages } from "./i18n";
export {
  restoreAppState,
  restoreElement,
  restoreElements,
  restoreLibraryItems,
} from "./data/restore";

export { reconcileElements } from "./data/reconcile";

export {
  exportToCanvas,
  exportToBlob,
  exportToSvg,
  exportToClipboard,
} from "@jsondraw/utils/export";

export { serializeAsJSON, serializeLibraryAsJSON } from "./data/json";
export { loadFromBlob, loadSceneOrLibraryFromBlob, loadLibraryFromBlob } from "./data/blob";
export { mergeLibraryItems, getLibraryItemsHash } from "./data/library";
export { isLinearElement } from "@jsondraw/element";

export {
  FONT_FAMILY,
  THEME,
  MIME_TYPES,
  ROUNDNESS,
  DEFAULT_LASER_COLOR,
  UserIdleState,
  normalizeLink,
  sceneCoordsToViewportCoords,
  viewportCoordsToSceneCoords,
  getFormFactor,
} from "@jsondraw/common";

export { mutateElement, newElementWith, bumpVersion } from "@jsondraw/element";

export { CaptureUpdateAction } from "@jsondraw/element";

export { parseLibraryTokensFromUrl, useHandleLibrary } from "./data/library";

export { Sidebar } from "./components/Sidebar/Sidebar";
export { Button } from "./components/ui/Button";
export { Footer };
export { MainMenu };
export { Ellipsify } from "./components/ui/Ellipsify";
export { useEditorInterface, useStylesPanelMode } from "./components/App";
export { WelcomeScreen };
export { LiveCollaborationTrigger };
export { Stats } from "./components/Stats";

export { DefaultSidebar } from "./components/layout/DefaultSidebar";
export { TTDDialog } from "./components/TTDDialog/TTDDialog";
export { TTDDialogTrigger } from "./components/TTDDialog/TTDDialogTrigger";
export { TTDStreamFetch } from "./components/TTDDialog/utils/TTDStreamFetch";
export type { TTDPersistenceAdapter, SavedChat, SavedChats } from "./components/TTDDialog/types";

export { zoomToFitBounds } from "./actions/actionCanvas";
export {
  getCommonBounds,
  getVisibleSceneBounds,
  convertToJsonDrawElements,
} from "@jsondraw/element";

export {
  elementsOverlappingBBox,
  isElementInsideBBox,
  elementPartiallyOverlapsWithOrContainsBBox,
} from "@jsondraw/utils/withinBounds";

export { DiagramToCodePlugin } from "./components/DiagramToCodePlugin/DiagramToCodePlugin";
export { getDataURL } from "./data/blob";
export { isElementLink } from "@jsondraw/element";

export { setCustomTextMetricsProvider } from "@jsondraw/element";

export { CommandPalette } from "./components/CommandPalette/CommandPalette";
