import Image from "next/image";
import Link from "next/link";
import {
  getFlatAwards,
  getTopAwards,
  snmmiAwardCount,
} from "@/lib/awards-display";
import {
  experienceHref,
  experiencePeriodLabel,
  getHeroExperience,
} from "@/lib/experience-display";
import { personalPhotos, site } from "@/content/site";

const topThree = getTopAwards(3);
const allAwards = getFlatAwards();
const heroExperience = getHeroExperience(3);

function VariantLabel({
  id,
  title,
  note,
}: {
  id: string;
  title: string;
  note: string;
}) {
  return (
    <div className="mb-6 border-b border-[var(--color-rule)] pb-4">
      <span className="num text-xs text-[var(--color-warm)]">{id}</span>
      <h3 className="font-display mt-1 text-2xl text-[var(--color-ink)] md:text-3xl">
        {title}
      </h3>
      <p className="mt-2 max-w-2xl font-serif text-sm italic text-[var(--color-muted)] md:text-base">
        {note}
      </p>
    </div>
  );
}

function HeroCopy() {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline gap-2 md:gap-3">
        <span className="num num-highlight text-xs">2026</span>
        <span className="label">Cardiovascular AI · Cardiac PET</span>
      </div>
      <h1 className="font-display mt-4 text-[clamp(2rem,7vw,5.5rem)] leading-[0.9] text-[var(--color-ink)] md:mt-6">
        Qiong{" "}
        <span className="font-display-italic text-[var(--color-warm)]">Liu</span>
      </h1>
      <p className="mt-3 max-w-xl font-serif text-base italic leading-snug text-[var(--color-ink-soft)] md:text-xl">
        {site.tagline}
      </p>
    </div>
  );
}

/** A — Current production hero (no awards). */
export function VariantA_Baseline() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="A"
        title="Baseline (current)"
        note="Headshot only with PLATE I caption. Awards live in section 04 below the fold."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <HeroCopy />
        <PortraitOnly />
      </div>
    </section>
  );
}

function PortraitOnly({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[280px] md:ml-auto lg:max-w-[320px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper-warm)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-28px_rgba(0,0,0,0.22)]">
        <Image
          src={personalPhotos.headshot.src}
          alt={personalPhotos.headshot.alt}
          fill
          className="object-cover object-top"
          sizes="320px"
        />
      </div>
      <div className="absolute -bottom-2 left-2 right-2 flex items-baseline justify-between bg-[var(--color-paper)] px-2 py-1.5 md:left-3 md:right-3">
        <span className="num text-[9px] text-[var(--color-muted-soft)]">PLATE I</span>
        <span className="font-serif text-xs italic text-[var(--color-muted)]">
          Qiong Liu, Ph.D.
        </span>
      </div>
      {children}
    </div>
  );
}

/** B — Extended caption ribbon (same structure, awards in caption bar). */
export function VariantB_CaptionRibbon() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="B"
        title="Caption ribbon"
        note="Keeps current frame; adds one line of award text under the name. Low visual weight, but can feel cramped on mobile."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <HeroCopy />
        <div className="relative mx-auto w-full max-w-[280px] md:ml-auto lg:max-w-[320px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper-warm)] shadow-md">
            <Image
              src={personalPhotos.headshot.src}
              alt=""
              fill
              className="object-cover object-top"
              sizes="320px"
            />
          </div>
          <div className="absolute -bottom-2 left-2 right-2 border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2 md:-bottom-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="num text-[9px] text-[var(--color-muted-soft)]">PLATE I</span>
              <span className="font-serif text-xs italic text-[var(--color-muted)]">
                Qiong Liu, Ph.D.
              </span>
            </div>
            <p className="mt-1.5 border-t border-[var(--color-rule-soft)] pt-1.5 text-[10px] leading-snug text-[var(--color-ink-soft)] md:text-[11px]">
              <span className="label-warm text-[9px]">SNMMI · {snmmiAwardCount} awards</span>
              {" · "}
              Young Investigator, 1st Place, 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** C — Card stack below portrait (top 3 awards). */
export function VariantC_CardBelow() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="C"
        title="Panel below portrait"
        note="Clear hierarchy: photo stays clean; awards in a solid intro-panel-style card. Similar to your stats layout language."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <HeroCopy />
        <div className="mx-auto w-full max-w-[320px] md:ml-auto">
          <PortraitOnly />
          <div className="intro-panel -mt-1 rounded-sm rounded-t-none border-t-0 p-4 md:p-5">
            <p className="label mb-2">Recognition</p>
            <ul className="space-y-3">
              {topThree.map((a) => (
                <li
                  key={a.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-[var(--color-rule-soft)] pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-display text-lg text-[var(--color-warm)]">
                    {a.year}
                  </span>
                  <p className="text-xs leading-snug text-[var(--color-ink)] md:text-sm">
                    {a.title}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/cv#awards"
              className="mt-3 inline-block text-[11px] text-[var(--color-muted)] underline underline-offset-2 hover:text-[var(--color-warm)]"
            >
              All awards →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** D — Side rail (years only). */
export function VariantD_SideRail() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="D"
        title="Side rail"
        note="Minimal years column beside the photo — editorial index feel. Titles only on hover/focus in production; shown here for comparison."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_auto] lg:gap-12">
        <HeroCopy />
        <div className="flex gap-3 md:ml-auto">
          <ul className="flex flex-col gap-2 pt-8">
            {topThree.map((a) => (
              <li
                key={a.year}
                className="flex w-12 flex-col items-center rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)] py-2"
              >
                <span className="font-display text-sm text-[var(--color-warm)]">
                  {a.year}
                </span>
                <span className="mt-0.5 text-[8px] uppercase tracking-wider text-[var(--color-muted)]">
                  SNMMI
                </span>
              </li>
            ))}
          </ul>
          <PortraitOnly />
        </div>
      </div>
    </section>
  );
}

/** E — Corner badge cluster. */
export function VariantE_CornerBadges() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="E"
        title="Corner badges"
        note="Single bold claim on the image — least busy. Detail deferred to Recognition section or tooltip."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <HeroCopy />
        <div className="relative mx-auto w-full max-w-[280px] md:ml-auto lg:max-w-[320px]">
          <PortraitOnly>
            <div className="absolute -right-2 -top-2 flex flex-col gap-1 md:-right-3 md:-top-3">
              <span className="rounded-full bg-[var(--color-warm)] px-3 py-1 text-[10px] font-medium tracking-wide text-[var(--color-paper)] uppercase shadow-md">
                SNMMI · {snmmiAwardCount}×
              </span>
              <span className="rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper)]/95 px-2 py-1 text-[9px] text-[var(--color-ink)] backdrop-blur-sm">
                YI Award 1st · 2025
              </span>
            </div>
          </PortraitOnly>
        </div>
      </div>
    </section>
  );
}

/** F — Full editorial stack (photo + full list in one column). */
export function VariantF_EditorialStack() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="F"
        title="Editorial stack"
        note="One column: portrait then awards list. Strong on mobile; hero becomes tall."
      />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:gap-16">
        <HeroCopy />
        <div>
          <PortraitOnly />
          <div className="mt-8 space-y-4">
            <p className="label">Awards &amp; honors</p>
            {allAwards.slice(0, 4).map((a) => (
              <div
                key={a.title}
                className="grid grid-cols-[3rem_1fr] gap-3 border-b border-[var(--color-rule-soft)] pb-3"
              >
                <span className="font-display text-xl text-[var(--color-warm)]">
                  {a.year}
                </span>
                <div>
                  <p className="font-serif text-sm text-[var(--color-ink)]">{a.title}</p>
                  {a.note && (
                    <p className="mt-0.5 text-xs italic text-[var(--color-muted)]">
                      {a.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** G — Horizontal medal strip. */
export function VariantG_MedalStrip() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="G"
        title="Medal strip"
        note="Horizontal scroll of years — compact, modern. Good when space is tight under the photo."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <HeroCopy />
        <div className="mx-auto w-full max-w-[320px] md:ml-auto">
          <PortraitOnly />
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {topThree.map((a) => (
              <div
                key={a.year}
                className="min-w-[7.5rem] shrink-0 rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)] px-3 py-2"
              >
                <span className="font-display text-lg text-[var(--color-warm)]">
                  {a.year}
                </span>
                <p className="mt-1 line-clamp-2 text-[10px] leading-tight text-[var(--color-ink-soft)]">
                  {a.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** H — Unified figure box (photo + experience in one border). Live home layout. */
export function VariantH_UnifiedFigure() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="H"
        title="Unified figure (experience)"
        note="Portrait + experience as one museum label — current production hero."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <HeroCopy />
        <figure className="mx-auto w-full max-w-[320px] border border-[var(--color-rule)] bg-[var(--color-surface)] md:ml-auto">
          <div className="relative aspect-[4/5]">
            <Image
              src={personalPhotos.headshot.src}
              alt=""
              fill
              className="object-cover object-top"
              sizes="320px"
            />
          </div>
          <figcaption className="border-t border-[var(--color-rule)] p-4">
            <p className="font-serif text-sm italic text-[var(--color-muted)]">
              Qiong Liu, Ph.D. — {site.title}
            </p>
            <ul className="mt-3 space-y-2">
              {heroExperience.map((job) => (
                <li key={job.slug} className="text-xs text-[var(--color-ink-soft)]">
                  <Link
                    href={experienceHref(job.slug)}
                    className="group transition-colors hover:text-[var(--color-warm)]"
                  >
                    <span className="num text-[var(--color-warm)]">
                      {experiencePeriodLabel(job.period)}
                    </span>{" "}
                    <span className="group-hover:underline group-hover:underline-offset-2">
                      {job.role}
                    </span>
                    <span className="text-[var(--color-muted)]">
                      {" "}
                      · {job.org}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** I — Minimal one-liner only. */
export function VariantI_OneLiner() {
  const lead = topThree[0];
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="I"
        title="One-liner"
        note="Single strongest award under the portrait — maximum restraint; least busy."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <HeroCopy />
        <div className="mx-auto w-full max-w-[320px] md:ml-auto">
          <PortraitOnly />
          <p className="mt-4 text-center font-serif text-sm italic leading-snug text-[var(--color-ink-soft)] md:text-left">
            <span className="label-warm not-italic">{lead.year}</span>
            {" — "}
            {lead.title}
          </p>
        </div>
      </div>
    </section>
  );
}

/** J — Award photo inset (uses recognition image small). */
export function VariantJ_DualImage() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="J"
        title="Dual image"
        note="Headshot + small inset of award ceremony — visual proof without text overload."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <HeroCopy />
        <div className="relative mx-auto w-full max-w-[320px] md:ml-auto">
          <PortraitOnly />
          <div className="absolute -bottom-6 -left-4 w-[45%] overflow-hidden rounded-sm border-2 border-[var(--color-paper)] shadow-lg md:-left-8">
            <div className="relative aspect-[4/3]">
              <Image
                src={personalPhotos.award.src}
                alt=""
                fill
                className="object-cover"
                sizes="140px"
              />
            </div>
          </div>
          <p className="mt-10 text-[10px] italic text-[var(--color-muted)]">
            SNMMI Young Investigator, 2025
          </p>
        </div>
      </div>
    </section>
  );
}

/** K — Marginalia outside frame. */
export function VariantK_Marginalia() {
  return (
    <section className="theme-mesh border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 md:p-10">
      <VariantLabel
        id="K"
        title="Marginalia"
        note="Awards float in the margin outside the photo — editorial magazine layout."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <HeroCopy />
        <div className="relative mx-auto flex w-full max-w-[360px] md:ml-auto">
          <ul className="hidden w-24 shrink-0 space-y-4 pr-3 pt-16 md:block">
            {topThree.map((a, i) => (
              <li key={a.title} className="text-right">
                <span className="num text-[10px] text-[var(--color-muted-soft)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-0.5 font-display text-sm text-[var(--color-warm)]">
                  {a.year}
                </p>
              </li>
            ))}
          </ul>
          <PortraitOnly />
        </div>
      </div>
    </section>
  );
}

export const HERO_AWARD_VARIANTS = [
  { id: "A", label: "Baseline", Component: VariantA_Baseline },
  { id: "B", label: "Caption ribbon", Component: VariantB_CaptionRibbon },
  { id: "C", label: "Panel below", Component: VariantC_CardBelow },
  { id: "D", label: "Side rail", Component: VariantD_SideRail },
  { id: "E", label: "Corner badges", Component: VariantE_CornerBadges },
  { id: "F", label: "Editorial stack", Component: VariantF_EditorialStack },
  { id: "G", label: "Medal strip", Component: VariantG_MedalStrip },
  { id: "H", label: "Unified figure", Component: VariantH_UnifiedFigure },
  { id: "I", label: "One-liner", Component: VariantI_OneLiner },
  { id: "J", label: "Dual image", Component: VariantJ_DualImage },
  { id: "K", label: "Marginalia", Component: VariantK_Marginalia },
] as const;
