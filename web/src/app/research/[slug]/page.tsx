import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialFigure } from "@/components/shared/EditorialFigure";
import { PublicationEntry } from "@/components/shared/PublicationEntry";
import { PublicationLinks } from "@/components/shared/PublicationLinks";
import { getPublicationAuthors } from "@/lib/publications";
import { getPublicationPrimaryUrl } from "@/lib/publications";
import { contentShell, pageMainY, detailHeroOuter } from "@/lib/layout";
import { createPageMetadata } from "@/lib/seo";
import {
  getPublicationById,
  getResearchProjectBySlug,
  researchProjects,
} from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return researchProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getResearchProjectBySlug(slug);
  if (!project) return { title: "Research" };
  return createPageMetadata({
    title: project.title,
    description: project.subtitle,
    path: `/research/${slug}`,
  });
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getResearchProjectBySlug(slug);
  if (!project) notFound();

  const relatedPubs =
    project.relatedPublicationIds
      ?.map((id) => getPublicationById(id))
      .filter(Boolean) ?? [];

  const currentIndex = researchProjects.findIndex((p) => p.slug === slug);
  const nextProject = researchProjects[currentIndex + 1];
  const prevProject = researchProjects[currentIndex - 1];

  return (
    <article>
      <header className={`${detailHeroOuter}`}>
        <div className={`${contentShell}`}>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
          >
            ← All research
          </Link>
          <div className="mt-8 flex flex-wrap items-baseline gap-3">
            <span className="num text-xs text-[var(--color-warm)]">
              {project.number}
            </span>
            <span className="label">{project.period}</span>
            {project.status && (
              <>
                <span className="text-[var(--color-rule)]">·</span>
                <span className="text-xs text-[var(--color-muted)]">
                  {project.status}
                </span>
              </>
            )}
          </div>
          <h1 className="font-display mt-6 max-w-4xl text-4xl leading-[0.95] text-[var(--color-ink)] md:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-[var(--color-muted)]">
            {project.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[var(--color-muted-soft)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {project.heroImage && (
        <div className="border-b border-[var(--color-rule)] bg-[var(--color-ink)]">
          <div className="relative mx-auto aspect-[21/9] max-w-[1240px]">
            <Image
              src={project.heroImage}
              alt={project.heroAlt ?? project.title}
              fill
              className="object-contain p-6 md:p-10"
              sizes="1240px"
              priority
            />
          </div>
        </div>
      )}

      <div className={`${contentShell} ${pageMainY}`}>
        <div className="grid gap-20 lg:grid-cols-[1fr_280px] lg:gap-24">
          <div>
            <blockquote className="border-l-4 border-[var(--color-warm)] pl-6 font-display text-3xl leading-snug text-[var(--color-ink)] md:text-4xl">
              &ldquo;{project.pullQuote}&rdquo;
            </blockquote>

            <p className="prose-editorial mt-12 text-xl leading-relaxed">
              {project.abstract}
            </p>

            {project.sections.map((section, i) => (
              <section key={section.heading} className="mt-16">
                <div className="flex items-baseline gap-3">
                  <span className="num text-xs text-[var(--color-muted-soft)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-3xl text-[var(--color-ink)] md:text-4xl">
                    {section.heading}
                  </h2>
                </div>
                <p className="prose-editorial mt-6">{section.body}</p>
              </section>
            ))}

            {project.figures && project.figures.length > 0 && (
              <section className="mt-20">
                <p className="label mb-8">Figures</p>
                <div className="grid gap-10 sm:grid-cols-2">
                  {project.figures.map((fig) => (
                    <EditorialFigure
                      key={fig.src}
                      src={fig.src}
                      alt={fig.alt}
                      caption={fig.caption}
                      source={fig.source}
                      fit="contain"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-10 lg:sticky lg:top-32 lg:self-start">
            {project.outcomes && project.outcomes.length > 0 && (
              <div className="border border-[var(--color-rule)] bg-[var(--color-paper-warm)] p-6">
                <p className="label mb-4">Outcomes</p>
                <ul className="space-y-3">
                  {project.outcomes.map((o) => (
                    <li
                      key={o}
                      className="text-sm leading-relaxed text-[var(--color-ink-soft)]"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedPubs.length > 0 && (
              <div>
                <p className="label mb-4">Related publications</p>
                <ul className="space-y-4">
                  {relatedPubs.map((pub) =>
                    pub ? (
                      <li key={pub.id ?? pub.citation}>
                        <p className="font-serif text-sm italic leading-snug text-[var(--color-ink)]">
                          <a
                            href={getPublicationPrimaryUrl(pub)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-1 underline-offset-2 hover:text-[var(--color-warm)]"
                          >
                            {pub.citation}
                          </a>
                        </p>
                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                          {getPublicationAuthors(pub) && (
                            <>{getPublicationAuthors(pub)} · </>
                          )}
                          {pub.venue}, {pub.year}
                        </p>
                        <PublicationLinks
                          pub={pub}
                          className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs"
                        />
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {relatedPubs.length > 0 && (
          <section className="mt-24 border-t border-[var(--color-rule)] pt-16">
            <p className="label mb-8">Full publication entries</p>
            <div className="space-y-8">
              {relatedPubs.map(
                (pub, i) =>
                  pub && <PublicationEntry key={pub.id} pub={pub} index={i} />,
              )}
            </div>
          </section>
        )}

        <nav className="mt-24 flex flex-wrap justify-between gap-6 border-t border-[var(--color-rule)] pt-10">
          {prevProject ? (
            <Link
              href={`/research/${prevProject.slug}`}
              className="group max-w-xs"
            >
              <span className="label">Previous</span>
              <p className="mt-2 font-serif text-lg italic text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                ← {prevProject.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {nextProject ? (
            <Link
              href={`/research/${nextProject.slug}`}
              className="group max-w-xs text-right"
            >
              <span className="label">Next</span>
              <p className="mt-2 font-serif text-lg italic text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                {nextProject.title} →
              </p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
