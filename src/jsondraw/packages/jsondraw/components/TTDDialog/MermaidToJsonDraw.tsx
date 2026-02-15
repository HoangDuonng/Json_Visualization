import { useState, useRef, useEffect, useDeferredValue } from "react";
import { EDITOR_LS_KEYS, debounce, isDevEnv } from "@jsondraw/common";
import type { NonDeletedJsonDrawElement } from "@jsondraw/element/types";
import { useUIAppState } from "../../context/ui-appState";
import { EditorLocalStorage } from "../../data/EditorLocalStorage";
import { t } from "../../i18n";
import type { BinaryFiles } from "../../types";
import { useApp } from "../App";
import { ArrowRightIcon } from "../icons";
import Trans from "../ui/Trans";
import "./MermaidToJsonDraw.scss";
import { TTDDialogInput } from "./TTDDialogInput";
import { TTDDialogOutput } from "./TTDDialogOutput";
import { TTDDialogPanel } from "./TTDDialogPanel";
import { TTDDialogPanels } from "./TTDDialogPanels";
import { TTDDialogSubmitShortcut } from "./TTDDialogSubmitShortcut";
import {
  convertMermaidToJsonDraw,
  insertToEditor,
  saveMermaidDataToStorage,
  resetPreview,
} from "./common";
import type { MermaidToJsonDrawLibProps } from "./types";

const MERMAID_EXAMPLE =
  "flowchart TD\n A[Christmas] -->|Get money| B(Go shopping)\n B --> C{Let me think}\n C -->|One| D[Laptop]\n C -->|Two| E[iPhone]\n C -->|Three| F[Car]";

const debouncedSaveMermaidDefinition = debounce(saveMermaidDataToStorage, 300);

const MermaidToJsonDraw = ({
  mermaidToJsonDrawLib,
  isActive,
}: {
  mermaidToJsonDrawLib: MermaidToJsonDrawLibProps;
  isActive?: boolean;
}) => {
  const [text, setText] = useState(
    () => EditorLocalStorage.get<string>(EDITOR_LS_KEYS.MERMAID_TO_JSONDRAW) || MERMAID_EXAMPLE
  );
  const deferredText = useDeferredValue(text.trim());
  const [error, setError] = useState<Error | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const data = useRef<{
    elements: readonly NonDeletedJsonDrawElement[];
    files: BinaryFiles | null;
  }>({ elements: [], files: null });

  const app = useApp();
  const { theme } = useUIAppState();

  useEffect(() => {
    const doRender = async () => {
      try {
        if (!deferredText) {
          resetPreview({ canvasRef, setError });
          return;
        }
        const result = await convertMermaidToJsonDraw({
          canvasRef,
          data,
          mermaidToJsonDrawLib,
          setError,
          mermaidDefinition: deferredText,
          theme,
        });

        if (!result.success) {
          const err = result.error ?? new Error("Invalid mermaid definition");
          setError(err);
        }
      } catch (err) {
        if (isDevEnv()) {
          console.error("Failed to parse mermaid definition", err);
        }
      }
    };

    if (isActive) {
      doRender();
      debouncedSaveMermaidDefinition(deferredText);
    }
  }, [deferredText, mermaidToJsonDrawLib, isActive, theme]);

  useEffect(
    () => () => {
      debouncedSaveMermaidDefinition.flush();
    },
    []
  );

  const onInsertToEditor = () => {
    insertToEditor({
      app,
      data,
      text,
      shouldSaveMermaidDataToStorage: true,
    });
  };

  return (
    <>
      <div className="ttd-dialog-desc">
        <Trans
          i18nKey="mermaid.description"
          flowchartLink={el => <a href="https://mermaid.js.org/syntax/flowchart.html">{el}</a>}
          sequenceLink={el => <a href="https://mermaid.js.org/syntax/sequenceDiagram.html">{el}</a>}
          classLink={el => <a href="https://mermaid.js.org/syntax/classDiagram.html">{el}</a>}
        />
      </div>
      <TTDDialogPanels>
        <TTDDialogPanel>
          <TTDDialogInput
            input={text}
            placeholder={t("mermaid.inputPlaceholder")}
            onChange={event => setText(event.target.value)}
            onKeyboardSubmit={() => {
              onInsertToEditor();
            }}
          />
        </TTDDialogPanel>
        <TTDDialogPanel
          panelActions={[
            {
              action: () => {
                onInsertToEditor();
              },
              label: t("mermaid.button"),
              icon: ArrowRightIcon,
              variant: "button",
            },
          ]}
          renderSubmitShortcut={() => <TTDDialogSubmitShortcut />}
        >
          <TTDDialogOutput
            canvasRef={canvasRef}
            loaded={mermaidToJsonDrawLib.loaded}
            error={error}
          />
        </TTDDialogPanel>
      </TTDDialogPanels>
    </>
  );
};
export default MermaidToJsonDraw;
