import { useState, useRef } from "react";
import type { NonDeletedJsonDrawElement } from "@jsondraw/element/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { t } from "../../i18n";
import { useApp } from "../App";
import { ArrowRightIcon } from "../icons";
import "./MdToTable.scss";
import { convertMarkdownTableToElements } from "./mdToElements";
import { TTDDialogInput } from "./TTDDialogInput";
import { TTDDialogOutput } from "./TTDDialogOutput";
import { TTDDialogPanel } from "./TTDDialogPanel";
import { TTDDialogPanels } from "./TTDDialogPanels";
import { TTDDialogSubmitShortcut } from "./TTDDialogSubmitShortcut";
import { insertToEditor } from "./common";

const MD_EXAMPLE = `# Hello World

| Name  | Age | City   |
| ----- | --- | ------ |
| Alice | 28  | Hanoi  |
| Bob   | 32  | HCMC   |

- **Bold** and *italic* text
- \`inline code\`
- [Link](https://github.com/HoangDuonng)
`;

const MdToTable = ({ isActive }: { isActive?: boolean }) => {
  const [text, setText] = useState(() => MD_EXAMPLE);
  const app = useApp();
  const data = useRef<{
    elements: readonly NonDeletedJsonDrawElement[];
    files: null;
  }>({ elements: [], files: null });

  const onInsertToCanvas = () => {
    const elements = convertMarkdownTableToElements(text);
    if (elements.length === 0) {
      if ("setToast" in app && typeof app.setToast === "function") {
        app.setToast({ message: t("mdToTable.noTableFound"), closable: true });
      }
      return;
    }
    data.current = { elements, files: null };
    insertToEditor({
      app,
      data,
      text,
    });
  };

  return (
    <>
      <div className="ttd-dialog-desc">{t("mdToTable.description")}</div>
      <TTDDialogPanels className="md-to-table-panels">
        <TTDDialogPanel>
          <TTDDialogInput
            input={text}
            placeholder={t("mdToTable.inputPlaceholder")}
            onChange={e => setText(e.target.value)}
            onKeyboardSubmit={onInsertToCanvas}
          />
        </TTDDialogPanel>
        <TTDDialogPanel
          panelActions={[
            {
              action: onInsertToCanvas,
              label: t("mdToTable.button"),
              icon: ArrowRightIcon,
              variant: "button",
            },
          ]}
          renderSubmitShortcut={() => <TTDDialogSubmitShortcut />}
        >
          {isActive ? (
            <TTDDialogOutput>
              <div className="md-to-table-preview__content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{text || " "}</ReactMarkdown>
              </div>
            </TTDDialogOutput>
          ) : (
            <div className="md-to-table-preview__placeholder">{t("mdToTable.preview")}</div>
          )}
        </TTDDialogPanel>
      </TTDDialogPanels>
    </>
  );
};

export default MdToTable;
