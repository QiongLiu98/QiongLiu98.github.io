import Link from "next/link";
import { contentShell, sectionY } from "@/lib/layout";
import { HERO_AWARD_VARIANTS } from "@/components/design/hero-awards/HeroAwardsVariants";

export const metadata = {
  title: "Hero + awards layout comparison",
  robots: { index: false, follow: false },
};

const recommendations = [
  {
    pick: "Least busy",
    ids: ["A", "E", "I"],
    note: "Keep awards in section 04; at most a badge or one line near the portrait.",
  },
  {
    pick: "Best for job search",
    ids: ["C", "I", "E"],
    note: "Surfaces SNMMI credibility without crowding the name/title.",
  },
  {
    pick: "Most editorial",
    ids: ["H", "K", "F"],
    note: "Magazine-like; richer but taller hero column.",
  },
  {
    pick: "Risky on mobile",
    ids: ["D", "F", "J"],
    note: "Side rails, long stacks, or overlapping images need extra polish.",
  },
];

export default function HeroAwardsComparisonPage() {
  return (
    <div className="bg-[var(--color-paper-warm)]">
      <header className={`border-b border-[var(--color-rule)] ${sectionY}`}>
        <div className={contentShell}>
          <Link
            href="/"
            className="text-sm text-[var(--color-muted)] underline underline-offset-4 hover:text-[var(--color-warm)]"
          >
            ← Back to site
          </Link>
          <p className="label mt-6">Design lab</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[0.95] text-[var(--color-ink)] md:text-6xl">
            Hero + awards{" "}
            <span className="font-display-italic">layout options</span>
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-lg italic text-[var(--color-muted)] md:text-xl">
            Compare formats before changing the live home page. Each block uses
            the same copy and real award data; only the portrait region
            changes.
          </p>

          <nav
            className="mt-8 flex flex-wrap gap-2"
            aria-label="Jump to variant"
          >
            {HERO_AWARD_VARIANTS.map((v) => (
              <a
                key={v.id}
                href={`#variant-${v.id}`}
                className="rounded-full border border-[var(--color-rule)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-ink)] hover:border-[var(--color-warm)]"
              >
                <span className="num text-[var(--color-warm)]">{v.id}</span>{" "}
                {v.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className={`${contentShell} space-y-16 py-12 md:space-y-24 md:py-20`}>
        <section className="intro-panel rounded-sm p-6 md:p-8">
          <h2 className="font-display text-2xl text-[var(--color-ink)]">
            Quick picks
          </h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {recommendations.map((r) => (
              <li
                key={r.pick}
                className="border-l-2 border-[var(--color-warm)] pl-4"
              >
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {r.pick}
                </p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  Variants {r.ids.join(", ")} — {r.note}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {HERO_AWARD_VARIANTS.map((v) => (
          <div key={v.id} id={`variant-${v.id}`} className="scroll-mt-24">
            <v.Component />
          </div>
        ))}
      </div>
    </div>
  );
}
