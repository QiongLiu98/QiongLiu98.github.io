"use client";

import { useCallback, useEffect, useState } from "react";
import { ColorPicker2D } from "@/components/theme/ColorPicker2D";
import {
  DEFAULT_BASE_COLORS,
  THEME_COLOR_FIELDS,
  type ThemeBaseColors,
  type ThemeColorFieldKey,
} from "@/lib/theme-colors";
import { useTheme } from "@/components/theme/ThemeProvider";

type CustomThemeEditorProps = {
  onSaved?: () => void;
};

export function CustomThemeEditor({ onSaved }: CustomThemeEditorProps) {
  const { previewCustomColors, draftColors, setDraftColors } = useTheme();
  const [activeField, setActiveField] =
    useState<ThemeColorFieldKey>("paper");

  useEffect(() => {
    if (!draftColors) {
      setDraftColors({ ...DEFAULT_BASE_COLORS });
    }
  }, [draftColors, setDraftColors]);

  const colors = draftColors ?? DEFAULT_BASE_COLORS;

  const updateColor = useCallback(
    (key: ThemeColorFieldKey, hex: string) => {
      const next = { ...colors, [key]: hex };
      setDraftColors(next);
      previewCustomColors(next);
    },
    [colors, previewCustomColors, setDraftColors],
  );

  const activeMeta = THEME_COLOR_FIELDS.find((f) => f.key === activeField)!;

  return (
    <div className="space-y-3 border-t border-[var(--color-rule-soft)] pt-3">
      <div>
        <p className="label mb-1">Custom builder</p>
        <p className="text-[11px] leading-snug text-[var(--color-muted)]">
          Drag on the square (saturation ↔, brightness ↕), then the hue bar.
          Changes preview live.
        </p>
      </div>

      <label className="block">
        <span className="label mb-1 block">Element</span>
        <select
          value={activeField}
          onChange={(e) => setActiveField(e.target.value as ThemeColorFieldKey)}
          className="w-full rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-2 text-sm text-[var(--color-ink)]"
        >
          {THEME_COLOR_FIELDS.map((f) => (
            <option key={f.key} value={f.key}>
              {f.label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-center gap-2">
        {THEME_COLOR_FIELDS.map((f) => (
          <button
            key={f.key}
            type="button"
            title={f.label}
            onClick={() => setActiveField(f.key)}
            className={`h-6 w-6 rounded-full border-2 transition-transform ${
              activeField === f.key
                ? "scale-110 border-[var(--color-warm)]"
                : "border-[var(--color-rule)]"
            }`}
            style={{ backgroundColor: colors[f.key] }}
          />
        ))}
      </div>

      <p className="text-xs font-medium text-[var(--color-ink)]">
        {activeMeta.label}
      </p>
      <ColorPicker2D
        value={colors[activeField]}
        onChange={(hex) => updateColor(activeField, hex)}
      />

      <p className="border-t border-[var(--color-rule-soft)] pt-3 text-[10px] leading-snug text-[var(--color-muted)]">
        Preview only on the published site. Built-in themes are remembered in this
        browser.
      </p>
    </div>
  );
}
