"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { searchDocuments } from "@/lib/search-index";
import { searchSite } from "@/lib/search";

export function SiteSearch() {
  const router = useRouter();
  const dialogId = useId();
  const hintId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = searchSite(query, searchDocuments);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const openSearch = useCallback(() => {
    setOpen(true);
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (open && e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      const href = results[activeIndex].href;
      close();
      router.push(href);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  const overlay =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex min-h-[100dvh] w-full flex-col"
            role="presentation"
          >
            {/* Full-viewport backdrop — portaled to body so header backdrop-filter cannot clip it */}
            <button
              type="button"
              aria-label="Close search"
              className="absolute inset-0 min-h-[100dvh] w-full bg-[var(--color-ink)]/45 backdrop-blur-[3px]"
              onClick={close}
            />

            <div className="relative z-10 flex flex-1 flex-col items-center px-4 pt-[max(1rem,8vh)] pb-6 sm:px-6 sm:pt-24">
              <div
                id={dialogId}
                role="dialog"
                aria-modal="true"
                aria-label="Search site"
                aria-describedby={hintId}
                className="w-full max-w-[min(100%,28rem)] overflow-hidden rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper)] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 border-b border-[var(--color-rule)] px-4 py-3">
                  <SearchIcon className="h-5 w-5 shrink-0 text-[var(--color-warm)]" />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onInputKeyDown}
                    placeholder="Search research, publications, experience…"
                    className="min-w-0 flex-1 bg-transparent text-base text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)]"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    onClick={close}
                    className="flex shrink-0 items-center gap-1.5 rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-warm)]"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Close</span>
                    <kbd className="num rounded border border-[var(--color-rule)] bg-[var(--color-paper)] px-1.5 py-0.5 text-[10px] text-[var(--color-muted)]">
                      Esc
                    </kbd>
                  </button>
                </div>

                <div className="max-h-[min(50vh,24rem)] overflow-y-auto">
                  {query.trim() === "" ? (
                    <p className="px-4 py-6 text-sm text-[var(--color-muted)]">
                      Try{" "}
                      <span className="text-[var(--color-ink-soft)]">
                        cardiac PET
                      </span>
                      ,{" "}
                      <span className="text-[var(--color-ink-soft)]">SNMMI</span>
                      ,{" "}
                      <span className="text-[var(--color-ink-soft)]">
                        motion correction
                      </span>
                      , or{" "}
                      <span className="text-[var(--color-ink-soft)]">Yale</span>
                    </p>
                  ) : results.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-[var(--color-muted)]">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                  ) : (
                    <ul className="divide-y divide-[var(--color-rule-soft)]">
                      {results.map((item, i) => (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className={`block px-4 py-3 transition-colors ${
                              i === activeIndex
                                ? "bg-[var(--color-warm-soft)]"
                                : "hover:bg-[var(--color-surface)]"
                            }`}
                            onMouseEnter={() => setActiveIndex(i)}
                          >
                            <span className="label text-[10px] text-[var(--color-warm)]">
                              {item.category}
                            </span>
                            <p className="mt-0.5 font-serif text-base leading-snug text-[var(--color-ink)]">
                              {item.title}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs text-[var(--color-muted)]">
                              {item.excerpt}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <p
                  id={hintId}
                  className="border-t border-[var(--color-rule-soft)] bg-[var(--color-surface)]/60 px-4 py-2.5 text-center text-[11px] text-[var(--color-muted)]"
                >
                  Press{" "}
                  <kbd className="num rounded border border-[var(--color-rule)] bg-[var(--color-paper)] px-1 py-0.5 text-[10px]">
                    Esc
                  </kbd>{" "}
                  or click outside to close
                </p>
              </div>

              <p className="mt-4 text-center text-sm text-[var(--color-paper)]/90">
                Click the dimmed area or press Esc to exit search
              </p>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="flex h-9 w-9 shrink-0 items-center justify-center gap-0 rounded-full border border-[var(--color-rule)] bg-[var(--color-surface)]/80 p-0 text-[var(--color-muted)] transition-colors hover:border-[var(--color-warm)] hover:text-[var(--color-ink)] max-lg:md:h-auto max-lg:md:w-auto max-lg:md:justify-start max-lg:md:gap-2 max-lg:md:px-3 max-lg:md:py-2 xl:h-auto xl:w-auto xl:justify-start xl:gap-2 xl:px-3 xl:py-2"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-label="Search site (⌘K)"
        title="Search (⌘K)"
      >
        <SearchIcon className="h-4 w-4 shrink-0" />
        <span className="hidden text-sm max-lg:md:inline xl:inline">Search</span>
        <kbd className="num hidden rounded border border-[var(--color-rule)] bg-[var(--color-paper)] px-1.5 py-0.5 text-[10px] text-[var(--color-muted-soft)] max-lg:md:inline xl:inline">
          ⌘K
        </kbd>
      </button>
      {overlay}
    </>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20L16 16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
