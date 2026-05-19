import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/shared/PageHero";
import { contentShell, pageMainY } from "@/lib/layout";
import {
  awards,
  education,
  experience,
  expertise,
  patents,
  personalPhotos,
  site,
} from "@/content/site";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae for Qiong Liu, Ph.D.",
};

export default function CVPage() {
  return (
    <>
      <PageHero
        number="04"
        label="Curriculum Vitae"
        title={
          <>
            The full
            <br />
            <span className="font-display-italic">record.</span>
          </>
        }
        description="Experience, education, publications summary, patents, and awards."
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={site.links.cv}
            download
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm text-[var(--color-paper)] transition-colors hover:bg-[var(--color-warm)]"
          >
            Download PDF ↓
          </a>
          <a
            href={site.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] px-6 py-3 text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-warm)]"
          >
            Open in browser ↗
          </a>
        </div>
      </PageHero>

      <div className={`${contentShell} ${pageMainY}`}>
        <div className="grid gap-20 lg:grid-cols-[1fr_320px] lg:gap-24">
          <div className="space-y-20">
            <section>
              <h2 className="label border-b border-[var(--color-rule)] pb-4">
                Experience
              </h2>
              <ol className="mt-8 space-y-10">
                {experience.map((job) => (
                  <li
                    key={`${job.org}-${job.period}`}
                    className="grid gap-4 border-b border-[var(--color-rule-soft)] pb-10 last:border-b-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-xl text-[var(--color-ink)]">
                          {job.role}
                        </h3>
                        <p className="mt-1 text-[var(--color-warm)]">
                          {job.org}
                        </p>
                      </div>
                      <time className="num text-sm text-[var(--color-muted)]">
                        {job.period}
                      </time>
                    </div>
                    <p className="text-sm text-[var(--color-muted)]">
                      {job.location}
                    </p>
                    <ul className="space-y-2">
                      {job.highlights.map((h) => (
                        <li
                          key={h.slice(0, 40)}
                          className="text-sm leading-relaxed text-[var(--color-ink-soft)] before:mr-2 before:text-[var(--color-warm)] before:content-['—']"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="label border-b border-[var(--color-rule)] pb-4">
                Education
              </h2>
              <div className="mt-8 space-y-8">
                {education.map((edu) => (
                  <div key={edu.school}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-serif text-xl text-[var(--color-ink)]">
                        {edu.school}
                      </h3>
                      <time className="num text-sm text-[var(--color-muted)]">
                        {edu.period}
                      </time>
                    </div>
                    <p className="mt-2 text-[var(--color-ink-soft)]">
                      {edu.degree}
                    </p>
                    {edu.detail && (
                      <p className="mt-2 text-sm italic text-[var(--color-muted)]">
                        {edu.detail}
                      </p>
                    )}
                    {"advisors" in edu && edu.advisors && (
                      <p className="mt-2 text-sm text-[var(--color-muted)]">
                        Advisors: {edu.advisors}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="label border-b border-[var(--color-rule)] pb-4">
                Patents
              </h2>
              <ul className="mt-8 space-y-6">
                {patents.map((pat) => (
                  <li
                    key={pat.title}
                    className="border-l-2 border-[var(--color-warm)] pl-5"
                  >
                    <p className="font-serif text-lg text-[var(--color-ink)]">
                      {pat.title}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      {pat.role} · {pat.status} · {pat.year}
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                      {pat.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="label border-b border-[var(--color-rule)] pb-4">
                Awards
              </h2>
              <div className="mt-8 space-y-8">
                {awards.map((group) => (
                  <div key={group.org}>
                    <p className="text-sm font-medium text-[var(--color-ink)]">
                      {group.org}
                    </p>
                    <ul className="mt-4 space-y-4">
                      {group.items.map((item) => (
                        <li
                          key={item.title}
                          className="grid grid-cols-[auto_1fr] gap-x-4"
                        >
                          <span className="font-display text-xl text-[var(--color-warm)]">
                            {item.year}
                          </span>
                          <div>
                            <p className="text-sm text-[var(--color-ink-soft)]">
                              {item.title}
                            </p>
                            {"note" in item && item.note && (
                              <p className="mt-1 text-xs italic text-[var(--color-muted)]">
                                {item.note}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-10 lg:sticky lg:top-32 lg:self-start">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[var(--color-rule)]">
                <Image
                  src={personalPhotos.graduationPortrait.src}
                  alt={personalPhotos.graduationPortrait.alt}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <figcaption className="mt-3 font-serif text-sm italic text-[var(--color-muted)]">
                {personalPhotos.graduationPortrait.caption}
              </figcaption>
            </figure>

            <div>
              <p className="label mb-4">Expertise</p>
              <div className="space-y-6">
                {expertise.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-medium text-[var(--color-ink)]">
                      {group.category}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-[var(--color-muted)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[var(--color-rule)] bg-[var(--color-paper-warm)] p-5 text-sm">
              <p className="label mb-3">Contact</p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[var(--color-warm)] underline"
                >
                  {site.email}
                </a>
              </p>
              <p className="mt-2 text-[var(--color-muted)]">{site.phone}</p>
              <p className="mt-2 text-[var(--color-muted)]">{site.location}</p>
              <p className="mt-4 text-xs text-[var(--color-muted-soft)]">
                {site.workAuthorization}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
