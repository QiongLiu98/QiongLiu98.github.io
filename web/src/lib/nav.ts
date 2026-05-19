export const primaryNav = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "Research", href: "/research" },
  { number: "03", label: "Publications", href: "/publications" },
  { number: "04", label: "CV", href: "/cv" },
  { number: "05", label: "Blog", href: "/blog" },
  { number: "06", label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof primaryNav)[number];
