import Link from "next/link";
import type { RichText } from "@/content/site";

const linkClassName =
  "underline decoration-[var(--color-warm)] decoration-1 underline-offset-4 transition-colors hover:text-[var(--color-warm)]";

type Props = {
  segments: RichText;
  className?: string;
};

export function RichText({ segments, className }: Props) {
  return (
    <span className={className}>
      {segments.map((segment, i) =>
        typeof segment === "string" ? (
          <span key={i}>{segment}</span>
        ) : (
          <Link key={i} href={segment.href} className={linkClassName}>
            {segment.text}
          </Link>
        ),
      )}
    </span>
  );
}
