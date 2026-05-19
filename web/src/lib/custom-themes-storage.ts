import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { CustomTheme, ThemeBaseColors } from "@/lib/theme-colors";
import {
  customThemeId,
  slugifyThemeName,
} from "@/lib/theme-colors";

const FILE = path.join(process.cwd(), "src/content/custom-themes.json");

export async function readCustomThemes(): Promise<CustomTheme[]> {
  try {
    const raw = await readFile(FILE, "utf8");
    const data = JSON.parse(raw) as CustomTheme[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function writeCustomThemes(themes: CustomTheme[]): Promise<void> {
  await writeFile(FILE, `${JSON.stringify(themes, null, 2)}\n`, "utf8");
}

export async function addCustomTheme(
  label: string,
  colors: ThemeBaseColors,
): Promise<CustomTheme> {
  const themes = await readCustomThemes();
  const slug = slugifyThemeName(label);
  if (!slug) throw new Error("Theme name must contain letters or numbers");

  const id = customThemeId(slug);
  if (themes.some((t) => t.id === id)) {
    throw new Error("A theme with this name already exists");
  }

  const theme: CustomTheme = {
    id,
    label: label.trim(),
    description: "Custom palette",
    colors,
    createdAt: new Date().toISOString(),
  };

  themes.push(theme);
  await writeCustomThemes(themes);
  return theme;
}
