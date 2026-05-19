import { experience, type ExperienceRole } from "@/content/site";

export type { ExperienceRole };

/** Compact range for hero list, e.g. "2025–" or "2020–2025". */
export function experiencePeriodLabel(period: string): string {
  const start = period.match(/\d{4}/)?.[0];
  if (!start) return period;
  if (/present/i.test(period)) return `${start}–`;
  const end = period.split("—").pop()?.trim().match(/\d{4}/)?.[0];
  return end && end !== start ? `${start}–${end}` : start;
}

export function experienceHref(slug: string): string {
  return `/experience/${slug}`;
}

export function getHeroExperience(limit = 3): ExperienceRole[] {
  return experience.slice(0, limit);
}
