"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteSearch } from "@/components/search/SiteSearch";
import { primaryNav } from "@/lib/nav";

function NavLinks({
  isActive,
  className,
}: {
  isActive: (href: string) => boolean;
  className?: string;
}) {
  return (
    <nav className={className} aria-label="Primary">
      {primaryNav.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group flex shrink-0 items-baseline gap-2 text-sm transition-colors lg:text-base"
          >
            <span
              className={`num text-xs transition-colors ${
                active
                  ? "text-[var(--color-warm)]"
                  : "text-[var(--color-muted-soft)] group-hover:text-[var(--color-warm)]"
              }`}
            >
              {item.number}
            </span>
            <span
              className={`transition-colors ${
                active
                  ? "text-[var(--color-ink)]"
                  : "text-[var(--color-muted)] group-hover:text-[var(--color-ink)]"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-rule)] bg-[var(--color-paper)]/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 md:px-6 md:py-4 lg:flex-nowrap lg:items-center lg:gap-y-0 lg:px-12 lg:py-5">
        <Link
          href="/"
          className="group order-1 flex min-w-0 shrink items-baseline gap-2 md:gap-3"
          aria-label="Home"
        >
          <span className="num shrink-0 text-xs text-[var(--color-muted)] md:text-sm">
            QL
          </span>
          <span className="truncate font-serif text-lg tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-warm)] md:text-2xl">
            Qiong Liu
          </span>
          <span className="hidden shrink-0 font-serif text-sm italic text-[var(--color-muted)] sm:inline md:text-lg">
            Ph.D.
          </span>
        </Link>

        <div className="order-2 ml-auto shrink-0 lg:order-3 lg:ml-0">
          <SiteSearch />
        </div>

        <NavLinks
          isActive={isActive}
          className="order-3 flex w-full basis-full flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--color-rule)] pt-3 sm:gap-x-5 lg:order-2 lg:w-auto lg:basis-auto lg:flex-1 lg:justify-center lg:gap-x-6 lg:border-t-0 lg:pt-0 xl:gap-x-7"
        />
      </div>
    </header>
  );
}
