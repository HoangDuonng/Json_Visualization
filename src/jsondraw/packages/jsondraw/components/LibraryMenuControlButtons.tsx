import clsx from "clsx";

import LibraryMenuBrowseButton from "./LibraryMenuBrowseButton";

import type { JsonDrawProps, UIAppState } from "../types";

export const LibraryMenuControlButtons = ({
  libraryReturnUrl,
  theme,
  id,
  style,
  children,
  className,
}: {
  libraryReturnUrl: JsonDrawProps["libraryReturnUrl"];
  theme: UIAppState["theme"];
  id: string;
  style: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx("library-menu-control-buttons", className)}
      style={style}
    >
      <LibraryMenuBrowseButton
        id={id}
        libraryReturnUrl={libraryReturnUrl}
        theme={theme}
      />
      {children}
    </div>
  );
};
