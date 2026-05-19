import Link from "next/link";
import {
  contentShell,
  displaySectionTitle,
  sectionY,
} from "@/lib/layout";
import { patents } from "@/content/site";

export function PatentsPreview() {
  return (
    <section className={sectionY}>
      <div className={contentShell}>
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="num text-xs text-[var(--color-warm)]">05</span>
              <span className="label">Patents</span>
            </div>
            <h2 className={displaySectionTitle}>
              Lead-inventor
              <br />
              <span className="font-display-italic">applications.</span>
            </h2>
            <Link
              href="/patents"
              className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)] md:mt-8"
            >
              View patents →
            </Link>
          </div>

          <ul className="space-y-4 md:space-y-5">
            {patents.map((pat) => (
              <li
                key={pat.slug}
                className="intro-panel rounded-sm border-l-2 border-[var(--color-warm)] p-4 md:p-5"
              >
                <p className="text-xs text-[var(--color-muted)]">
                  {pat.status} · {pat.year}
                </p>
                <p className="mt-2 font-serif text-base leading-snug text-[var(--color-ink)] md:text-lg">
                  {pat.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
