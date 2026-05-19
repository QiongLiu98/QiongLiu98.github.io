"use client";

import { useState } from "react";
import { SITE_THEMES } from "@/lib/themes";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeExplorer() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-20 right-4 z-[45] flex flex-col items-end sm:bottom-24 sm:right-6"
      aria-label="Theme explorer"
    >
      {open && (
        <div className="mb-3 w-[min(100vw-2rem,20rem)] rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)] p-4 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)]">
          <p className="label mb-1">Style experiments</p>
          <p className="font-serif text-sm italic text-[var(--color-muted)]">
            Same layout &amp; content — swap palettes to compare.
          </p>
          <ul className="mt-4 max-h-[min(58vh,26rem)] space-y-2 overflow-y-auto overscroll-contain pr-1">
            {SITE_THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setTheme(t.id)}
                    className={`w-full rounded-sm border px-3 py-2.5 text-left transition-colors ${
                      active
                        ? "border-[var(--color-warm)] bg-[var(--color-warm-soft)]"
                        : "border-[var(--color-rule)] bg-[var(--color-paper)] hover:border-[var(--color-highlight)]"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-[var(--color-ink)]">
                        {t.label}
                      </span>
                      {active && (
                        <span className="text-[10px] uppercase tracking-wider text-[var(--color-warm)]">
                          Active
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-xs text-[var(--color-muted)]">
                      {t.description}
                    </span>
                    <span className="mt-2 flex gap-1">
                      {t.swatches.map((s) => (
                        <span
                          key={s.token}
                          title={s.name}
                          className="h-4 w-4 rounded-full border border-[var(--color-rule)]"
                          style={{ background: `var(${s.token})` }}
                        />
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-surface)]/95 px-4 py-2 text-xs font-medium text-[var(--color-ink)] shadow-md backdrop-blur-sm transition-colors hover:border-[var(--color-warm)]"
        aria-expanded={open}
      >
        <span
          className="flex h-3 w-3 gap-0.5 overflow-hidden rounded-full"
          aria-hidden
        >
          <span
            className="h-full w-1"
            style={{ background: "var(--color-warm)" }}
          />
          <span
            className="h-full w-1"
            style={{ background: "var(--color-highlight)" }}
          />
          <span
            className="h-full w-1"
            style={{ background: "var(--color-tertiary)" }}
          />
        </span>
        Themes
      </button>
    </div>
  );
}
