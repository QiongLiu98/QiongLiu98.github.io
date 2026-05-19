import { test, expect } from "@playwright/test";

/** Floating contact bar appears after scroll — capture that state on key pages. */
test.describe("Floating contact bar (scrolled)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  for (const path of ["/", "/research", "/blog"]) {
    test(`contact bar visible — ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      await page.evaluate(() => window.scrollTo(0, 600));
      await page.waitForTimeout(600);
      await expect(page).toHaveScreenshot(
        `floating-contact-${path === "/" ? "home" : path.slice(1).replace(/\//g, "-")}.png`,
        { fullPage: false },
      );
    });
  }
});
