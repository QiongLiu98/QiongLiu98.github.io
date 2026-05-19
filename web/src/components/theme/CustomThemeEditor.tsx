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
  const { previewCustomColors, draftColors, setDraftColors, setTheme, refreshCustomThemes } = useTheme();
  const [activeField, setActiveField] =
    useState<ThemeColorFieldKey>("paper");
  const [saveName, setSaveName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSave = async () => {
    setError(null);
    setMessage(null);
    if (!saveName.trim()) {
      setError("Enter a name for this style");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/custom-themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: saveName.trim(), colors }),
      });
      const data = (await res.json()) as {
        theme?: { id: string; label: string };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setMessage(`Saved “${data.theme?.label ?? saveName}” to the project`);
      setSaveName("");
      await refreshCustomThemes();
      if (data.theme?.id) setTheme(data.theme.id);
      onSaved?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

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

      <div className="space-y-2 border-t border-[var(--color-rule-soft)] pt-3">
        <label className="block">
          <span className="label mb-1 block">Save style to project</span>
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="e.g. Conference poster"
            className="w-full rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-2 text-sm text-[var(--color-ink)]"
          />
        </label>
        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="w-full rounded-sm bg-[var(--color-ink)] px-3 py-2 text-xs font-medium text-[var(--color-paper)] transition-colors hover:bg-[var(--color-warm)] disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save to custom-themes.json"}
        </button>
        {message && (
          <p className="text-[11px] text-[var(--color-highlight)]">{message}</p>
        )}
        {error && (
          <p className="text-[11px] text-[var(--color-warm)]">{error}</p>
        )}
        <p className="text-[10px] leading-snug text-[var(--color-muted)]">
          Writes to{" "}
          <code className="num text-[10px]">web/src/content/custom-themes.json</code>{" "}
          (dev server). Commit the file to keep it in git.
        </p>
      </div>
    </div>
  );
}
