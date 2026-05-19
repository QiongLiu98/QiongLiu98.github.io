import type { ReactNode } from "react";
import {
  contentShell,
  displayPageTitle,
  pageHeroOuter,
  serifLead,
  stackSm,
} from "@/lib/layout";

export function PageHero({
  number,
  label,
  title,
  description,
  children,
}: {
  number: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className={pageHeroOuter}>
      <div className={contentShell}>
        <div className="flex items-baseline gap-2 md:gap-3">
          <span className="num text-xs text-[var(--color-warm)]">{number}</span>
          <span className="label">{label}</span>
        </div>
        <h1 className={displayPageTitle}>{title}</h1>
        {description && (
          <p className={`${serifLead} ${stackSm} max-w-2xl`}>{description}</p>
        )}
        {children}
      </div>
    </header>
  );
}
