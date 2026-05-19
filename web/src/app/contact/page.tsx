import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { personalPhotos, site } from "@/content/site";
import { contentShell, pageMainY } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Qiong Liu, Ph.D.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        number="06"
        label="Contact"
        title={
          <>
            Let&rsquo;s
            <br />
            <span className="font-display-italic">connect.</span>
          </>
        }
        description="Open to research collaborations, industry roles, and conversations about cardiovascular imaging, PET, and machine learning."
      />

      <div className={`${contentShell} ${pageMainY}`}>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <dl className="space-y-6 md:space-y-10">
              <div>
                <dt className="label">Email</dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-display text-2xl italic text-[var(--color-warm)] underline decoration-1 underline-offset-4 hover:decoration-2 md:text-4xl"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Phone</dt>
                <dd className="mt-2 font-serif text-lg text-[var(--color-ink)] md:mt-3 md:text-2xl">
                  {site.phone}
                </dd>
              </div>
              <div>
                <dt className="label">Location</dt>
                <dd className="mt-2 font-serif text-lg text-[var(--color-ink)] md:mt-3 md:text-2xl">
                  {site.location}
                </dd>
                <dd className="mt-2 text-sm text-[var(--color-muted)]">
                  {site.workAuthorization}
                </dd>
              </div>
              <div>
                <dt className="label">Current role</dt>
                <dd className="mt-3 font-serif text-xl text-[var(--color-ink)]">
                  {site.title}
                </dd>
                <dd className="mt-1 text-[var(--color-muted)]">
                  {site.affiliation}
                </dd>
              </div>
            </dl>

            <div className="mt-16 flex flex-wrap gap-4">
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] px-5 py-2.5 text-sm transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-warm)]"
              >
                LinkedIn ↗
              </a>
              <a
                href={site.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] px-5 py-2.5 text-sm transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-warm)]"
              >
                Google Scholar ↗
              </a>
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] px-5 py-2.5 text-sm transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-warm)]"
              >
                Download CV
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[var(--color-rule)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.2)]">
                <Image
                  src={personalPhotos.headshot.src}
                  alt={personalPhotos.headshot.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
