"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function FloatingContactBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  const hiddenOnContact = pathname === "/contact";

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 280);
      const footer = document.getElementById("site-footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setNearFooter(rect.top < window.innerHeight - 8);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  if (hiddenOnContact) return null;

  const show = visible && !nearFooter;

  return (
    <div
      role="complementary"
      aria-label="Quick contact"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-500 ease-out sm:px-6 ${
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      <div className="pointer-events-auto mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-3 rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper)]/92 px-4 py-3 shadow-[0_-4px_40px_-12px_rgba(26,22,20,0.18)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-3.5">
          <p className="hidden font-serif text-sm italic text-[var(--color-muted)] sm:block">
            Reach out — collaborations &amp; roles welcome
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-2 text-sm text-[var(--color-ink)] transition-colors hover:text-[var(--color-warm)]"
            >
              <span className="label hidden text-[10px] sm:inline">Email</span>
              <span className="font-medium underline decoration-1 underline-offset-4 group-hover:decoration-2">
                {site.email}
              </span>
            </a>

            <span
              className="hidden h-3 w-px bg-[var(--color-rule)] sm:block"
              aria-hidden
            />

            <a
              href={`tel:${site.phone.replace(/\D/g, "")}`}
              className="group flex items-center gap-2 text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-warm)]"
            >
              <span className="label hidden text-[10px] sm:inline">Phone</span>
              <span className="num">{site.phone}</span>
            </a>

            <span
              className="hidden h-3 w-px bg-[var(--color-rule)] sm:block"
              aria-hidden
            />

            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-warm)]"
            >
              LinkedIn ↗
            </a>

            <Link
              href="/contact"
              className="ml-auto rounded-full bg-[var(--color-ink)] px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--color-paper)] uppercase transition-colors hover:bg-[var(--color-warm)] sm:ml-0"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
