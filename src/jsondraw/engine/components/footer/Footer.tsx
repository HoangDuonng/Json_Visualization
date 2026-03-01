import clsx from "clsx";

import { TOOL_TYPE } from "@jsondraw/common";
import { actionShortcuts } from "../../actions";
import { isHandToolActive } from "../../appState";
import { useTunnels } from "../../context/tunnels";
import { t } from "../../i18n";
import type { AppClassProperties } from "../../types";
import { ExitZenModeButton, ExitViewModeButton, UndoRedoActions, ZoomActions } from "../toolbar/Actions";
import { HandButton } from "../toolbar/HandButton";
import { HelpButton } from "../toolbar/HelpButton";
import { LaserPointerButton } from "../toolbar/LaserPointerButton";
import { Section } from "../layout/Section";
import Stack from "../layout/Stack";

import type { ActionManager } from "../../actions/manager";
import type { UIAppState } from "../../types";

const Footer = ({
  appState,
  actionManager,
  showExitZenModeBtn,
  renderWelcomeScreen,
  app,
}: {
  appState: UIAppState;
  actionManager: ActionManager;
  showExitZenModeBtn: boolean;
  renderWelcomeScreen: boolean;
  app?: AppClassProperties;
}) => {
  const { FooterCenterTunnel, WelcomeScreenHelpHintTunnel } = useTunnels();

  return (
    <footer
      role="contentinfo"
      className="layer-ui__wrapper__footer App-menu App-menu_bottom"
    >
      <div
        className={clsx("layer-ui__wrapper__footer-left zen-mode-transition", {
          "layer-ui__wrapper__footer-left--transition-left":
            appState.zenModeEnabled,
        })}
      >
        <Stack.Col gap={2}>
          <Section heading="canvasActions">
            <ZoomActions
              renderAction={actionManager.renderAction}
              zoom={appState.zoom}
            />

            {!appState.viewModeEnabled && (
              <UndoRedoActions
                renderAction={actionManager.renderAction}
                className={clsx("zen-mode-transition", {
                  "layer-ui__wrapper__footer-left--transition-bottom":
                    appState.zenModeEnabled,
                })}
              />
            )}
          </Section>
        </Stack.Col>
      </div>
      <FooterCenterTunnel.Out />
      <div
        className={clsx("layer-ui__wrapper__footer-right zen-mode-transition", {
          "transition-right": appState.zenModeEnabled,
        })}
      >
        <div style={{ position: "relative" }}>
          {renderWelcomeScreen && <WelcomeScreenHelpHintTunnel.Out />}
          {appState.viewModeEnabled && app && (
            <Stack.Col gap={8} className="view-mode-footer-actions">
              <HandButton
                title={t("toolBar.hand")}
                checked={isHandToolActive(appState)}
                onChange={() => app.setActiveTool({ type: TOOL_TYPE.hand })}
                isMobile
              />
              <LaserPointerButton
                title={t("toolBar.laser")}
                checked={appState.activeTool.type === TOOL_TYPE.laser}
                onChange={() => app.setActiveTool({ type: TOOL_TYPE.laser })}
              />
              <ExitViewModeButton actionManager={actionManager} />
            </Stack.Col>
          )}
          <HelpButton
            onClick={() => actionManager.executeAction(actionShortcuts)}
          />
        </div>
      </div>
      <ExitZenModeButton
        actionManager={actionManager}
        showExitZenModeBtn={showExitZenModeBtn}
      />
    </footer>
  );
};

export default Footer;
Footer.displayName = "Footer";
