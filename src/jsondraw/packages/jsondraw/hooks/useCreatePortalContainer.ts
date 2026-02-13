import { useState, useLayoutEffect } from "react";

import { THEME } from "@jsondraw/common";

import { useEditorInterface, useJsonDrawContainer } from "../components/App";
import { useUIAppState } from "../context/ui-appState";

export const useCreatePortalContainer = (opts?: {
  className?: string;
  parentSelector?: string;
}) => {
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  const editorInterface = useEditorInterface();
  const { theme } = useUIAppState();

  const { container: jsondrawContainer } = useJsonDrawContainer();

  useLayoutEffect(() => {
    if (div) {
      div.className = "";
      div.classList.add("jsondraw", ...(opts?.className?.split(/\s+/) || []));
      div.classList.toggle(
        "jsondraw--mobile",
        editorInterface.formFactor === "phone",
      );
      div.classList.toggle("theme--dark", theme === THEME.DARK);
    }
  }, [div, theme, editorInterface.formFactor, opts?.className]);

  useLayoutEffect(() => {
    const container = opts?.parentSelector
      ? jsondrawContainer?.querySelector(opts.parentSelector)
      : document.body;

    if (!container) {
      return;
    }

    const div = document.createElement("div");

    container.appendChild(div);

    setDiv(div);

    return () => {
      container.removeChild(div);
    };
  }, [jsondrawContainer, opts?.parentSelector]);

  return div;
};
