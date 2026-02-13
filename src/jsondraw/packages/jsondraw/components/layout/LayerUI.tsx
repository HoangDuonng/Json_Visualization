import React from "react";
import {
  CLASSES,
  DEFAULT_SIDEBAR,
  TOOL_TYPE,
  arrayToMap,
  capitalizeString,
  isShallowEqual,
} from "@jsondraw/common";
import { mutateElement } from "@jsondraw/element";
import { showSelectedShapeActions } from "@jsondraw/element";
import { ShapeCache } from "@jsondraw/element";
import type { NonDeletedJsonDrawElement } from "@jsondraw/element/types";
import clsx from "clsx";
import { actionToggleStats } from "../../actions";
import type { ActionManager } from "../../actions/manager";
import { trackEvent } from "../../analytics";
import { isHandToolActive } from "../../appState";
import { TunnelsContext, useInitializeTunnels } from "../../context/tunnels";
import { UIAppStateContext } from "../../context/ui-appState";
import { useAtom, useAtomValue } from "../../editor-jotai";
import { t } from "../../i18n";
import type { Language } from "../../i18n";
import { calculateScrollCenter } from "../../scene";
import type {
  AppProps,
  AppState,
  JsonDrawProps,
  BinaryFiles,
  UIAppState,
  AppClassProperties,
} from "../../types";
import { SelectedShapeActions, ShapesSwitcher, CompactShapeActions } from "../Actions";
import { ActiveConfirmDialog } from "../ActiveConfirmDialog";
import { useEditorInterface, useStylesPanelMode } from "../App";
import { DefaultSidebar } from "./DefaultSidebar";
import { FixedSideContainer } from "./FixedSideContainer";
import ElementLinkDialog from "../ElementLinkDialog";
import { ErrorDialog } from "../ErrorDialog";
import { EyeDropper, activeEyeDropperAtom } from "../canvases/EyeDropper";
import { HandButton } from "../HandButton";
import { HelpDialog } from "../HelpDialog";
import { HintViewer } from "../popups/HintViewer";
import { ImageExportDialog } from "../export/ImageExportDialog";
import { Island } from "./Island";
import { JSONExportDialog } from "../export/JSONExportDialog";
import { LaserPointerButton } from "../LaserPointerButton";
import "./LayerUI.scss";
import { LoadingMessage } from "../LoadingMessage";
import { LockButton } from "../LockButton";
import { MobileMenu } from "./MobileMenu";
import { OverwriteConfirmDialog } from "../OverwriteConfirm/OverwriteConfirm";
import { PasteChartDialog } from "../PasteChartDialog";
import { PenModeButton } from "../PenModeButton";
import { Section } from "./Section";
import { isSidebarDockedAtom } from "../Sidebar/Sidebar";
import Stack from "./Stack";
import { Stats } from "../Stats";
import { TTDDialog } from "../TTDDialog/TTDDialog";
import "../Toolbar.scss";
import Footer from "../footer/Footer";
import { sidebarRightIcon } from "../icons";
import MainMenu from "../main-menu/MainMenu";
import { UserList } from "../user/UserList";

interface LayerUIProps {
  actionManager: ActionManager;
  appState: UIAppState;
  files: BinaryFiles;
  canvas: HTMLCanvasElement;
  setAppState: React.Component<any, AppState>["setState"];
  elements: readonly NonDeletedJsonDrawElement[];
  onLockToggle: () => void;
  onHandToolToggle: () => void;
  onPenModeToggle: AppClassProperties["togglePenMode"];
  showExitZenModeBtn: boolean;
  langCode: Language["code"];
  renderTopLeftUI?: JsonDrawProps["renderTopLeftUI"];
  renderTopRightUI?: JsonDrawProps["renderTopRightUI"];
  renderCustomStats?: JsonDrawProps["renderCustomStats"];
  UIOptions: AppProps["UIOptions"];
  onExportImage: AppClassProperties["onExportImage"];
  renderWelcomeScreen: boolean;
  children?: React.ReactNode;
  app: AppClassProperties;
  isCollaborating: boolean;
  generateLinkForSelection?: AppProps["generateLinkForSelection"];
}

const DefaultMainMenu: React.FC<{
  UIOptions: AppProps["UIOptions"];
  onClearDrawing?: () => void;
}> = ({ UIOptions, onClearDrawing }) => {
  return (
    <MainMenu __fallback>
      {/*
       Open và Save.
      */}
      <MainMenu.DefaultItems.LoadScene />
      <MainMenu.DefaultItems.SaveToActiveFile />

      {UIOptions.canvasActions.export && <MainMenu.DefaultItems.Export />}
      {onClearDrawing && (
        <>
          <MainMenu.Separator />
          <MainMenu.Item
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            }
            onSelect={onClearDrawing}
          >
            Clear Drawing
          </MainMenu.Item>
        </>
      )}
      {/*
        {UIOptions.canvasActions.saveAsImage && <MainMenu.DefaultItems.SaveAsImage />}
        <MainMenu.DefaultItems.SearchMenu />
        <MainMenu.DefaultItems.Help />
        <MainMenu.DefaultItems.ClearCanvas />
        <MainMenu.Separator />
        <MainMenu.Group title="JsonDraw links">
          <MainMenu.DefaultItems.Socials />
        </MainMenu.Group>
        <MainMenu.Separator />
        <MainMenu.DefaultItems.ToggleTheme />
        <MainMenu.DefaultItems.ChangeCanvasBackground />
      */}
    </MainMenu>
  );
};

const DefaultOverwriteConfirmDialog = () => {
  return (
    <OverwriteConfirmDialog __fallback>
      {/*
        Load from file.
      */}
      {/*
        <OverwriteConfirmDialog.Actions.SaveToDisk />
        <OverwriteConfirmDialog.Actions.ExportToImage />
      */}
    </OverwriteConfirmDialog>
  );
};

const LayerUI = ({
  actionManager,
  appState,
  files,
  setAppState,
  elements,
  canvas,
  onLockToggle,
  onHandToolToggle,
  onPenModeToggle,
  showExitZenModeBtn,
  renderTopLeftUI,
  renderTopRightUI,
  renderCustomStats,
  UIOptions,
  onExportImage,
  renderWelcomeScreen,
  children,
  app,
  isCollaborating,
  generateLinkForSelection,
}: LayerUIProps) => {
  const editorInterface = useEditorInterface();
  const stylesPanelMode = useStylesPanelMode();
  const isCompactStylesPanel = stylesPanelMode === "compact";
  const tunnels = useInitializeTunnels();

  const spacing = isCompactStylesPanel
    ? {
        menuTopGap: 4,
        toolbarColGap: 4,
        toolbarRowGap: 1,
        toolbarInnerRowGap: 0.5,
        islandPadding: 1,
        collabMarginLeft: 8,
      }
    : {
        menuTopGap: 6,
        toolbarColGap: 4,
        toolbarRowGap: 1,
        toolbarInnerRowGap: 1,
        islandPadding: 1,
        collabMarginLeft: 8,
      };

  const TunnelsJotaiProvider = tunnels.tunnelsJotai.Provider;

  const [eyeDropperState, setEyeDropperState] = useAtom(activeEyeDropperAtom);

  const renderJSONExportDialog = () => {
    if (!UIOptions.canvasActions.export) {
      return null;
    }

    return (
      <JSONExportDialog
        elements={elements}
        appState={appState}
        files={files}
        actionManager={actionManager}
        exportOpts={UIOptions.canvasActions.export}
        canvas={canvas}
        setAppState={setAppState}
      />
    );
  };

  const renderImageExportDialog = () => {
    if (!UIOptions.canvasActions.saveAsImage || appState.openDialog?.name !== "imageExport") {
      return null;
    }

    return (
      <ImageExportDialog
        elements={elements}
        appState={appState}
        files={files}
        actionManager={actionManager}
        onExportImage={onExportImage}
        onCloseRequest={() => setAppState({ openDialog: null })}
        name={app.getName()}
      />
    );
  };

  const renderCanvasActions = () => (
    <div style={{ position: "relative" }}>
      {/* wrapping to Fragment stops React from occasionally complaining
                about identical Keys */}
      <tunnels.MainMenuTunnel.Out />
      {renderWelcomeScreen && <tunnels.WelcomeScreenMenuHintTunnel.Out />}
    </div>
  );

  const renderSelectedShapeActions = () => {
    const isCompactMode = isCompactStylesPanel;

    return (
      <Section
        heading="selectedShapeActions"
        className={clsx("selected-shape-actions zen-mode-transition", {
          "transition-left": appState.zenModeEnabled,
        })}
      >
        {isCompactMode ? (
          <Island
            className={clsx("compact-shape-actions-island")}
            padding={0}
            style={{
              // we want to make sure this doesn't overflow so subtracting the
              // approximate height of hamburgerMenu + footer
              maxHeight: `${appState.height - 166}px`,
            }}
          >
            <CompactShapeActions
              appState={appState}
              elementsMap={app.scene.getNonDeletedElementsMap()}
              renderAction={actionManager.renderAction}
              app={app}
              setAppState={setAppState}
            />
          </Island>
        ) : (
          <Island
            className={CLASSES.SHAPE_ACTIONS_MENU}
            padding={2}
            style={{
              // we want to make sure this doesn't overflow so subtracting the
              // approximate height of hamburgerMenu + footer
              maxHeight: `${appState.height - 166}px`,
            }}
          >
            <SelectedShapeActions
              appState={appState}
              elementsMap={app.scene.getNonDeletedElementsMap()}
              renderAction={actionManager.renderAction}
              app={app}
            />
          </Island>
        )}
      </Section>
    );
  };

  const renderFixedSideContainer = () => {
    const shouldRenderSelectedShapeActions = showSelectedShapeActions(appState, elements);

    const shouldShowStats =
      appState.stats.open &&
      !appState.zenModeEnabled &&
      !appState.viewModeEnabled &&
      appState.openDialog?.name !== "elementLinkSelector";

    return (
      <FixedSideContainer side="top">
        <div className="App-menu App-menu_top">
          <Stack.Col gap={spacing.menuTopGap} className={clsx("App-menu_top__left")}>
            {renderCanvasActions()}
            <div
              className={clsx("selected-shape-actions-container", {
                "selected-shape-actions-container--compact": isCompactStylesPanel,
              })}
            >
              {shouldRenderSelectedShapeActions && renderSelectedShapeActions()}
            </div>
          </Stack.Col>
          {!appState.viewModeEnabled && appState.openDialog?.name !== "elementLinkSelector" && (
            <Section heading="shapes" className="shapes-section">
              {(heading: React.ReactNode) => (
                <div style={{ position: "relative" }}>
                  {renderWelcomeScreen && <tunnels.WelcomeScreenToolbarHintTunnel.Out />}
                  <Stack.Col gap={spacing.toolbarColGap} align="start">
                    <Stack.Row
                      gap={spacing.toolbarRowGap}
                      className={clsx("App-toolbar-container", {
                        "zen-mode": appState.zenModeEnabled,
                      })}
                    >
                      <Island
                        padding={spacing.islandPadding}
                        className={clsx("App-toolbar", {
                          "zen-mode": appState.zenModeEnabled,
                          "App-toolbar--compact": isCompactStylesPanel,
                        })}
                      >
                        <HintViewer
                          appState={appState}
                          isMobile={editorInterface.formFactor === "phone"}
                          editorInterface={editorInterface}
                          app={app}
                        />
                        {heading}
                        <Stack.Row gap={spacing.toolbarInnerRowGap}>
                          <PenModeButton
                            zenModeEnabled={appState.zenModeEnabled}
                            checked={appState.penMode}
                            onChange={() => onPenModeToggle(null)}
                            title={t("toolBar.penMode")}
                            penDetected={appState.penDetected}
                          />
                          <LockButton
                            checked={appState.activeTool.locked}
                            onChange={onLockToggle}
                            title={t("toolBar.lock")}
                          />

                          <div className="App-toolbar__divider" />

                          <HandButton
                            checked={isHandToolActive(appState)}
                            onChange={() => onHandToolToggle()}
                            title={t("toolBar.hand")}
                            isMobile
                          />

                          <ShapesSwitcher
                            setAppState={setAppState}
                            activeTool={appState.activeTool}
                            UIOptions={UIOptions}
                            app={app}
                          />
                        </Stack.Row>
                      </Island>
                      {isCollaborating && (
                        <Island
                          style={{
                            marginLeft: spacing.collabMarginLeft,
                            alignSelf: "center",
                            height: "fit-content",
                          }}
                        >
                          <LaserPointerButton
                            title={t("toolBar.laser")}
                            checked={appState.activeTool.type === TOOL_TYPE.laser}
                            onChange={() => app.setActiveTool({ type: TOOL_TYPE.laser })}
                            isMobile
                          />
                        </Island>
                      )}
                    </Stack.Row>
                  </Stack.Col>
                </div>
              )}
            </Section>
          )}
          <div
            className={clsx("layer-ui__wrapper__top-right zen-mode-transition", {
              "transition-right": appState.zenModeEnabled,
              "layer-ui__wrapper__top-right--compact": isCompactStylesPanel,
            })}
          >
            {appState.collaborators.size > 0 && (
              <UserList
                collaborators={appState.collaborators}
                userToFollow={appState.userToFollow?.socketId || null}
              />
            )}
            {renderTopRightUI?.(editorInterface.formFactor === "phone", appState)}
            {!appState.viewModeEnabled &&
              appState.openDialog?.name !== "elementLinkSelector" &&
              // hide button when sidebar docked
              (!isSidebarDocked || appState.openSidebar?.name !== DEFAULT_SIDEBAR.name) && (
                <tunnels.DefaultSidebarTriggerTunnel.Out />
              )}
            {shouldShowStats && (
              <Stats
                app={app}
                onClose={() => {
                  actionManager.executeAction(actionToggleStats);
                }}
                renderCustomStats={renderCustomStats}
              />
            )}
          </div>
        </div>
      </FixedSideContainer>
    );
  };

  const renderSidebars = () => {
    return (
      <DefaultSidebar
        __fallback
        onDock={docked => {
          trackEvent(
            "sidebar",
            `toggleDock (${docked ? "dock" : "undock"})`,
            `(${editorInterface.formFactor === "phone" ? "mobile" : "desktop"})`
          );
        }}
      />
    );
  };

  const isSidebarDocked = useAtomValue(isSidebarDockedAtom);

  const layerUIJSX = (
    <>
      {/* ------------------------- tunneled UI ---------------------------- */}
      {/* make sure we render host app components first so that we can detect
          them first on initial render to optimize layout shift */}
      {children}
      {/* render component fallbacks. Can be rendered anywhere as they'll be
          tunneled away. We only render tunneled components that actually
        have defaults when host do not render anything. */}

      <DefaultMainMenu UIOptions={UIOptions} onClearDrawing={UIOptions.canvasActions.clearDrawing} />
      <DefaultSidebar.Trigger
        __fallback
        icon={sidebarRightIcon}
        title={capitalizeString(t("toolBar.library"))}
        onToggle={open => {
          if (open) {
            trackEvent(
              "sidebar",
              `${DEFAULT_SIDEBAR.name} (open)`,
              `button (${editorInterface.formFactor === "phone" ? "mobile" : "desktop"})`
            );
          }
        }}
        tab={DEFAULT_SIDEBAR.defaultTab}
      />
      <DefaultOverwriteConfirmDialog />
      {appState.openDialog?.name === "ttd" && <TTDDialog __fallback />}
      {/* ------------------------------------------------------------------ */}

      {appState.isLoading && <LoadingMessage delay={250} />}
      {appState.errorMessage && (
        <ErrorDialog onClose={() => setAppState({ errorMessage: null })}>
          {appState.errorMessage}
        </ErrorDialog>
      )}
      {eyeDropperState && editorInterface.formFactor !== "phone" && (
        <EyeDropper
          colorPickerType={eyeDropperState.colorPickerType}
          onCancel={() => {
            setEyeDropperState(null);
          }}
          onChange={(colorPickerType, color, selectedElements, { altKey }) => {
            if (colorPickerType !== "elementBackground" && colorPickerType !== "elementStroke") {
              return;
            }

            if (selectedElements.length) {
              for (const element of selectedElements) {
                mutateElement(element, arrayToMap(elements), {
                  [altKey && eyeDropperState.swapPreviewOnAlt
                    ? colorPickerType === "elementBackground"
                      ? "strokeColor"
                      : "backgroundColor"
                    : colorPickerType === "elementBackground"
                      ? "backgroundColor"
                      : "strokeColor"]: color,
                });
                ShapeCache.delete(element);
              }
              app.scene.triggerUpdate();
            } else if (colorPickerType === "elementBackground") {
              setAppState({
                currentItemBackgroundColor: color,
              });
            } else {
              setAppState({ currentItemStrokeColor: color });
            }
          }}
          onSelect={(color, event) => {
            setEyeDropperState(state => {
              return state?.keepOpenOnAlt && event.altKey ? state : null;
            });
            eyeDropperState?.onSelect?.(color, event);
          }}
        />
      )}
      {appState.openDialog?.name === "help" && (
        <HelpDialog
          onClose={() => {
            setAppState({ openDialog: null });
          }}
        />
      )}
      <ActiveConfirmDialog />
      {appState.openDialog?.name === "elementLinkSelector" && (
        <ElementLinkDialog
          sourceElementId={appState.openDialog.sourceElementId}
          onClose={() => {
            setAppState({
              openDialog: null,
            });
          }}
          scene={app.scene}
          appState={appState}
          generateLinkForSelection={generateLinkForSelection}
        />
      )}
      <tunnels.OverwriteConfirmDialogTunnel.Out />
      {renderImageExportDialog()}
      {renderJSONExportDialog()}
      {appState.pasteDialog.shown && (
        <PasteChartDialog
          setAppState={setAppState}
          appState={appState}
          onClose={() =>
            setAppState({
              pasteDialog: { shown: false, data: null },
            })
          }
        />
      )}
      {editorInterface.formFactor === "phone" && (
        <MobileMenu
          app={app}
          appState={appState}
          elements={elements}
          actionManager={actionManager}
          renderJSONExportDialog={renderJSONExportDialog}
          renderImageExportDialog={renderImageExportDialog}
          setAppState={setAppState}
          onHandToolToggle={onHandToolToggle}
          onPenModeToggle={onPenModeToggle}
          renderTopLeftUI={renderTopLeftUI}
          renderTopRightUI={renderTopRightUI}
          renderSidebars={renderSidebars}
          renderWelcomeScreen={renderWelcomeScreen}
          UIOptions={UIOptions}
        />
      )}
      {editorInterface.formFactor !== "phone" && (
        <>
          <div
            className="layer-ui__wrapper"
            style={
              appState.openSidebar && isSidebarDocked && editorInterface.canFitSidebar
                ? { width: `calc(100% - var(--right-sidebar-width))` }
                : {}
            }
          >
            {renderWelcomeScreen && <tunnels.WelcomeScreenCenterTunnel.Out />}
            {renderFixedSideContainer()}
            <Footer
              appState={appState}
              actionManager={actionManager}
              showExitZenModeBtn={showExitZenModeBtn}
              renderWelcomeScreen={renderWelcomeScreen}
            />
            {appState.scrolledOutside && (
              <button
                type="button"
                className="scroll-back-to-content"
                onClick={() => {
                  setAppState(appState => ({
                    ...calculateScrollCenter(elements, appState),
                  }));
                }}
              >
                {t("buttons.scrollBackToContent")}
              </button>
            )}
          </div>
          {renderSidebars()}
        </>
      )}
    </>
  );

  return (
    <UIAppStateContext.Provider value={appState}>
      <TunnelsJotaiProvider>
        <TunnelsContext.Provider value={tunnels}>{layerUIJSX}</TunnelsContext.Provider>
      </TunnelsJotaiProvider>
    </UIAppStateContext.Provider>
  );
};

const stripIrrelevantAppStateProps = (appState: AppState): UIAppState => {
  const { startBoundElement, cursorButton, scrollX, scrollY, ...ret } = appState;
  return ret;
};

const areEqual = (prevProps: LayerUIProps, nextProps: LayerUIProps) => {
  // short-circuit early
  if (prevProps.children !== nextProps.children) {
    return false;
  }

  const { canvas: _pC, appState: prevAppState, ...prev } = prevProps;
  const { canvas: _nC, appState: nextAppState, ...next } = nextProps;

  return (
    isShallowEqual(
      // asserting AppState because we're being passed the whole AppState
      // but resolve to only the UI-relevant props
      stripIrrelevantAppStateProps(prevAppState as AppState),
      stripIrrelevantAppStateProps(nextAppState as AppState),
      {
        selectedElementIds: isShallowEqual,
        selectedGroupIds: isShallowEqual,
      }
    ) && isShallowEqual(prev, next)
  );
};

export default React.memo(LayerUI, areEqual);
