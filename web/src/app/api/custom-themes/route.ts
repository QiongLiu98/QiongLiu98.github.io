import { NextResponse } from "next/server";
import {
  addCustomTheme,
  readCustomThemes,
} from "@/lib/custom-themes-storage";
import type { ThemeBaseColors } from "@/lib/theme-colors";
import { THEME_COLOR_FIELDS } from "@/lib/theme-colors";

export const dynamic = "force-dynamic";

export async function GET() {
  const themes = await readCustomThemes();
  return NextResponse.json({ themes });
}

function isValidColors(value: unknown): value is ThemeBaseColors {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return THEME_COLOR_FIELDS.every(
    (f) => typeof o[f.key] === "string" && /^#[0-9a-fA-F]{6}$/.test(o[f.key] as string),
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      label?: string;
      colors?: ThemeBaseColors;
    };

    if (!body.label?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!isValidColors(body.colors)) {
      return NextResponse.json({ error: "Invalid colors" }, { status: 400 });
    }

    const theme = await addCustomTheme(body.label, body.colors);
    return NextResponse.json({ theme });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
