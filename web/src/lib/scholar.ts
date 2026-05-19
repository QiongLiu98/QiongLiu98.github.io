import type { Publication } from "@/content/site";
import { site } from "@/content/site";

/** Google Scholar search for a specific publication. */
export function getPublicationScholarUrl(pub: Publication): string {
  if (pub.scholarUrl) return pub.scholarUrl;
  const query = `${pub.citation} ${site.name}`;
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
}

export const scholarProfileUrl = site.links.scholar;
