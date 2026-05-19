import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contentShell, pageMainY, detailHeroOuter } from "@/lib/layout";
import { createPageMetadata } from "@/lib/seo";
import {
  experience,
  getExperienceBySlug,
  getResearchProjectBySlug,
} from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return experience.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getExperienceBySlug(slug);
  if (!job) return { title: "Experience" };
  return createPageMetadata({
    title: `${job.role} · ${job.org}`,
    description: job.summary,
    path: `/experience/${slug}`,
  });
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getExperienceBySlug(slug);
  if (!job) notFound();

  const currentIndex = experience.findIndex((e) => e.slug === slug);
  const nextJob = experience[currentIndex + 1];
  const prevJob = experience[currentIndex - 1];

  const relatedResearch =
    job.relatedResearchSlugs
      ?.map((s) => getResearchProjectBySlug(s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)) ?? [];

  return (
    <article>
      <header className={detailHeroOuter}>
        <div className={contentShell}>
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
          >
            ← Curriculum vitae
          </Link>

          <div className="mt-8 flex flex-wrap items-baseline gap-3">
            <span className="label">Experience</span>
            <span className="text-[var(--color-rule)]">·</span>
            <time className="num text-sm text-[var(--color-muted)]">
              {job.period}
            </time>
          </div>

          <h1 className="font-display mt-6 max-w-4xl text-4xl leading-[0.95] text-[var(--color-ink)] md:text-6xl lg:text-7xl">
            {job.role}
          </h1>
          <p className="mt-4 font-serif text-2xl text-[var(--color-warm)] md:text-3xl">
            {job.org}
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted)]">{job.location}</p>
          <p className="mt-8 max-w-2xl font-serif text-xl italic leading-snug text-[var(--color-muted)] md:text-2xl">
            {job.summary}
          </p>
        </div>
      </header>

      <div className={`section-gradient ${contentShell} ${pageMainY}`}>
        <div className="mx-auto max-w-3xl">
          <div className="content-panel rounded-sm p-6 md:p-10 lg:p-12">
            <h2 className="label border-b border-[var(--color-rule)] pb-4">
              Responsibilities &amp; impact
            </h2>
            <ul className="mt-8 space-y-4">
              {job.highlights.map((highlight) => (
                <li
                  key={highlight.slice(0, 48)}
                  className="text-base leading-relaxed text-[var(--color-ink-soft)] before:mr-2 before:text-[var(--color-warm)] before:content-['—']"
                >
                  {highlight}
                </li>
              ))}
            </ul>

            {job.teaching && job.teaching.length > 0 && (
              <section className="mt-14 border-t border-[var(--color-rule-soft)] pt-10">
                <h2 className="label">Teaching &amp; mentoring</h2>
                <ul className="mt-6 space-y-8">
                  {job.teaching.map((item) => (
                    <li key={item.title}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-serif text-lg text-[var(--color-ink)]">
                          {item.title}
                        </h3>
                        {item.period && (
                          <time className="num text-sm text-[var(--color-muted)]">
                            {item.period}
                          </time>
                        )}
                      </div>
                      {item.role && (
                        <p className="mt-1 text-sm text-[var(--color-warm)]">
                          {item.role}
                        </p>
                      )}
                      <ul className="mt-3 space-y-2">
                        {item.details.map((detail) => (
                          <li
                            key={detail.slice(0, 48)}
                            className="text-sm leading-relaxed text-[var(--color-ink-soft)] before:mr-2 before:text-[var(--color-warm)] before:content-['—']"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {relatedResearch.length > 0 && (
              <section className="mt-14 border-t border-[var(--color-rule-soft)] pt-10">
                <h2 className="label">Related research</h2>
                <ul className="mt-6 space-y-4">
                  {relatedResearch.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/research/${project.slug}`}
                        className="group block rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper)] p-4 transition-colors hover:border-[var(--color-warm)]"
                      >
                        <span className="num text-xs text-[var(--color-warm)]">
                          {project.number}
                        </span>
                        <p className="mt-2 font-serif text-lg text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                          {project.title}
                        </p>
                        <p className="mt-1 text-sm text-[var(--color-muted)]">
                          {project.subtitle}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        <nav
          className="mt-16 flex flex-col gap-6 border-t border-[var(--color-rule)] pt-10 sm:flex-row sm:justify-between"
          aria-label="Other roles"
        >
          {prevJob ? (
            <Link
              href={`/experience/${prevJob.slug}`}
              className="group max-w-sm text-sm text-[var(--color-muted)] hover:text-[var(--color-warm)]"
            >
              <span className="label">Previous</span>
              <p className="mt-1 font-serif text-lg text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                ← {prevJob.role}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {nextJob ? (
            <Link
              href={`/experience/${nextJob.slug}`}
              className="group max-w-sm text-right text-sm text-[var(--color-muted)] hover:text-[var(--color-warm)] sm:ml-auto"
            >
              <span className="label">Next</span>
              <p className="mt-1 font-serif text-lg text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                {nextJob.role} →
              </p>
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
}
