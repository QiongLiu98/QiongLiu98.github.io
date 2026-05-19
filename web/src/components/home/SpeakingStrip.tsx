import Image from "next/image";
import { contentShell, sectionYMedium } from "@/lib/layout";
import { personalPhotos } from "@/content/site";

export function SpeakingStrip() {
  const items = [personalPhotos.speakingSNMMI, personalPhotos.speakingIEEE];
  return (
    <section
      className={`border-y border-[var(--color-rule)] bg-[var(--color-band-bg)] ${sectionYMedium} text-[var(--color-band-fg)]`}
    >
      <div className={contentShell}>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-12 md:gap-6">
          <div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="num num-tertiary text-xs">05</span>
              <span className="label text-[var(--color-band-muted)]">
                On Stage
              </span>
            </div>
            <h2 className="font-display mt-3 text-3xl leading-tight md:mt-5 md:text-6xl">
              Conferences &amp;{" "}
              <span className="font-display-italic">talks.</span>
            </h2>
          </div>
          <p className="max-w-sm font-serif text-sm italic text-[var(--color-band-muted)] md:text-base">
            Selected oral presentations at SNMMI and IEEE NSS/MIC on cardiac
            PET, kinetic modeling, and deep learning denoising.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {items.map((item) => (
            <figure key={item.src}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption className="mt-2 font-serif text-sm italic text-[var(--color-band-muted)] md:mt-3">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
