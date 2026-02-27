import { MQ_MIN_WIDTH_DESKTOP, type EditorInterface } from "@jsondraw/common";
import clsx from "clsx";
import { useUIAppState } from "../../context/ui-appState";
import { t } from "../../i18n";
import { share } from "../icons";
import { Button } from "../ui/Button";
import "./LiveCollaborationTrigger.scss";

const LiveCollaborationTrigger = ({
  isCollaborating,
  onSelect,
  editorInterface,
  ...rest
}: {
  isCollaborating: boolean;
  onSelect: () => void;
  editorInterface?: EditorInterface;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const appState = useUIAppState();

  const showIconOnly =
    editorInterface?.formFactor !== "desktop" || appState.width < MQ_MIN_WIDTH_DESKTOP;

  return (
    <Button
      {...rest}
      className={clsx("collab-button", { active: isCollaborating })}
      type="button"
      onSelect={onSelect}
      style={{ position: "relative", width: showIconOnly ? undefined : "auto" }}
      title={t("labels.liveCollaboration")}
    >
      {showIconOnly ? share : t("labels.share")}
      {appState.collaborators.size > 0 && (
        <div className="CollabButton-collaborators">{appState.collaborators.size}</div>
      )}
    </Button>
  );
};

export default LiveCollaborationTrigger;
LiveCollaborationTrigger.displayName = "LiveCollaborationTrigger";
