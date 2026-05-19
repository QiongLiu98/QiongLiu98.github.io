import Link from "next/link";
import { site } from "@/content/site";
import { primaryNav } from "@/lib/nav";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="site-footer"
      className="mt-32 border-t border-[var(--color-rule)] bg-[var(--color-paper-warm)]"
    >
      <div className="mx-auto max-w-[1240px] px-4 py-10 md:px-6 md:py-16 lg:px-12 lg:py-20">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
          <div>
            <p className="label">Correspondence</p>
            <p className="mt-3 font-serif text-2xl leading-tight text-[var(--color-ink)] md:mt-4 md:text-4xl">
              Open to research collaborations &amp; new roles.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block font-serif text-xl italic text-[var(--color-warm)] underline decoration-1 underline-offset-4 hover:decoration-2 md:mt-6 md:text-2xl"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="label">Navigate</p>
            <ul className="mt-4 space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-2 text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-warm)]"
                  >
                    <span className="num text-[10px] text-[var(--color-muted-soft)]">
                      {item.number}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={site.links.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-warm)]"
                >
                  Google Scholar ↗
                </a>
              </li>
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-warm)]"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="/Qiong_Liu_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-warm)]"
                >
                  Download CV ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--color-rule)] pt-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-serif italic">
            {site.location} &nbsp;·&nbsp; {site.workAuthorization}
          </p>
        </div>
      </div>
    </footer>
  );
}
