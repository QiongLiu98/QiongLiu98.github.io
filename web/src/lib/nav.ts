export const primaryNav = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "Research", href: "/research" },
  { number: "03", label: "Publications", href: "/publications" },
  { number: "04", label: "Patents", href: "/patents" },
  { number: "05", label: "CV", href: "/cv" },
  { number: "06", label: "Blog", href: "/blog" },
  { number: "07", label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof primaryNav)[number];
