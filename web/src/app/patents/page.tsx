import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { contentShell, pageMainY } from "@/lib/layout";
import { createPageMetadata } from "@/lib/seo";
import { getResearchProjectBySlug, patents } from "@/content/site";

export const metadata = createPageMetadata({
  title: "Patents",
  description:
    "Patent-pending inventions by Qiong Liu, Ph.D. — cardiac PET motion correction, dual gating, and edge-guided deformation fusion.",
  path: "/patents",
});

export default function PatentsPage() {
  return (
    <>
      <PageHero
        number="04"
        label="Patents"
        title={
          <>
            Inventions in
            <br />
            <span className="font-display-italic">motion &amp; gating.</span>
          </>
        }
        description="Lead-inventor patent applications from Canon Medical Research USA — cardiac PET motion correction and data-driven physiological gating."
      />

      <div className={`${contentShell} ${pageMainY}`}>
        <ol className="space-y-10">
          {patents.map((pat, i) => {
            const related = pat.relatedResearchSlug
              ? getResearchProjectBySlug(pat.relatedResearchSlug)
              : undefined;

            return (
              <li
                id={pat.slug}
                key={pat.slug}
                className="scroll-mt-24 content-panel rounded-sm p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="num text-xs text-[var(--color-warm)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label">{pat.status}</span>
                  <span className="text-[var(--color-rule)]">·</span>
                  <time className="num text-sm text-[var(--color-muted)]">
                    {pat.year}
                  </time>
                </div>

                <h2 className="font-display mt-4 text-2xl leading-snug text-[var(--color-ink)] md:text-3xl">
                  {pat.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  {pat.role}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-soft)]">
                  {pat.description}
                </p>

                {related && (
                  <Link
                    href={`/research/${related.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
                  >
                    Related research: {related.title} →
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-12 text-sm text-[var(--color-muted)]">
          Full employment and education history on the{" "}
          <Link
            href="/cv"
            className="text-[var(--color-ink)] underline underline-offset-2 hover:text-[var(--color-warm)]"
          >
            curriculum vitae
          </Link>
          .
        </p>
      </div>
    </>
  );
}
