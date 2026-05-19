"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/lib/nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-3 md:px-6 md:py-5 lg:px-12 lg:py-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2 md:gap-3"
          aria-label="Home"
        >
          <span className="num text-xs text-[var(--color-muted)] md:text-sm">
            QL
          </span>
          <span className="font-serif text-lg tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-warm)] md:text-2xl">
            Qiong Liu
          </span>
          <span className="font-serif text-sm italic text-[var(--color-muted)] md:text-lg">
            Ph.D.
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex md:gap-9">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-2.5 text-base transition-colors md:text-lg"
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

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden"
        >
          <span className="text-sm font-medium tracking-[0.18em] text-[var(--color-ink)] uppercase">
            {open ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-rule)] bg-[var(--color-paper)] md:hidden">
          <nav className="mx-auto flex max-w-[1240px] flex-col gap-0 px-4 py-4">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-baseline gap-3 py-2"
                >
                  <span className="num text-sm text-[var(--color-muted-soft)]">
                    {item.number}
                  </span>
                  <span
                    className={`font-serif text-2xl ${
                      active
                        ? "text-[var(--color-warm)]"
                        : "text-[var(--color-ink)]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
