import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contentShell, detailHeroOuter, pageMainY } from "@/lib/layout";
import { createPageMetadata } from "@/lib/seo";
import {
  getRoleProfileBySlug,
  roleProfileHref,
  roleProfiles,
} from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return roleProfiles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleProfileBySlug(slug);
  if (!role) return { title: "Role fit" };
  return createPageMetadata({
    title: `Fit for ${role.title}`,
    description: role.summary,
    path: roleProfileHref(slug),
  });
}

export default async function RoleFitPage({ params }: Props) {
  const { slug } = await params;
  const role = getRoleProfileBySlug(slug);
  if (!role) notFound();

  const currentIndex = roleProfiles.findIndex((r) => r.slug === slug);
  const prevRole = roleProfiles[currentIndex - 1];
  const nextRole = roleProfiles[currentIndex + 1];

  return (
    <article>
      <header className={detailHeroOuter}>
        <div className={contentShell}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] underline decoration-1 underline-offset-4 hover:text-[var(--color-warm)]"
          >
            ← Home · Opportunities
          </Link>

          <div className="mt-8 flex flex-wrap items-baseline gap-3">
            <span className="label">Role fit summary</span>
            <span className="text-[var(--color-rule)]">·</span>
            <span className="text-sm text-[var(--color-muted)]">
              Placeholder copy — replace with final qualifications
            </span>
          </div>

          <h1 className="font-display mt-6 max-w-4xl text-4xl leading-[0.95] text-[var(--color-ink)] md:text-6xl lg:text-7xl">
            {role.title}
          </h1>
          <p className="mt-8 max-w-2xl font-serif text-xl italic leading-snug text-[var(--color-muted)] md:text-2xl">
            {role.summary}
          </p>
        </div>
      </header>

      <div className={`section-gradient ${contentShell} ${pageMainY}`}>
        <div className="mx-auto max-w-3xl">
          <div className="content-panel rounded-sm p-6 md:p-10 lg:p-12">
            <h2 className="label border-b border-[var(--color-rule)] pb-4">
              Why this role
            </h2>
            <ul className="mt-8 space-y-4">
              {role.qualifications.map((item) => (
                <li
                  key={item.slice(0, 48)}
                  className="text-base leading-relaxed text-[var(--color-ink-soft)] before:mr-2 before:text-[var(--color-warm)] before:content-['—']"
                >
                  {item}
                </li>
              ))}
            </ul>

            <section className="mt-14 border-t border-[var(--color-rule-soft)] pt-10">
              <h2 className="label">Related experience &amp; work</h2>
              <ul className="mt-6 space-y-4">
                {role.evidence.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group block rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper)] p-4 transition-colors hover:border-[var(--color-warm)]"
                    >
                      <p className="font-serif text-lg text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        View on site →
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <nav
          className="mt-16 flex flex-col gap-6 border-t border-[var(--color-rule)] pt-10 sm:flex-row sm:justify-between"
          aria-label="Other role fit summaries"
        >
          {prevRole ? (
            <Link
              href={roleProfileHref(prevRole.slug)}
              className="group max-w-sm text-sm text-[var(--color-muted)] hover:text-[var(--color-warm)]"
            >
              <span className="label">Previous</span>
              <p className="mt-1 font-serif text-lg text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                ← {prevRole.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {nextRole ? (
            <Link
              href={roleProfileHref(nextRole.slug)}
              className="group max-w-sm text-right text-sm text-[var(--color-muted)] hover:text-[var(--color-warm)] sm:ml-auto"
            >
              <span className="label">Next</span>
              <p className="mt-1 font-serif text-lg text-[var(--color-ink)] group-hover:text-[var(--color-warm)]">
                {nextRole.title} →
              </p>
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
}
