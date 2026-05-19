import { DEFAULT_THEME, THEME_IDS, THEME_STORAGE_KEY } from "@/lib/themes";

/** Inline script to set theme before paint and avoid flash. */
export function ThemeScript() {
  const allowed = JSON.stringify([...THEME_IDS]);
  const script = `(function(){try{var a=${allowed};var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=document.documentElement;if(t&&a.indexOf(t)!==-1)d.dataset.theme=t;else d.dataset.theme="${DEFAULT_THEME}"}catch(e){document.documentElement.dataset.theme="${DEFAULT_THEME}"}})();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
