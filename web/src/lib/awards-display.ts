import { awards } from "@/content/site";

export type FlatAward = {
  year: number;
  title: string;
  note?: string;
  org: string;
};

export function getFlatAwards(): FlatAward[] {
  return awards.flatMap((group) =>
    group.items.map((item) => ({
      year: item.year,
      title: item.title,
      note: "note" in item ? item.note : undefined,
      org: group.org,
    })),
  );
}

export function getTopAwards(limit = 3): FlatAward[] {
  return [...getFlatAwards()].sort((a, b) => b.year - a.year).slice(0, limit);
}

export const snmmiAwardCount = getFlatAwards().filter((a) =>
  a.org.includes("Nuclear Medicine"),
).length;
