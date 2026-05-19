import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { researchProjects } from "@/content/site";
import {
  contentShell,
  displayCardTitle,
  listItemYLoose,
  pageMainY,
  serifLead,
} from "@/lib/layout";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Selected research in cardiac PET imaging, motion correction, and deep learning denoising.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        number="02"
        label="Research"
        title={
          <>
            Work that moves
            <br />
            <span className="font-display-italic">the field.</span>
          </>
        }
        description="Four signature projects spanning clinical cardiovascular PET, physics-informed deep learning, and motion correction — from Yale PET Center to Canon Medical Research USA."
      />

      <div className={`${contentShell} ${pageMainY}`}>
        <ol className="divide-y divide-[var(--color-rule)]">
          {researchProjects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/research/${project.slug}`}
                className={`group block ${listItemYLoose}`}
              >
                <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
                  <div>
                    <div className="flex items-baseline gap-3">
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
                    <h2
                      className={`${displayCardTitle} transition-colors group-hover:text-[var(--color-warm)] lg:text-6xl`}
                    >
                      {project.title}
                    </h2>
                    <p
                      className={`${serifLead} mt-3 max-w-none text-[var(--color-muted)] md:mt-5`}
                    >
                      {project.subtitle}
                    </p>
                    <blockquote className="mt-4 border-l-2 border-[var(--color-warm)] pl-4 font-serif text-base italic leading-relaxed text-[var(--color-ink-soft)] md:mt-8 md:pl-5 md:text-lg">
                      &ldquo;{project.pullQuote}&rdquo;
                    </blockquote>
                    <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--color-ink)] underline decoration-1 underline-offset-4 group-hover:text-[var(--color-warm)] md:mt-8">
                      Read full project
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                  </div>

                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-ink)]">
                    {project.heroImage ? (
                      <Image
                        src={project.heroImage}
                        alt={project.heroAlt ?? project.title}
                        fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 480px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-ink)] p-8">
                        <p className="font-display text-center text-2xl text-[var(--color-paper)]">
                          {project.title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
