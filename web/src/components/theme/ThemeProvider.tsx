"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_THEME,
  THEME_IDS,
  THEME_STORAGE_KEY,
  isSiteThemeId,
  type SiteThemeId,
} from "@/lib/themes";
import type { CustomTheme, ThemeBaseColors } from "@/lib/theme-colors";
import {
  THEME_CUSTOM_COLORS_KEY,
  THEME_CUSTOM_VARS_KEY,
  applyThemeVariables,
  clearInlineThemeVariables,
  expandThemeColors,
  isCustomThemeId,
} from "@/lib/theme-colors";

type ThemeContextValue = {
  theme: string;
  setTheme: (id: string) => void;
  customThemes: CustomTheme[];
  refreshCustomThemes: () => Promise<void>;
  draftColors: ThemeBaseColors | null;
  setDraftColors: (colors: ThemeBaseColors | null) => void;
  previewCustomColors: (colors: ThemeBaseColors) => void;
  isEditingCustom: boolean;
  setIsEditingCustom: (v: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isValidThemeId(id: string, customThemes: CustomTheme[]) {
  return isSiteThemeId(id) || customThemes.some((t) => t.id === id);
}

function applyBuiltInTheme(id: string) {
  document.documentElement.dataset.theme = id;
  clearInlineThemeVariables();
  try {
    localStorage.removeItem(THEME_CUSTOM_COLORS_KEY);
    localStorage.removeItem(THEME_CUSTOM_VARS_KEY);
  } catch {
    /* ignore */
  }
}

function applyCustomTheme(id: string, colors: ThemeBaseColors) {
  const vars = expandThemeColors(colors);
  document.documentElement.dataset.theme = id;
  applyThemeVariables(vars);
  try {
    localStorage.setItem(
      THEME_CUSTOM_COLORS_KEY,
      JSON.stringify({ id, colors }),
    );
    localStorage.setItem(THEME_CUSTOM_VARS_KEY, JSON.stringify(vars));
  } catch {
    /* ignore */
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<string>(DEFAULT_THEME);
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([]);
  const [draftColors, setDraftColors] = useState<ThemeBaseColors | null>(null);
  const [isEditingCustom, setIsEditingCustom] = useState(false);
  const [mounted, setMounted] = useState(false);

  const refreshCustomThemes = useCallback(async () => {
    try {
      const res = await fetch("/api/custom-themes");
      if (!res.ok) return;
      const data = (await res.json()) as { themes: CustomTheme[] };
      setCustomThemes(data.themes ?? []);
    } catch {
      /* offline / static build */
    }
  }, []);

  const applyTheme = useCallback(
    (id: string, colorsOverride?: ThemeBaseColors) => {
      const custom = customThemes.find((t) => t.id === id);
      const colors = colorsOverride ?? custom?.colors;

      if (isCustomThemeId(id) && colors) {
        applyCustomTheme(id, colors);
      } else {
        applyBuiltInTheme(id);
      }

      try {
        localStorage.setItem(THEME_STORAGE_KEY, id);
      } catch {
        /* private browsing */
      }
      setThemeState(id);
    },
    [customThemes],
  );

  const previewCustomColors = useCallback(
    (colors: ThemeBaseColors) => {
      const previewId = "custom-preview";
      document.documentElement.dataset.theme = previewId;
      applyThemeVariables(expandThemeColors(colors));
    },
    [],
  );

  useEffect(() => {
    void refreshCustomThemes();
  }, [refreshCustomThemes]);

  useEffect(() => {
    if (!mounted || customThemes.length === 0) return;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (
      stored &&
      isCustomThemeId(stored) &&
      isValidThemeId(stored, customThemes)
    ) {
      applyTheme(stored);
    }
  }, [customThemes, mounted, applyTheme]);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    let initial = DEFAULT_THEME;

    if (stored && isSiteThemeId(stored)) {
      initial = stored;
      applyBuiltInTheme(initial);
    } else if (stored && isCustomThemeId(stored)) {
      try {
        const cached = localStorage.getItem(THEME_CUSTOM_COLORS_KEY);
        if (cached) {
          const { id, colors } = JSON.parse(cached) as {
            id: string;
            colors: ThemeBaseColors;
          };
          if (id === stored && colors) {
            applyCustomTheme(id, colors);
            setThemeState(id);
            setMounted(true);
            return;
          }
        }
      } catch {
        /* fall through */
      }
    } else {
      applyBuiltInTheme(initial);
    }

    setThemeState(initial);
    setMounted(true);
  }, []);

  const setTheme = useCallback(
    (id: string) => {
      setIsEditingCustom(false);
      setDraftColors(null);
      applyTheme(id);
    },
    [applyTheme],
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      customThemes,
      refreshCustomThemes,
      draftColors,
      setDraftColors,
      previewCustomColors,
      isEditingCustom,
      setIsEditingCustom,
    }),
    [
      theme,
      setTheme,
      customThemes,
      refreshCustomThemes,
      draftColors,
      previewCustomColors,
      isEditingCustom,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {!mounted ? (
        <span className="sr-only" aria-live="polite">
          Loading theme…
        </span>
      ) : null}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** All valid theme ids including customs (after load). */
export function getAllThemeIds(customThemes: CustomTheme[]): string[] {
  return [...THEME_IDS, ...customThemes.map((t) => t.id)];
}
