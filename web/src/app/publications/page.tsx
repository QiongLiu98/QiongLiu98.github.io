import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { PublicationEntry } from "@/components/shared/PublicationEntry";
import { contentShell, pageMainY } from "@/lib/layout";
import {
  allPublications,
  conferencePresentations,
  site,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Peer-reviewed publications and conference presentations by Qiong Liu, Ph.D.",
};

function groupByYear<T extends { year: number }>(items: T[]): Map<number, T[]> {
  const map = new Map<number, T[]>();
  for (const item of [...items].sort((a, b) => b.year - a.year)) {
    const list = map.get(item.year) ?? [];
    list.push(item);
    map.set(item.year, list);
  }
  return map;
}

export default function PublicationsPage() {
  const firstAuthor = allPublications.filter((p) => p.role === "first");
  const coAuthor = allPublications.filter((p) => p.role === "co");
  const talksByYear = groupByYear(conferencePresentations);

  return (
    <>
      <PageHero
        number="03"
        label="Publications"
        title={
          <>
            In print &amp;
            <br />
            <span className="font-display-italic">on stage.</span>
          </>
        }
        description="Peer-reviewed journal articles and selected conference presentations in cardiac PET imaging, deep learning, and quantitative analysis."
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={site.links.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] px-5 py-2.5 text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-warm)]"
          >
            Google Scholar ↗
          </a>
          {site.links.yaleNews && (
            <a
              href={site.links.yaleNews}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] px-5 py-2.5 text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-warm)]"
            >
              Yale SNMMI 2025 coverage ↗
            </a>
          )}
        </div>
      </PageHero>

      <div className={`${contentShell} ${pageMainY}`}>
        <section>
          <h2 className="font-display text-4xl text-[var(--color-ink)] md:text-5xl">
            First-author journal articles
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            {firstAuthor.length} articles
          </p>
          <div className="mt-10 space-y-8">
            {firstAuthor.map((pub, i) => (
              <PublicationEntry key={pub.id ?? pub.citation} pub={pub} index={i} />
            ))}
          </div>
        </section>

        <section className="mt-24 border-t border-[var(--color-rule)] pt-20">
          <h2 className="font-display text-4xl text-[var(--color-ink)] md:text-5xl">
            Co-author journal articles
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            {coAuthor.length} articles
          </p>
          <div className="mt-10 space-y-8">
            {coAuthor.map((pub, i) => (
              <PublicationEntry key={pub.citation} pub={pub} index={i} />
            ))}
          </div>
        </section>

        <section className="mt-24 border-t border-[var(--color-rule)] pt-20">
          <h2 className="font-display text-4xl text-[var(--color-ink)] md:text-5xl">
            Conference presentations
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            {conferencePresentations.length} presentations
          </p>
          <div className="mt-12 space-y-16">
            {Array.from(talksByYear.entries()).map(([year, talks]) => (
              <div key={year}>
                <h3 className="font-display text-5xl text-[var(--color-warm)]">
                  {year}
                </h3>
                <div className="mt-6 space-y-6">
                  {talks.map((talk) => (
                    <PublicationEntry
                      key={talk.citation}
                      pub={talk}
                      showRole={false}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-20 font-serif italic text-[var(--color-muted)]">
          For the complete list, see{" "}
          <Link
            href={site.links.scholar}
            className="text-[var(--color-warm)] underline"
          >
            Google Scholar
          </Link>
          .
        </p>
      </div>
    </>
  );
}
