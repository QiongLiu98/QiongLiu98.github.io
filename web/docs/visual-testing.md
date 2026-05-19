# Visual / responsive testing

Automated layout checks across **9 device profiles** and **8 routes** using [Playwright](https://playwright.dev/).

## Device profiles

| Project | Viewport / device |
|---------|-------------------|
| `desktop-1920` | 1920×1080 (Chrome) |
| `desktop-1280` | 1280×720 (Chrome) |
| `laptop-1440` | 1440×900 (Chrome) |
| `tablet-ipad-pro` | iPad Pro 11 |
| `tablet-ipad-mini` | iPad Mini |
| `mobile-iphone-14` | iPhone 14 |
| `mobile-iphone-se` | iPhone SE |
| `mobile-pixel-7` | Pixel 7 |
| `mobile-galaxy-s9` | Galaxy S9+ |

## Routes tested

- `/` (home)
- `/research`, `/research/attr-parametric-pet`
- `/publications`, `/cv`
- `/blog`, `/blog/snmmi-2025-young-investigator`
- `/contact`
- Floating contact bar (scrolled) on home, research, blog

## Commands

From the `web/` directory:

```bash
# Install Chromium only (all device profiles emulate viewports in Chromium)
npx playwright install chromium

# Build site and run all visual tests
npm run test:visual

# Accept new/changed screenshots as baselines (after intentional UI changes)
npm run test:visual:update

# Interactive debugger
npm run test:visual:ui

# Open HTML test report
npm run test:visual:report

# Open device matrix gallery (all screenshots in one grid)
npm run test:visual:matrix
```

If the dev server is already running (`npm run start` after `npm run build`):

```bash
PLAYWRIGHT_SKIP_WEBSERVER=1 npm run test:visual
```

## Baselines & reports

- **Snapshots (baselines):** `tests/visual/__snapshots__/{device}/{page}.png`  
  Commit these to track layout over time and catch regressions in CI (~99 PNGs, ~50MB total for all devices).

- **Reduce scope locally:** `npm run test:visual -- --project=mobile-iphone-14`

- **Playwright HTML report:** `playwright-report/` (diffs on failure)

- **Device matrix:** `visual-report/index.html` — grid of every page × device

## Workflow after UI changes

1. Make design changes locally.
2. Run `npm run build && npm run test:visual:update`.
3. Review new PNGs in `tests/visual/__snapshots__/`.
4. Open `visual-report/index.html` to scan the full matrix.
5. Commit updated snapshots with your PR.

## CI

GitHub Actions runs `npm run test:visual` on push/PR. Failed runs upload reports as artifacts.

## Adding a route or device

- **Route:** add to `tests/config/routes.ts`
- **Device:** add to `tests/config/devices.ts` and `deviceLabels`

Then run `npm run test:visual:update` to generate new baselines.
