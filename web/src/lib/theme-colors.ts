import { hexToRgb, mixHex, rgbaFromHex } from "@/lib/color-math";

/** User-editable base colors (hex). */
export type ThemeBaseColors = {
  paper: string;
  paperWarm: string;
  surface: string;
  ink: string;
  inkSoft: string;
  muted: string;
  rule: string;
  accent: string;
  warm: string;
  highlight: string;
  tertiary: string;
  bandBg: string;
  bandFg: string;
  panel: string;
  panelBorder: string;
};

export type ThemeColorFieldKey = keyof ThemeBaseColors;

export const THEME_COLOR_FIELDS: {
  key: ThemeColorFieldKey;
  label: string;
  hint?: string;
}[] = [
  { key: "paper", label: "Page background" },
  { key: "paperWarm", label: "Section wash" },
  { key: "surface", label: "Cards & panels" },
  { key: "ink", label: "Primary text" },
  { key: "inkSoft", label: "Body text" },
  { key: "muted", label: "Muted text" },
  { key: "rule", label: "Borders & rules" },
  { key: "accent", label: "Accent / links" },
  { key: "warm", label: "Highlight (nav, labels)" },
  { key: "highlight", label: "Secondary accent" },
  { key: "tertiary", label: "Tertiary accent" },
  { key: "bandBg", label: "Dark band background" },
  { key: "bandFg", label: "Dark band text" },
  { key: "panel", label: "Content panel fill" },
  { key: "panelBorder", label: "Content panel border" },
];

export const DEFAULT_BASE_COLORS: ThemeBaseColors = {
  paper: "#f7f1e3",
  paperWarm: "#fbf6e8",
  surface: "#ffffff",
  ink: "#1a1614",
  inkSoft: "#3a322c",
  muted: "#6b5f52",
  rule: "#e8debf",
  accent: "#1f3a52",
  warm: "#a8462c",
  highlight: "#2a5f8f",
  tertiary: "#6b7c3e",
  bandBg: "#1a1614",
  bandFg: "#f7f1e3",
  panel: "#ffffff",
  panelBorder: "#e8debf",
};

export type CustomTheme = {
  id: string;
  label: string;
  description?: string;
  colors: ThemeBaseColors;
  createdAt: string;
};

export function slugifyThemeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function customThemeId(slug: string): string {
  return `custom-${slug}`;
}

export function isCustomThemeId(id: string): boolean {
  return id.startsWith("custom-");
}

function relativeLuminance(hex: string): number {
  const parse = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * parse(r) + 0.7152 * parse(g) + 0.0722 * parse(b);
}

/** Expand base picks into full CSS variable map. */
export function expandThemeColors(base: ThemeBaseColors): Record<string, string> {
  const isDark = relativeLuminance(base.paper) < 0.35;
  const softTarget = "#ffffff" as const;
  const muteTarget = isDark ? "#000000" : "#ffffff";

  return {
    "--color-paper": base.paper,
    "--color-paper-warm": base.paperWarm,
    "--color-surface": base.surface,
    "--color-ink": base.ink,
    "--color-ink-soft": base.inkSoft,
    "--color-muted": base.muted,
    "--color-muted-soft": mixHex(base.muted, muteTarget, 0.35),
    "--color-rule": base.rule,
    "--color-rule-soft": mixHex(base.rule, softTarget, 0.45),
    "--color-accent": base.accent,
    "--color-accent-soft": mixHex(base.accent, softTarget, 0.88),
    "--color-warm": base.warm,
    "--color-warm-soft": mixHex(base.warm, softTarget, 0.88),
    "--color-highlight": base.highlight,
    "--color-highlight-soft": mixHex(base.highlight, softTarget, 0.88),
    "--color-tertiary": base.tertiary,
    "--color-tertiary-soft": mixHex(base.tertiary, softTarget, 0.88),
    "--color-band-bg": base.bandBg,
    "--color-band-fg": base.bandFg,
    "--color-band-muted": rgbaFromHex(base.bandFg, 0.72),
    "--color-panel": base.panel,
    "--color-panel-border": base.panelBorder,
    "--color-glow-a": rgbaFromHex(base.warm, 0.14),
    "--color-glow-b": rgbaFromHex(base.highlight, 0.1),
    "--color-glow-c": rgbaFromHex(base.tertiary, 0.08),
  };
}

const CSS_VAR_KEYS = Object.keys(expandThemeColors(DEFAULT_BASE_COLORS));

export function applyThemeVariables(vars: Record<string, string>) {
  const el = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    el.style.setProperty(key, value);
  }
}

export function clearInlineThemeVariables() {
  const el = document.documentElement;
  for (const key of CSS_VAR_KEYS) {
    el.style.removeProperty(key);
  }
}

export const THEME_CUSTOM_COLORS_KEY = "qiong-custom-theme-colors";
/** Expanded CSS variables for flash-free custom theme paint. */
export const THEME_CUSTOM_VARS_KEY = "qiong-custom-theme-vars";
