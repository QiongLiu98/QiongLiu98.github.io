<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Qiong Liu portfolio — agent notes

Run commands from **`web/`** (not repo root).

## Must-read docs

- **[docs/website-guidelines.md](docs/website-guidelines.md)** — IA, design tokens, content rules, SEO
- **[docs/roadmap.md](docs/roadmap.md)** — what's done vs planned
- **Local only:** `../contextResources/` (gitignored) — manuscripts and paper PDFs are not in the repo. Research rationale: `../contextResources/research/reportWebsite.md` when present locally.

## Key paths

| Area | Path |
| --- | --- |
| Content | `src/content/site.ts` |
| SEO | `src/lib/seo.ts` |
| Nav | `src/lib/nav.ts` |
| Themes | `src/lib/themes.ts`, `src/app/themes.css` |
| Visual tests | `docs/visual-testing.md` |

## Common pitfalls

- Grep for erroneous `motion` JSX tags before shipping (should be `div`) — they break the build.
- Content changes belong in `site.ts`, not scattered across pages.
- Only commit when the user asks.
