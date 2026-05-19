"use client";

import { useEffect, useMemo, useState } from "react";
import { CustomThemeEditor } from "@/components/theme/CustomThemeEditor";
import { THEME_GROUPS, type ThemeGroup } from "@/lib/themes";
import type { CustomTheme } from "@/lib/theme-colors";
import { useTheme } from "@/components/theme/ThemeProvider";

function ThemeOption({
  id,
  label,
  description,
  swatches,
  active,
  onSelect,
}: {
  id: string;
  label: string;
  description: string;
  swatches: { name: string; token?: string; hex?: string }[];
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(id)}
        className={`w-full rounded-sm border px-3 py-2 text-left transition-colors ${
          active
            ? "border-[var(--color-warm)] bg-[var(--color-warm-soft)]"
            : "border-[var(--color-rule)] bg-[var(--color-paper)] hover:border-[var(--color-highlight)]"
        }`}
      >
        <span className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-[var(--color-ink)]">
            {label}
          </span>
          {active && (
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-warm)]">
              Active
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-[var(--color-muted)]">
          {description}
        </span>
        <span className="mt-1.5 flex gap-1">
          {swatches.map((s) => (
            <span
              key={s.token ?? s.hex}
              title={s.name}
              className="h-3.5 w-3.5 rounded-full border border-[var(--color-rule)]"
              style={{
                background: s.hex ?? `var(${s.token})`,
              }}
            />
          ))}
        </span>
      </button>
    </li>
  );
}

function ThemeGroupFolder({
  group,
  activeTheme,
  onSelectTheme,
  expandActive,
}: {
  group: ThemeGroup;
  activeTheme: string;
  onSelectTheme: (id: string) => void;
  expandActive: boolean;
}) {
  const hasActive = group.themes.some((t) => t.id === activeTheme);
  const [open, setOpen] = useState(group.defaultOpen ?? hasActive);

  useEffect(() => {
    if (expandActive && hasActive) setOpen(true);
  }, [expandActive, hasActive]);

  return (
    <div className="border-b border-[var(--color-rule-soft)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 py-2.5 text-left transition-colors hover:text-[var(--color-warm)]"
      >
        <span
          className="num w-4 shrink-0 text-center text-[10px] text-[var(--color-muted-soft)]"
          aria-hidden
        >
          {open ? "−" : "+"}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium tracking-wide text-[var(--color-ink)] uppercase">
            {group.label}
          </span>
          {group.description && (
            <span className="mt-0.5 block text-[10px] leading-snug text-[var(--color-muted)]">
              {group.description}
            </span>
          )}
        </span>
        <span className="num shrink-0 text-[10px] text-[var(--color-muted-soft)]">
          {group.themes.length}
        </span>
      </button>
      {open && (
        <ul className="space-y-1.5 pb-2 pl-6">
          {group.themes.map((t) => (
            <ThemeOption
              key={t.id}
              id={t.id}
              label={t.label}
              description={t.description}
              swatches={t.swatches}
              active={activeTheme === t.id}
              onSelect={onSelectTheme}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function customToSwatches(ct: CustomTheme) {
  return [
    { name: "Paper", hex: ct.colors.paper },
    { name: "Warm", hex: ct.colors.warm },
    { name: "Accent", hex: ct.colors.highlight },
    { name: "Ink", hex: ct.colors.ink },
  ];
}

export function ThemeExplorer() {
  const {
    theme,
    setTheme,
    customThemes,
    refreshCustomThemes,
    setIsEditingCustom,
  } = useTheme();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tab, setTab] = useState<"browse" | "edit">("browse");

  const customGroup: ThemeGroup | null = useMemo(() => {
    if (customThemes.length === 0) return null;
    return {
      id: "custom-saved",
      label: "Your saved styles",
      description: "Palettes saved to this project",
      defaultOpen: true,
      themes: customThemes.map((ct) => ({
        id: ct.id,
        label: ct.label,
        description: ct.description ?? "Custom palette",
        swatches: customToSwatches(ct),
      })),
    };
  }, [customThemes]);

  const allGroups = useMemo(
    () => (customGroup ? [...THEME_GROUPS, customGroup] : THEME_GROUPS),
    [customGroup],
  );

  return (
    <div
      className="fixed bottom-20 right-4 z-[45] flex flex-col items-end sm:bottom-24 sm:right-6"
      aria-label="Theme explorer"
    >
      {pickerOpen && (
        <div className="mb-3 w-[min(100vw-2rem,24rem)] rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)] p-4 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)]">
          <p className="label mb-1">Style experiments</p>
          <p className="font-serif text-sm italic text-[var(--color-muted)]">
            Browse presets or build your own palette.
          </p>

          <div className="mt-3 flex gap-1 border-b border-[var(--color-rule-soft)] pb-2">
            <button
              type="button"
              onClick={() => {
                setTab("browse");
                setIsEditingCustom(false);
              }}
              className={`flex-1 rounded-sm px-2 py-1.5 text-xs font-medium transition-colors ${
                tab === "browse"
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              Presets
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("edit");
                setIsEditingCustom(true);
              }}
              className={`flex-1 rounded-sm px-2 py-1.5 text-xs font-medium transition-colors ${
                tab === "edit"
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              Customize
            </button>
          </div>

          {tab === "browse" ? (
            <div className="mt-2 max-h-[min(58vh,26rem)] overflow-y-auto overscroll-contain pr-0.5">
              {allGroups.map((group) => (
                <ThemeGroupFolder
                  key={group.id}
                  group={group}
                  activeTheme={theme}
                  onSelectTheme={setTheme}
                  expandActive={pickerOpen}
                />
              ))}
            </div>
          ) : (
            <div className="mt-2 max-h-[min(58vh,26rem)] overflow-y-auto overscroll-contain">
              <CustomThemeEditor
                onSaved={() => {
                  void refreshCustomThemes();
                }}
              />
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setPickerOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-surface)]/95 px-4 py-2 text-xs font-medium text-[var(--color-ink)] shadow-md backdrop-blur-sm transition-colors hover:border-[var(--color-warm)]"
        aria-expanded={pickerOpen}
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
