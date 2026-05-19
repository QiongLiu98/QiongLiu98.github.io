/** Routes included in responsive visual regression tests. */
export const visualRoutes = [
  { path: "/", name: "home" },
  { path: "/research", name: "research-index" },
  { path: "/research/attr-parametric-pet", name: "research-detail" },
  { path: "/publications", name: "publications" },
  { path: "/cv", name: "cv" },
  { path: "/blog", name: "blog-index" },
  { path: "/blog/snmmi-2025-young-investigator", name: "blog-post" },
  { path: "/contact", name: "contact" },
] as const;

export type VisualRouteName = (typeof visualRoutes)[number]["name"];
