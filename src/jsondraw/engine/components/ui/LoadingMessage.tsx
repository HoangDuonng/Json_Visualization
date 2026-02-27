import { useState, useEffect } from "react";
import React from "react";
import { THEME } from "@jsondraw/common";
import type { Theme } from "@jsondraw/element/types";
import clsx from "clsx";
import { t } from "../../i18n";
import HamsterLoader from "./HamsterLoader";

export const LoadingMessage: React.FC<{ delay?: number; theme?: Theme }> = ({ delay, theme }) => {
  const [isWaiting, setIsWaiting] = React.useState(!!delay);

  React.useEffect(() => {
    if (!delay) {
      return;
    }
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (isWaiting) {
    return null;
  }

  return (
    <div
      className={clsx("LoadingMessage", {
        "LoadingMessage--dark": theme === THEME.DARK,
      })}
    >
      <div>
        <HamsterLoader />
      </div>
      <div className="LoadingMessage-text">{t("labels.loadingScene")}</div>
    </div>
  );
};
