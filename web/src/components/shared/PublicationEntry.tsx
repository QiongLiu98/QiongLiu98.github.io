import type { Publication } from "@/content/site";
import {
  getPublicationAuthors,
  getPublicationPrimaryUrl,
} from "@/lib/publications";
import { PublicationLinks } from "@/components/shared/PublicationLinks";

export function PublicationEntry({
  pub,
  index,
  showRole = true,
}: {
  pub: Publication;
  index?: number;
  showRole?: boolean;
}) {
  const authorLine = getPublicationAuthors(pub);
  const primaryUrl = getPublicationPrimaryUrl(pub);

  return (
    <article className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-[var(--color-rule)] pb-6 last:border-b-0 md:gap-x-6 md:pb-8">
      {index !== undefined && (
        <div className="flex flex-col items-end gap-1 pt-1">
          <span className="num text-xs text-[var(--color-muted-soft)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-2xl text-[var(--color-ink)]">
            {pub.year}
          </span>
        </div>
      )}
      <div className={index === undefined ? "col-span-2" : ""}>
        <p className="font-serif text-base leading-snug text-[var(--color-ink)] md:text-xl">
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 transition-colors hover:text-[var(--color-warm)]"
          >
            <em>{pub.citation}</em>
          </a>
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {showRole && authorLine && (
            <span className="font-medium text-[var(--color-ink-soft)]">
              {authorLine}{" "}
            </span>
          )}
          {pub.venue}
          {index === undefined && (
            <span className="num ml-2 text-[var(--color-muted-soft)]">
              · {pub.year}
            </span>
          )}
        </p>
        {pub.highlight && (
          <p className="label-warm mt-2">{pub.highlight}</p>
        )}
        <PublicationLinks pub={pub} />
      </div>
    </article>
  );
}
