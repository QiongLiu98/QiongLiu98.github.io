import type { Metadata } from "next";
import { site } from "@/content/site";

/** Shared discoverability terms for ML / computer vision / imaging roles. */
export const siteKeywords = [
  "Qiong Liu",
  "AI scientist",
  "machine learning engineer",
  "computer vision",
  "deep learning",
  "image analysis",
  "spatiotemporal modeling",
  "motion correction",
  "image denoising",
  "medical imaging",
  "cardiac PET",
  "quantitative imaging",
  "PyTorch",
  "Canon Medical",
  "Yale PET Center",
] as const;

const defaultDescription =
  "Qiong Liu, Ph.D. — AI scientist building deep learning for image and spatiotemporal data: computer vision, motion modeling, denoising, and quantitative reconstruction. Open to ML and perception roles beyond medical imaging.";

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: `/${string}`;
};

export function createPageMetadata({
  title,
  description = defaultDescription,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = title.includes(site.name) ? title : title;

  return {
    title: fullTitle,
    description,
    keywords: [...siteKeywords],
    openGraph: {
      title: `${fullTitle} · ${site.name}, ${site.credentials}`,
      description,
      type: "website",
      locale: "en_US",
      ...(path ? { url: path } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${fullTitle} · ${site.name}`,
      description,
    },
    ...(path ? { alternates: { canonical: path } } : {}),
  };
}
