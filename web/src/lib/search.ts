import type { SearchDocument } from "@/lib/search-index";

export function searchSite(
  query: string,
  documents: SearchDocument[],
  limit = 12,
): SearchDocument[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  const scored = documents
    .map((doc) => {
      let score = 0;
      const title = doc.title.toLowerCase();
      const excerpt = doc.excerpt.toLowerCase();
      const text = doc.text;

      if (title.includes(q)) score += 24;
      if (excerpt.includes(q)) score += 12;

      for (const term of terms) {
        if (title.includes(term)) score += 10;
        if (excerpt.includes(term)) score += 5;
        if (text.includes(term)) score += 2;
      }

      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((r) => r.doc);
}
