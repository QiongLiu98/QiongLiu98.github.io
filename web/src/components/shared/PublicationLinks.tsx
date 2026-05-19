import type { Publication } from "@/content/site";
import {
  getPublicationDoiUrl,
  hasPublicationDoi,
} from "@/lib/publications";
import { getPublicationScholarUrl } from "@/lib/scholar";

const linkClass =
  "text-[var(--color-accent)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]";

export function PublicationLinks({
  pub,
  className = "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm",
}: {
  pub: Publication;
  className?: string;
}) {
  const doiUrl = getPublicationDoiUrl(pub);
  const showScholar = !hasPublicationDoi(pub);

  return (
    <div className={className}>
      {doiUrl && (
        <a
          href={doiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          DOI ↗
        </a>
      )}
      {pub.pdf && (
        <a
          href={pub.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          PDF
        </a>
      )}
      {showScholar && (
        <a
          href={getPublicationScholarUrl(pub)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Google Scholar ↗
        </a>
      )}
    </div>
  );
}
