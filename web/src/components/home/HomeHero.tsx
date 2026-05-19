import Image from "next/image";
import Link from "next/link";
import { contentShell } from "@/lib/layout";
import {
  experienceHref,
  experiencePeriodLabel,
  getHeroExperience,
} from "@/lib/experience-display";
import { personalPhotos, site } from "@/content/site";

const heroExperience = getHeroExperience(3);

export function HomeHero() {
  const currentYear = new Date().getFullYear();
  return (
    <section className="theme-mesh relative overflow-hidden pt-32 pb-12 md:pt-36 lg:pt-44 md:pb-32">
      <div className={contentShell}>
        <div className="grid items-start gap-6 sm:items-end md:gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
          <div className="fade-in min-w-0">
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="num num-highlight text-xs">
                {currentYear}
              </span>
              <span className="label">{site.headline}</span>
            </div>

            <h1 className="font-display mt-4 text-[clamp(2.25rem,8.5vw,9rem)] leading-[0.9] text-[var(--color-ink)] md:mt-8">
              Qiong{" "}
              <span className="font-display-italic text-[var(--color-warm)]">
                Liu
              </span>
            </h1>

            <p className="mt-4 max-w-xl font-serif text-lg italic leading-snug text-[var(--color-ink-soft)] md:mt-8 md:text-3xl">
              {site.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--color-muted)] md:mt-10 md:gap-x-6 md:text-sm">
              <span className="font-serif text-sm md:text-base">
                {site.title} ·{" "}
                <span className="text-[var(--color-ink-soft)]">
                  {site.affiliation}
                </span>
              </span>
              <span
                aria-hidden
                className="hidden text-[var(--color-rule)] sm:inline"
              >
                /
              </span>
              <span className="font-serif italic">{site.location}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 md:mt-12 md:gap-3">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-2 text-xs text-[var(--color-paper)] transition-colors hover:bg-[var(--color-warm)] md:px-6 md:py-3 md:text-sm"
              >
                Selected research
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] bg-transparent px-4 py-2 text-xs text-[var(--color-ink)] transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-warm)] md:px-6 md:py-3 md:text-sm"
              >
                Curriculum vitae
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-2 py-2 text-xs text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)] md:px-6 md:py-3 md:text-sm"
              >
                {site.email}
              </a>
            </div>
          </div>

          <figure className="fade-in-delay-2 relative mx-auto w-full max-w-[240px] border border-[var(--color-rule)] bg-[var(--color-surface)] sm:max-w-[280px] md:ml-auto md:max-w-[320px] lg:max-w-[360px]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-paper-warm)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-28px_rgba(0,0,0,0.22)]">
              <Image
                src={personalPhotos.headshot.src}
                alt={personalPhotos.headshot.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 360px"
                priority
              />
            </div>
            <figcaption className="border-t border-[var(--color-rule)] p-3 md:p-4">
              <p className="font-serif text-xs italic text-[var(--color-muted)] md:text-sm">
                Qiong Liu, Ph.D. — {site.title}
              </p>
              <ul className="mt-2.5 space-y-2 md:mt-3 md:space-y-2.5">
                {heroExperience.map((job) => (
                  <li key={job.slug}>
                    <Link
                      href={experienceHref(job.slug)}
                      className="group block text-[11px] leading-snug text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-warm)] md:text-xs"
                    >
                      <span className="num text-[var(--color-warm)] group-hover:text-[var(--color-warm)]">
                        {experiencePeriodLabel(job.period)}
                      </span>{" "}
                      <span className="group-hover:underline group-hover:decoration-[var(--color-warm)] group-hover:underline-offset-2">
                        {job.role}
                      </span>
                      <span className="text-[var(--color-muted)] group-hover:text-[var(--color-ink-soft)]">
                        {" "}
                        · {job.org}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/cv"
                className="mt-2.5 inline-block text-[10px] text-[var(--color-muted)] underline underline-offset-2 hover:text-[var(--color-warm)] md:mt-3 md:text-[11px]"
              >
                Full CV →
              </Link>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
