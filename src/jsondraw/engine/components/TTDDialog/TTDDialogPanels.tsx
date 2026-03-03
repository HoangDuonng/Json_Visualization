import clsx from "clsx";
import type { ReactNode } from "react";

export const TTDDialogPanels = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={clsx("ttd-dialog-panels", className)}>{children}</div>;
};
