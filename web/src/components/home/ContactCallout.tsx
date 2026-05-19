import Link from "next/link";
import {
  contentShell,
  displayPageTitle,
  sectionY,
  serifLead,
  stackMd,
} from "@/lib/layout";
import { site } from "@/content/site";

export function ContactCallout() {
  return (
    <section className={sectionY}>
      <div className={contentShell}>
        <div className="flex items-baseline gap-2 md:gap-3">
          <span className="num text-xs text-[var(--color-warm)]">08</span>
          <span className="label">Get in touch</span>
        </div>
        <h2 className={`${displayPageTitle} max-w-4xl`}>
          Have a problem worth{" "}
          <span className="font-display-italic">working on?</span>
        </h2>
        <p className={`${serifLead} ${stackMd} max-w-2xl`}>
          {site.openTo}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-12 md:gap-x-8 md:gap-y-4">
          <a
            href={`mailto:${site.email}`}
            className="font-display text-2xl italic text-[var(--color-warm)] underline decoration-1 underline-offset-4 hover:decoration-2 md:text-4xl"
          >
            {site.email}
          </a>
          <Link
            href="/contact"
            className="text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
          >
            More ways to reach out →
          </Link>
        </div>
      </div>
    </section>
  );
}
