import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

type DeviceKey = keyof typeof devices;

/** Use Chromium for all profiles so only `npx playwright install chromium` is required. */
function chromiumDevice(name: string, deviceKey: DeviceKey) {
  const device = devices[deviceKey];
  return {
    name,
    use: {
      browserName: "chromium" as const,
      viewport: device.viewport,
      userAgent: device.userAgent,
      deviceScaleFactor: device.deviceScaleFactor,
      isMobile: device.isMobile,
      hasTouch: device.hasTouch,
      defaultBrowserType: "chromium" as const,
    },
  };
}

/**
 * Device / viewport profiles for visual regression.
 * Each becomes a Playwright "project" with its own snapshot folder suffix.
 */
export const visualDeviceProjects: NonNullable<
  PlaywrightTestConfig["projects"]
> = [
  {
    name: "desktop-1920",
    use: {
      browserName: "chromium",
      viewport: { width: 1920, height: 1080 },
    },
  },
  {
    name: "desktop-1280",
    use: {
      browserName: "chromium",
      viewport: { width: 1280, height: 720 },
    },
  },
  {
    name: "laptop-1440",
    use: {
      browserName: "chromium",
      viewport: { width: 1440, height: 900 },
    },
  },
  chromiumDevice("tablet-ipad-pro", "iPad Pro 11"),
  chromiumDevice("tablet-ipad-mini", "iPad Mini"),
  chromiumDevice("mobile-iphone-14", "iPhone 14"),
  chromiumDevice("mobile-iphone-se", "iPhone SE"),
  chromiumDevice("mobile-pixel-7", "Pixel 7"),
  chromiumDevice("mobile-galaxy-s9", "Galaxy S9+"),
];

export const deviceLabels: Record<string, string> = {
  "desktop-1920": "Desktop · 1920×1080",
  "desktop-1280": "Desktop · 1280×720",
  "laptop-1440": "Laptop · 1440×900",
  "tablet-ipad-pro": "iPad Pro 11",
  "tablet-ipad-mini": "iPad Mini",
  "mobile-iphone-14": "iPhone 14",
  "mobile-iphone-se": "iPhone SE",
  "mobile-pixel-7": "Pixel 7",
  "mobile-galaxy-s9": "Galaxy S9+",
};
