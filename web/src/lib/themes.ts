export const THEME_IDS = [
  "editorial",
  "midnight-lab",
  "garden",
  "atelier",
  "aurora",
  "coral-dawn",
  "slate-mono",
  "ocean-clinic",
  "arctic-frost",
  "navy-scholar",
  "cobalt-field",
  "periwinkle-mist",
  "deep-azure",
  "blueprint",
  "sunset-oxide",
  "forest-night",
] as const;

export type SiteThemeId = (typeof THEME_IDS)[number];

export function isSiteThemeId(id: string): id is SiteThemeId {
  return (THEME_IDS as readonly string[]).includes(id);
}

export type ThemeSwatch = { name: string; token: string };

export type SiteTheme = {
  id: SiteThemeId;
  label: string;
  description: string;
  swatches: ThemeSwatch[];
};

export const SITE_THEMES: SiteTheme[] = [
  {
    id: "editorial",
    label: "Editorial",
    description: "Warm cream, terracotta & navy — current default",
    swatches: [
      { name: "Paper", token: "--color-paper" },
      { name: "Terracotta", token: "--color-warm" },
      { name: "Navy", token: "--color-accent" },
      { name: "Ink", token: "--color-ink" },
    ],
  },
  {
    id: "midnight-lab",
    label: "Midnight Lab",
    description: "Deep slate base with cyan, coral & violet accents",
    swatches: [
      { name: "Slate", token: "--color-paper" },
      { name: "Cyan", token: "--color-warm" },
      { name: "Coral", token: "--color-highlight" },
      { name: "Violet", token: "--color-tertiary" },
    ],
  },
  {
    id: "garden",
    label: "Garden",
    description: "Sage paper, forest green, amber, plum & teal",
    swatches: [
      { name: "Mist", token: "--color-paper" },
      { name: "Forest", token: "--color-warm" },
      { name: "Amber", token: "--color-highlight" },
      { name: "Plum", token: "--color-tertiary" },
    ],
  },
  {
    id: "atelier",
    label: "Atelier",
    description: "Cool stone, burgundy, cobalt, gold & sea glass",
    swatches: [
      { name: "Stone", token: "--color-paper" },
      { name: "Burgundy", token: "--color-warm" },
      { name: "Cobalt", token: "--color-highlight" },
      { name: "Gold", token: "--color-tertiary" },
    ],
  },
  {
    id: "aurora",
    label: "Aurora",
    description: "Lilac white with violet, rose, teal & honey",
    swatches: [
      { name: "Lilac", token: "--color-paper" },
      { name: "Violet", token: "--color-warm" },
      { name: "Rose", token: "--color-highlight" },
      { name: "Teal", token: "--color-tertiary" },
    ],
  },
  {
    id: "coral-dawn",
    label: "Coral Dawn",
    description: "Peach blush, coral, rose & eucalyptus",
    swatches: [
      { name: "Blush", token: "--color-paper" },
      { name: "Coral", token: "--color-warm" },
      { name: "Rose", token: "--color-highlight" },
      { name: "Sage", token: "--color-tertiary" },
    ],
  },
  {
    id: "slate-mono",
    label: "Slate Mono",
    description: "Neutral stone with crimson, cobalt & charcoal",
    swatches: [
      { name: "Stone", token: "--color-paper" },
      { name: "Crimson", token: "--color-warm" },
      { name: "Cobalt", token: "--color-highlight" },
      { name: "Charcoal", token: "--color-ink" },
    ],
  },
  {
    id: "ocean-clinic",
    label: "Ocean Clinic",
    description: "Clinical ice blue, teal, sky & soft coral",
    swatches: [
      { name: "Ice", token: "--color-paper" },
      { name: "Teal", token: "--color-warm" },
      { name: "Sky", token: "--color-highlight" },
      { name: "Coral", token: "--color-tertiary" },
    ],
  },
  {
    id: "arctic-frost",
    label: "Arctic Frost",
    description: "Pale ice paper, steel blue, silver & glacier cyan",
    swatches: [
      { name: "Frost", token: "--color-paper" },
      { name: "Steel", token: "--color-warm" },
      { name: "Glacier", token: "--color-highlight" },
      { name: "Silver", token: "--color-tertiary" },
    ],
  },
  {
    id: "navy-scholar",
    label: "Navy Scholar",
    description: "Academic cream, deep navy, brass & manuscript blue",
    swatches: [
      { name: "Cream", token: "--color-paper" },
      { name: "Navy", token: "--color-accent" },
      { name: "Brass", token: "--color-tertiary" },
      { name: "Ink", token: "--color-ink" },
    ],
  },
  {
    id: "cobalt-field",
    label: "Cobalt Field",
    description: "Cool white, electric cobalt, sky & soft lilac",
    swatches: [
      { name: "White", token: "--color-paper" },
      { name: "Cobalt", token: "--color-warm" },
      { name: "Sky", token: "--color-highlight" },
      { name: "Lilac", token: "--color-tertiary" },
    ],
  },
  {
    id: "periwinkle-mist",
    label: "Periwinkle Mist",
    description: "Lavender-blue haze, indigo, cornflower & blush",
    swatches: [
      { name: "Mist", token: "--color-paper" },
      { name: "Indigo", token: "--color-warm" },
      { name: "Cornflower", token: "--color-highlight" },
      { name: "Blush", token: "--color-tertiary" },
    ],
  },
  {
    id: "deep-azure",
    label: "Deep Azure",
    description: "Midnight blue base, azure, ice & soft gold",
    swatches: [
      { name: "Midnight", token: "--color-paper" },
      { name: "Azure", token: "--color-warm" },
      { name: "Ice", token: "--color-highlight" },
      { name: "Gold", token: "--color-tertiary" },
    ],
  },
  {
    id: "blueprint",
    label: "Blueprint",
    description: "Technical draft blue, cyan lines, white & amber pin",
    swatches: [
      { name: "Draft", token: "--color-paper" },
      { name: "Cyan", token: "--color-warm" },
      { name: "Line", token: "--color-highlight" },
      { name: "Pin", token: "--color-tertiary" },
    ],
  },
  {
    id: "sunset-oxide",
    label: "Sunset Oxide",
    description: "Sand, rust, dusty plum & burnt gold",
    swatches: [
      { name: "Sand", token: "--color-paper" },
      { name: "Rust", token: "--color-warm" },
      { name: "Plum", token: "--color-highlight" },
      { name: "Gold", token: "--color-tertiary" },
    ],
  },
  {
    id: "forest-night",
    label: "Forest Night",
    description: "Deep pine with moss, amber & mist",
    swatches: [
      { name: "Pine", token: "--color-paper" },
      { name: "Moss", token: "--color-warm" },
      { name: "Amber", token: "--color-highlight" },
      { name: "Mist", token: "--color-tertiary" },
    ],
  },
];

export const DEFAULT_THEME: SiteThemeId = "editorial";
export const THEME_STORAGE_KEY = "qiong-site-theme";
