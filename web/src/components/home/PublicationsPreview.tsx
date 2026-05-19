import Link from "next/link";
import { PublicationLinks } from "@/components/shared/PublicationLinks";
import { contentShell, displaySectionTitle, sectionY } from "@/lib/layout";
import { getPublicationAuthors } from "@/lib/publications";
import { getPublicationPrimaryUrl } from "@/lib/publications";
import { allPublications } from "@/content/site";

export function PublicationsPreview() {
  const featured = allPublications
    .filter((p) => p.role === "first")
    .slice(0, 4);

  return (
    <section
      className={`section-gradient border-t border-[var(--color-rule)] ${sectionY}`}
    >
      <div className={contentShell}>
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_1.75fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="num text-xs text-[var(--color-warm)]">03</span>
              <span className="label">Publications</span>
            </div>
            <h2 className={displaySectionTitle}>
              Recent,
              <br />
              <span className="font-display-italic">first-author.</span>
            </h2>
            <p className="mt-4 max-w-sm font-serif text-base italic text-[var(--color-muted)] md:mt-6 md:text-lg">
              A selection from journals including the Journal of Nuclear
              Medicine, Medical Image Analysis, and IEEE TRPMS.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm md:mt-8">
              <Link
                href="/publications"
                className="inline-block text-[var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
              >
                All publications →
              </Link>
              <a
                href="https://scholar.google.com/citations?user=SvnpHCkAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
              >
                Google Scholar ↗
              </a>
            </div>
          </div>

          <div className="intro-panel rounded-sm p-5 md:p-8 lg:p-10">
            <ol className="space-y-6 md:space-y-10">
              {featured.map((pub, i) => (
                <li
                  key={pub.id ?? pub.citation}
                  className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-[var(--color-rule)] pb-6 last:border-b-0 md:gap-x-6 md:pb-10"
                >
                  <div className="flex flex-col items-end gap-0.5 md:gap-1">
                    <span className="num text-xs text-[var(--color-muted-soft)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl text-[var(--color-ink)] md:text-3xl">
                      {pub.year}
                    </span>
                  </div>
                  <div>
                    <p className="font-serif text-base leading-snug text-[var(--color-ink)] md:text-2xl">
                      <a
                        href={getPublicationPrimaryUrl(pub)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-1 underline-offset-4 transition-colors hover:text-[var(--color-warm)]"
                      >
                        <span className="font-display-italic">
                          {pub.citation}
                        </span>
                      </a>
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-muted)] md:mt-3">
                      {getPublicationAuthors(pub) && (
                        <span className="font-medium text-[var(--color-ink-soft)]">
                          {getPublicationAuthors(pub)} ·{" "}
                        </span>
                      )}
                      {pub.venue}
                    </p>
                    {pub.highlight && (
                      <p className="label-warm mt-2 md:mt-3">{pub.highlight}</p>
                    )}
                    <PublicationLinks pub={pub} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
