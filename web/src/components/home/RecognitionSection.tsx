import Image from "next/image";
import Link from "next/link";
import {
  contentShell,
  displaySectionTitle,
  sectionY,
} from "@/lib/layout";
import { awards, personalPhotos } from "@/content/site";

export function RecognitionSection() {
  return (
    <section className={sectionY}>
      <div className={contentShell}>
        <div className="grid gap-8 md:gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="num text-xs text-[var(--color-warm)]">06</span>
              <span className="label">Recognition</span>
            </div>
            <h2 className={displaySectionTitle}>
              Awards &amp;
              <br />
              <span className="font-display-italic">honors.</span>
            </h2>

            <div className="mt-6 space-y-6 md:mt-12 md:space-y-10">
              {awards.map((group) => (
                <div key={group.org}>
                  <p className="label">{group.org}</p>
                  <ul className="mt-3 space-y-4 md:mt-4 md:space-y-5">
                    {group.items.map((item) => (
                      <li
                        key={item.title}
                        className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-[var(--color-rule-soft)] pb-4 last:border-b-0 md:gap-x-5 md:pb-5"
                      >
                        <span className="font-display text-xl text-[var(--color-warm)] md:text-2xl">
                          {item.year}
                        </span>
                        <div>
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="font-serif text-base leading-snug text-[var(--color-ink)] underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--color-warm)] hover:decoration-[var(--color-warm)] md:text-lg"
                            >
                              {item.title}
                            </Link>
                          ) : (
                            <p className="font-serif text-base leading-snug text-[var(--color-ink)] md:text-lg">
                              {item.title}
                            </p>
                          )}
                          {item.note && (
                            <p className="mt-1 text-sm italic text-[var(--color-muted)]">
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
          </div>

          <div className="lg:pt-32">
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-[var(--color-rule)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-25px_rgba(0,0,0,0.25)] md:aspect-[4/3]">
                <Image
                  src={personalPhotos.award.src}
                  alt={personalPhotos.award.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
              <figcaption className="mt-3 font-serif text-sm italic text-[var(--color-muted)] md:mt-4">
                <Link
                  href="/blog/snmmi-2025-young-investigator"
                  className="underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--color-warm)] hover:decoration-[var(--color-warm)]"
                >
                  {personalPhotos.award.caption}
                </Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
