# Qiong Liu — Academic Portfolio

Professional portfolio site for Qiong Liu, Ph.D.

## Project structure

```
qiongWebsite/
├── contextResources/          # Local only (gitignored) — manuscripts, paper PDFs, CV LaTeX
├── web/                       # Next.js site
│   └── src/content/site.ts    # Edit site copy here
└── README.md
```

## Site (`web/`)

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Updating content

1. Edit `web/src/content/site.ts` for bio, experience, publications, highlights, awards.
2. Publication links use DOI and Google Scholar — paper PDFs stay in local `contextResources/papers/` (not published).
3. When CV or papers change in `contextResources/`, sync the relevant fields into `site.ts`.

### Deploy

Works on [Vercel](https://vercel.com) or any Node host. From `web/`:

```bash
npm run build
npm start
```

### Personal photos

Photos from `contextResources/photos/` are optimized into `web/public/photos/`. Paths and captions live in `personalPhotos` and `speakingPhotos` in `site.ts`.

| Used on site | Source folder |
|--------------|---------------|
| Hero headshot | `headshot/` |
| SNMMI award | `award/` |
| Conference talks | `presentation/` |
| Yale Ph.D. graduation | `graduation/` (portrait + outdoor with advisor) |

Skipped: crowded group graduation shots (`image copy.png`, `image copy 2.png`) — busy composition, less suitable for a portfolio.

### Research figures

Figures are extracted from manuscripts in `contextResources/papers/` and stored in `web/public/research/`. Captions and sources are in `researchGallery` in `site.ts`. To add more:

1. Place PNG/JPEG in `web/public/research/`
2. Add an entry to `researchGallery` (and optionally `image` on a highlight)

### Customization ideas

- **Headshot:** add `web/public/photo.jpg` and wire into `Hero.tsx` (not in context resources yet)
- **CV download:** export PDF to `web/public/cv.pdf`
- **Conference photos:** SNMMI award photos from LinkedIn/posts can go in `web/public/` for an awards section
