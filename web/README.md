# Qiong Liu — Portfolio Site

Editorial multi-page portfolio for **Qiong Liu, Ph.D.** (Next.js 16, TypeScript, Tailwind v4).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, current role, featured research, publications preview |
| `/research` | Research project index |
| `/research/[slug]` | Project deep-dives (4 static pages) |
| `/publications` | Full publication & conference list |
| `/cv` | CV summary + PDF download |
| `/blog` | Essays on research, conferences, and imaging science |
| `/blog/[slug]` | Individual blog posts |
| `/contact` | Contact details & links |

## Development

```bash
npm install
npm run dev
```

## Visual / responsive testing

Playwright captures full-page screenshots on **9 device profiles** across all main routes. See [docs/visual-testing.md](./docs/visual-testing.md).

```bash
npx playwright install chromium   # first time
npm run test:visual               # compare to baselines
npm run test:visual:update        # refresh baselines after UI changes
npm run test:visual:matrix        # open device grid report
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
```

## Content

All copy lives in `src/content/site.ts`. Images and CV PDF are in `public/`.

To update the downloadable CV, replace `public/Qiong_Liu_CV.pdf` (source LaTeX is in `../contextResources/Qiong_Liu_CV_update/`).

## Structure

```
src/
├── app/              # Pages (App Router)
├── components/
│   ├── home/         # Home page sections
│   ├── layout/       # Header, footer, page chrome
│   └── shared/       # Reusable editorial components
├── content/site.ts   # All site content
└── lib/nav.ts        # Navigation config
```
