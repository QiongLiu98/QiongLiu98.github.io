import type { Publication } from "@/content/site";
import { getPublicationScholarUrl } from "@/lib/scholar";

/** Author line for display — uses citation order from `authors` when set. */
export function getPublicationAuthors(pub: Publication): string | undefined {
  if (pub.authors) return pub.authors;
  if (pub.role === "first") return "Liu, Q., et al.";
  if (pub.role === "equal") return "Liu, Q.*, et al.";
  return undefined;
}

/** Resolve DOI to https://doi.org/… when `url` is not set. */
export function getPublicationDoiUrl(pub: Publication): string | undefined {
  if (pub.url) return pub.url;
  if (!pub.doi) return undefined;
  const doi = pub.doi.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
  return `https://doi.org/${doi}`;
}

/** Primary outbound link: DOI when available, otherwise Google Scholar. */
export function getPublicationPrimaryUrl(pub: Publication): string {
  return getPublicationDoiUrl(pub) ?? getPublicationScholarUrl(pub);
}

export function hasPublicationDoi(pub: Publication): boolean {
  return Boolean(getPublicationDoiUrl(pub));
}
