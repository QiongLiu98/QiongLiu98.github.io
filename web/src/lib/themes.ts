export type ThemeSwatch = { name: string; token?: string; hex?: string };

export type SiteTheme = {
  id: string;
  label: string;
  description: string;
  swatches: ThemeSwatch[];
};

export type ThemeGroup = {
  id: string;
  label: string;
  description?: string;
  /** Open by default when the theme picker first loads */
  defaultOpen?: boolean;
  themes: SiteTheme[];
};

export const THEME_GROUPS: ThemeGroup[] = [
  {
    id: "editorial-warm",
    label: "Editorial & warm",
    description: "Cream, terracotta, and refined accents",
    defaultOpen: true,
    themes: [
      {
        id: "editorial",
        label: "Editorial",
        description: "Warm cream, terracotta & navy — site default",
        swatches: [
          { name: "Paper", token: "--color-paper" },
          { name: "Terracotta", token: "--color-warm" },
          { name: "Navy", token: "--color-accent" },
          { name: "Ink", token: "--color-ink" },
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
        id: "honeycomb",
        label: "Honeycomb",
        description: "Golden cream, amber, wheat & soft brown",
        swatches: [
          { name: "Cream", token: "--color-paper" },
          { name: "Amber", token: "--color-warm" },
          { name: "Wheat", token: "--color-highlight" },
          { name: "Brown", token: "--color-tertiary" },
        ],
      },
      {
        id: "ceramic",
        label: "Ceramic",
        description: "Clay neutrals, terracotta, ochre & sage",
        swatches: [
          { name: "Clay", token: "--color-paper" },
          { name: "Terracotta", token: "--color-warm" },
          { name: "Ochre", token: "--color-highlight" },
          { name: "Sage", token: "--color-tertiary" },
        ],
      },
      {
        id: "rose-quartz",
        label: "Rose Quartz",
        description: "Blush paper, mauve, dusty rose & slate",
        swatches: [
          { name: "Blush", token: "--color-paper" },
          { name: "Mauve", token: "--color-warm" },
          { name: "Rose", token: "--color-highlight" },
          { name: "Slate", token: "--color-tertiary" },
        ],
      },
      {
        id: "saffron-ink",
        label: "Saffron Ink",
        description: "Bright saffron, charcoal, teal & cream",
        swatches: [
          { name: "Cream", token: "--color-paper" },
          { name: "Saffron", token: "--color-warm" },
          { name: "Teal", token: "--color-highlight" },
          { name: "Charcoal", token: "--color-ink" },
        ],
      },
    ],
  },
  {
    id: "blues-clinical",
    label: "Blues & clinical",
    description: "Ice, navy, cobalt, and imaging-friendly tones",
    themes: [
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
        description: "Pale ice, steel blue, glacier cyan & silver",
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
        description: "Cool white, electric cobalt, sky & lilac",
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
        description: "Drafting blue, cyan lines, white & amber pin",
        swatches: [
          { name: "Draft", token: "--color-paper" },
          { name: "Cyan", token: "--color-warm" },
          { name: "Line", token: "--color-highlight" },
          { name: "Pin", token: "--color-tertiary" },
        ],
      },
      {
        id: "yale-stone",
        label: "Yale Stone",
        description: "Yale blue, warm gray stone, gold & ivory",
        swatches: [
          { name: "Ivory", token: "--color-paper" },
          { name: "Yale Blue", token: "--color-accent" },
          { name: "Gold", token: "--color-tertiary" },
          { name: "Stone", token: "--color-muted" },
        ],
      },
      {
        id: "pet-scan",
        label: "PET Scan",
        description: "Clinical white, tracer green, cyan & cool gray",
        swatches: [
          { name: "White", token: "--color-paper" },
          { name: "Tracer", token: "--color-warm" },
          { name: "Cyan", token: "--color-highlight" },
          { name: "Gray", token: "--color-tertiary" },
        ],
      },
      {
        id: "polar-sky",
        label: "Polar Sky",
        description: "Near-white polar light, cool gray & sky",
        swatches: [
          { name: "Snow", token: "--color-paper" },
          { name: "Sky", token: "--color-warm" },
          { name: "Ice", token: "--color-highlight" },
          { name: "Gray", token: "--color-tertiary" },
        ],
      },
    ],
  },
  {
    id: "nature-earth",
    label: "Nature & earth",
    description: "Greens, pine, and organic tones",
    themes: [
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
      {
        id: "moss-stone",
        label: "Moss Stone",
        description: "Gray-green stone, lichen, bark & fog",
        swatches: [
          { name: "Stone", token: "--color-paper" },
          { name: "Lichen", token: "--color-warm" },
          { name: "Bark", token: "--color-highlight" },
          { name: "Fog", token: "--color-tertiary" },
        ],
      },
    ],
  },
  {
    id: "dark-mono",
    label: "Dark & mono",
    description: "High contrast and nighttime palettes",
    themes: [
      {
        id: "midnight-lab",
        label: "Midnight Lab",
        description: "Deep slate with cyan, coral & violet",
        swatches: [
          { name: "Slate", token: "--color-paper" },
          { name: "Cyan", token: "--color-warm" },
          { name: "Coral", token: "--color-highlight" },
          { name: "Violet", token: "--color-tertiary" },
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
        id: "inkwell",
        label: "Inkwell",
        description: "Stark black & white with crimson accent",
        swatches: [
          { name: "White", token: "--color-paper" },
          { name: "Black", token: "--color-ink" },
          { name: "Crimson", token: "--color-warm" },
          { name: "Gray", token: "--color-muted" },
        ],
      },
      {
        id: "velvet-dusk",
        label: "Velvet Dusk",
        description: "Wine plum, mauve, gold & midnight",
        swatches: [
          { name: "Plum", token: "--color-paper" },
          { name: "Wine", token: "--color-warm" },
          { name: "Gold", token: "--color-highlight" },
          { name: "Mauve", token: "--color-tertiary" },
        ],
      },
      {
        id: "neon-terminal",
        label: "Neon Terminal",
        description: "Terminal black, phosphor green & magenta",
        swatches: [
          { name: "Black", token: "--color-paper" },
          { name: "Green", token: "--color-warm" },
          { name: "Magenta", token: "--color-highlight" },
          { name: "Cyan", token: "--color-tertiary" },
        ],
      },
    ],
  },
];

export const SITE_THEMES: SiteTheme[] = THEME_GROUPS.flatMap((g) => g.themes);

export type SiteThemeId = (typeof SITE_THEMES)[number]["id"];

export const THEME_IDS: SiteThemeId[] = SITE_THEMES.map((t) => t.id);

export function isSiteThemeId(id: string): id is SiteThemeId {
  return SITE_THEMES.some((t) => t.id === id);
}

export function getThemeGroupForTheme(themeId: SiteThemeId): ThemeGroup | undefined {
  return THEME_GROUPS.find((g) => g.themes.some((t) => t.id === themeId));
}

export const DEFAULT_THEME: SiteThemeId = "editorial";
export const THEME_STORAGE_KEY = "qiong-site-theme";
