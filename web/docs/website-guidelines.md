# Website guidelines for agents

This site follows evidence-based practices for PhD / ML researcher portfolios. The full research synthesis lives at:

**[contextResources/research/reportWebsite.md](../../contextResources/research/reportWebsite.md)**

Use that document when making structural or content decisions. This file summarizes how the codebase implements it.

## Site goals

- Communicate research identity in the first screen (name, role, cardiac PET / ML focus, headshot).
- Support evaluation by collaborators, hiring committees, and clinicians — clarity over flash.
- Keep content in `web/src/content/site.ts`; pages are presentation only.

## Information architecture

| Nav | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Hero, intro, featured research, publications, patents, awards, contact |
| Research | `/research`, `/research/[slug]` | Signature projects with long-form detail |
| Publications | `/publications` | Full bibliography + talks |
| Patents | `/patents` | Lead-inventor applications |
| CV | `/cv` | HTML CV + PDF download |
| Blog | `/blog`, `/blog/[slug]` | News and essays |
| Contact | `/contact` | Email, Scholar, LinkedIn |

Experience detail pages: `/experience/[slug]` (linked from hero and CV; not in primary nav).

## Search

- Header search (top right): indexes nav pages, research, publications, experience, patents, blog, awards, education, and expertise from `site.ts`.
- Implementation: `src/lib/search-index.ts`, `src/lib/search.ts`, `src/components/search/SiteSearch.tsx`.
- Keyboard: **⌘K** / **Ctrl+K** to open; **Esc** to close; arrow keys + Enter to navigate results.

## Design conventions

- **Typography:** Fraunces (display) + Inter (body). Body 16px+ on mobile.
- **Layout:** Single-column editorial flow on home; `contentShell` max width from `@/lib/layout`.
- **Color:** Theme tokens in `themes.css` — do not hardcode one-off palettes.
- **Components:** `.intro-panel`, `.content-panel`, `.section-gradient` for section rhythm.
- **Motion:** Minimal; respect `prefers-reduced-motion`. No parallax.

## Content rules

- Publications: DOI-first links; preserve author order from source.
- Patents: `patents` array in `site.ts`; link to related research when applicable.
- Teaching: Lives under Yale experience (`yale-pet-center-phd`) as `teaching[]` on that role — not a top-level nav item.
- Awards: Home section 05 + full list on CV.
- Avoid personal/hobby content; keep professional tone.

## SEO

- Use `createPageMetadata()` from `@/lib/seo` on every page.
- Shared keywords in `siteKeywords`; page-specific descriptions with field terms (cardiac PET, medical imaging, etc.).

## Before shipping UI changes

1. Grep for `<motion` — must be `<motion>` (common typo → use `div`).
2. Run `npm run build` from `web/`.
3. Update visual snapshots if layout changed: `npm run test:visual:update`.

## Platform note

The research report mentions WordPress/Webflow; **this repo is Next.js 16** on Vercel/Netlify-class hosting. Version control and static generation are intentional strengths.
