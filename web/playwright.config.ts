import { defineConfig } from "@playwright/test";
import { visualDeviceProjects } from "./tests/config/devices";

const PORT = process.env.PORT ?? "3000";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
      caret: "hide",
    },
  },
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["json", { outputFile: "test-results/results.json" }],
    ["./tests/reporters/device-matrix-reporter.ts"],
  ],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "off",
    video: "off",
  },
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/__snapshots__/{projectName}/{arg}{ext}",
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: process.env.CI
          ? "npm run build && npm run start"
          : "npm run start",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        stdout: "pipe",
        stderr: "pipe",
      },
  projects: visualDeviceProjects,
});
