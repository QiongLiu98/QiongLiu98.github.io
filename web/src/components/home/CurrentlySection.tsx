import Link from "next/link";
import {
  contentShell,
  displaySectionTitle,
  sectionYMedium,
} from "@/lib/layout";
import { RichText } from "@/components/shared/RichText";
import { site, stats } from "@/content/site";
import { StatIcon } from "@/components/home/StatIcon";

const iconAccent = [
  "text-[var(--color-warm)] bg-[var(--color-warm-soft)]",
  "text-[var(--color-highlight)] bg-[var(--color-highlight-soft)]",
  "text-[var(--color-tertiary)] bg-[var(--color-tertiary-soft)]",
  "text-[var(--color-accent)] bg-[var(--color-accent-soft)]",
] as const;

export function CurrentlySection() {
  return (
    <section
      className={`section-gradient border-y border-[var(--color-rule)] ${sectionYMedium}`}
    >
      <div className={contentShell}>
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-start lg:gap-10">
          <div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="num text-xs text-[var(--color-warm)]">01</span>
              <span className="label">Introduction</span>
            </div>
            <h2 className={displaySectionTitle}>
              In <span className="font-display-italic">practice.</span>
            </h2>

            <ul
              className="mt-6 grid grid-cols-2 gap-3 md:mt-12 md:gap-4"
              aria-label="Career highlights"
            >
              {stats.map((s, i) => {
                const inner = (
                  <>
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full md:h-12 md:w-12 ${iconAccent[i % iconAccent.length]}`}
                      aria-hidden
                    >
                      <StatIcon id={s.icon} />
                    </div>
                    <p className="font-display mt-3 text-3xl leading-none text-[var(--color-ink)] md:mt-4 md:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-snug text-[var(--color-ink)] md:mt-2.5 md:text-[0.9375rem]">
                      {s.label}
                    </p>
                  </>
                );
                const className =
                  "flex h-full flex-col rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)]/90 p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] md:p-4";

                return (
                  <li key={s.label}>
                    {s.href ? (
                      <Link
                        href={s.href}
                        aria-label={`${s.value} ${s.label}`}
                        className={`${className} transition-colors hover:border-[var(--color-warm)]`}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <article
                        aria-label={`${s.value} ${s.label}`}
                        className={className}
                      >
                        {inner}
                      </article>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="intro-panel rounded-sm p-5 md:p-8 lg:p-10">
            <div className="space-y-4 text-base leading-relaxed md:space-y-6 md:text-[1.2rem] md:leading-[1.65]">
              {site.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-serif text-lg italic leading-snug text-[var(--color-ink)] md:text-3xl"
                      : ""
                  }
                >
                  <RichText segments={paragraph} />
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
