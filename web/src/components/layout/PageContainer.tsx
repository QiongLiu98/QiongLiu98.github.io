import type { ReactNode } from "react";
import { contentShell } from "@/lib/layout";

export function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${contentShell} ${className}`}>{children}</div>;
}
