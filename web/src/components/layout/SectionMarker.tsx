import type { ReactNode } from "react";
import { displaySectionTitle, serifLead } from "@/lib/layout";

export function SectionMarker({
  number,
  label,
  title,
  description,
  align = "left",
}: {
  number: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className="flex items-baseline gap-2 md:gap-3">
        <span className="num text-xs text-[var(--color-warm)]">{number}</span>
        <span className="label">{label}</span>
      </div>
      <h2 className={displaySectionTitle}>{title}</h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl font-serif text-base italic leading-snug text-[var(--color-muted)] md:mt-5 md:text-xl md:leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
