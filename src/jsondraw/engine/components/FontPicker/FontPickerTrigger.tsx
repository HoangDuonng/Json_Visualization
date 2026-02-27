import { MOBILE_ACTION_BUTTON_BG } from "@jsondraw/common";
import type { FontFamilyValues } from "@jsondraw/element/types";
import { Popover } from "radix-ui";
import { t } from "../../i18n";
import { useJsonDrawSetAppState } from "../App";
import { TextIcon } from "../icons";
import { ButtonIcon } from "../ui/ButtonIcon";

interface FontPickerTriggerProps {
  selectedFontFamily: FontFamilyValues | null;
  isOpened?: boolean;
  compactMode?: boolean;
}

export const FontPickerTrigger = ({
  selectedFontFamily,
  isOpened = false,
  compactMode = false,
}: FontPickerTriggerProps) => {
  const setAppState = useJsonDrawSetAppState();

  const compactStyle = compactMode
    ? {
        ...MOBILE_ACTION_BUTTON_BG,
        width: "2rem",
        height: "2rem",
      }
    : {};

  return (
    <Popover.Trigger asChild>
      <div data-openpopup="fontFamily" className="properties-trigger">
        <ButtonIcon
          standalone
          icon={TextIcon}
          title={t("labels.showFonts")}
          className="properties-trigger"
          testId={"font-family-show-fonts"}
          active={isOpened}
          onClick={() => {
            setAppState(appState => ({
              openPopup: appState.openPopup === "fontFamily" ? null : appState.openPopup,
            }));
          }}
          style={{
            border: "none",
            ...compactStyle,
          }}
        />
      </div>
    </Popover.Trigger>
  );
};
