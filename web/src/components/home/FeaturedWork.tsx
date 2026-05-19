import Image from "next/image";
import Link from "next/link";
import {
  contentShell,
  displayCardTitle,
  listItemY,
  sectionY,
  serifLead,
} from "@/lib/layout";
import { researchProjects } from "@/content/site";

export function FeaturedWork() {
  return (
    <section className={sectionY}>
      <div className={contentShell}>
        <div className="flex items-end justify-between gap-4 border-b border-[var(--color-rule)] pb-6 md:gap-8 md:pb-10">
          <div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="num text-xs text-[var(--color-warm)]">03</span>
              <span className="label">Selected Work</span>
            </div>
            <h2 className="font-display mt-4 text-3xl text-[var(--color-ink)] md:mt-6 md:text-7xl">
              Research,
              <br />
              <span className="font-display-italic">in depth.</span>
            </h2>
            <Link
              href="/research"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-surface)] px-4 py-2 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-warm)] md:hidden"
            >
              View all research
              <span aria-hidden>→</span>
            </Link>
          </div>
          <Link
            href="/research"
            className="hidden whitespace-nowrap text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)] md:inline-block"
          >
            View all research →
          </Link>
        </div>

        <ol className="divide-y divide-[var(--color-rule)]">
          {researchProjects.map((project, i) => {
            const isReversed = i % 2 === 1;
            return (
              <li key={project.slug}>
                <Link
                  href={`/research/${project.slug}`}
                  className={`group block ${listItemY}`}
                >
                  <div
                    className={`grid items-center gap-5 md:gap-12 ${
                      isReversed
                        ? "lg:grid-cols-[1fr_1.5fr]"
                        : "lg:grid-cols-[1.5fr_1fr]"
                    }`}
                  >
                    <div
                      className={`relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-ink)] md:aspect-[4/3] ${
                        isReversed ? "lg:order-2" : ""
                      }`}
                    >
                      {project.heroImage ? (
                        <Image
                          src={project.heroImage}
                          alt={project.heroAlt ?? project.title}
                          fill
                          className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03] md:p-4"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-ink)] p-6 md:p-8">
                          <p className="font-display text-center text-2xl leading-tight text-[var(--color-paper)] md:text-4xl">
                            {project.title.split(":")[0]}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className={isReversed ? "lg:order-1" : ""}>
                      <div className="flex items-baseline gap-2 md:gap-3">
                        <span className="num text-xs text-[var(--color-warm)]">
                          {project.number}
                        </span>
                        <span className="label">{project.period}</span>
                      </div>
                      <h3
                        className={`${displayCardTitle} transition-colors group-hover:text-[var(--color-warm)]`}
                      >
                        {project.title}
                      </h3>
                      <p className={`${serifLead} mt-3 max-w-none text-[var(--color-muted)] md:mt-5`}>
                        {project.subtitle}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--color-muted-soft)] md:mt-6">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--color-ink)] underline decoration-1 underline-offset-4 transition-colors group-hover:text-[var(--color-warm)] md:mt-8">
                        Read the work
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
