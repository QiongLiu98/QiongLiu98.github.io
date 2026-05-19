import type { StatIconId } from "@/content/site";

type StatIconProps = {
  id: StatIconId;
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function StatIcon({ id, className = "h-7 w-7 md:h-8 md:w-8" }: StatIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      focusable="false"
    >
      {id === "papers" && (
        <>
          <path
            {...stroke}
            d="M8 4h9a2 2 0 0 1 2 2v14H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
          />
          <path {...stroke} d="M8 4v16H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
          <path {...stroke} d="M11 9h6M11 13h6M11 17h4" />
        </>
      )}
      {id === "awards" && (
        <>
          <circle {...stroke} cx="12" cy="9" r="4" />
          <path
            {...stroke}
            d="M8.5 12.5 7 20l5-2.5L17 20l-1.5-7.5"
          />
          <path {...stroke} d="M12 13v3" />
        </>
      )}
      {id === "patents" && (
        <>
          <path
            {...stroke}
            d="M9 3h6l1 3h3a1 1 0 0 1 1 1v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h3l1-3z"
          />
          <path {...stroke} d="M12 11v5M9.5 13.5h5" />
          <circle {...stroke} cx="12" cy="8" r="1.25" fill="currentColor" stroke="none" />
        </>
      )}
      {id === "institution" && (
        <>
          <path {...stroke} d="M4 20h16" />
          <path {...stroke} d="M6 20V9l6-4 6 4v11" />
          <path {...stroke} d="M10 20v-5h4v5" />
          <path {...stroke} d="M9 12h6" />
        </>
      )}
    </svg>
  );
}
