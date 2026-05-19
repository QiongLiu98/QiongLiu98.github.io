import {
  DEFAULT_THEME,
  THEME_IDS,
  THEME_STORAGE_KEY,
} from "@/lib/themes";
import {
  THEME_CUSTOM_COLORS_KEY,
  THEME_CUSTOM_VARS_KEY,
} from "@/lib/theme-colors";

/** Inline script to set theme before paint and avoid flash. */
export function ThemeScript() {
  const allowed = JSON.stringify([...THEME_IDS]);
  const script = `(function(){
  try{
    var builtIn=${allowed};
    var t=localStorage.getItem("${THEME_STORAGE_KEY}");
    var d=document.documentElement;
    if(t&&builtIn.indexOf(t)!==-1){
      d.dataset.theme=t;
      return;
    }
    if(t&&t.indexOf("custom-")===0){
      var vars=localStorage.getItem("${THEME_CUSTOM_VARS_KEY}");
      if(vars){
        var map=JSON.parse(vars);
        d.dataset.theme=t;
        for(var k in map){if(Object.prototype.hasOwnProperty.call(map,k))d.style.setProperty(k,map[k]);}
        return;
      }
      var cached=localStorage.getItem("${THEME_CUSTOM_COLORS_KEY}");
      if(cached){
        var p=JSON.parse(cached);
        if(p&&p.id===t){d.dataset.theme=t;}
        return;
      }
    }
    d.dataset.theme="${DEFAULT_THEME}";
  }catch(e){document.documentElement.dataset.theme="${DEFAULT_THEME}";}
})();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
