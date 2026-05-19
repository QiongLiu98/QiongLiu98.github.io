import { test, expect } from "@playwright/test";
import { visualRoutes } from "../config/routes";

test.describe("Page layout snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  for (const route of visualRoutes) {
    test(`${route.name} @ ${route.path}`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });
      await page.waitForLoadState("domcontentloaded");
      // Allow web fonts and hero images to settle
      await page.waitForTimeout(400);
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
      });
    });
  }
});
