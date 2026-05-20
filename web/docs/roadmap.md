# Site roadmap

Prioritized from local `contextResources/research/reportWebsite.md` (gitignored) and implementation status.

## Done

- [x] Editorial home hero with unified figure + linked experience
- [x] Experience detail pages (`/experience/[slug]`)
- [x] Teaching & mentoring under Yale Ph.D. role (experience page + CV)
- [x] Dedicated patents page (`/patents`) + home preview
- [x] Primary nav includes Patents
- [x] SEO helpers (`@/lib/seo`) on all main routes
- [x] Agent guidelines (this folder)

## High priority (next)

- [ ] Refresh visual regression snapshots after layout/nav changes
- [ ] Confirm teaching copy with Qiong (PET Center workshops, BME seminars — adjust dates/details if needed)
- [ ] Custom domain + production `metadataBase` if not `qiongliu.work`

## Medium priority

- [ ] Dedicated `/about` page (optional; home intro may suffice)
- [ ] Patents stat card on home links to `/patents`
- [ ] JSON-LD `Person` / `ScholarlyArticle` for rich results
- [ ] Lighthouse pass: performance ≥80 mobile, a11y audit (WCAG 2.1 AA)
- [ ] Hide `ThemeExplorer` in Playwright visual tests (stable snapshots)

## Lower priority

- [ ] Presentations index (subset of publications talks is on `/publications`)
- [ ] GitHub / code samples section if public repos exist
- [ ] 1-page hiring brief PDF linked from home or CV
- [ ] Privacy notice if contact form collects data

## Content maintenance

- Update `site.ts` when new papers, awards, or patents ship.
- Re-run `npm run build` after content changes.
- Keep CV PDF in `web/public/` in sync with HTML CV.
