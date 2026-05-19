import fs from "node:fs";
import path from "node:path";
import type { FullConfig, FullResult, Reporter } from "@playwright/test/reporter";
import { deviceLabels } from "../config/devices";
import { visualRoutes } from "../config/routes";

type SnapshotEntry = {
  route: string;
  device: string;
  deviceLabel: string;
  filePath: string;
  relPath: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function collectSnapshots(rootDir: string): SnapshotEntry[] {
  const snapRoot = path.join(rootDir, "tests/visual/__snapshots__");
  if (!fs.existsSync(snapRoot)) return [];

  const entries: SnapshotEntry[] = [];

  for (const device of fs.readdirSync(snapRoot)) {
    const deviceDir = path.join(snapRoot, device);
    if (!fs.statSync(deviceDir).isDirectory()) continue;

    for (const file of fs.readdirSync(deviceDir)) {
      if (!file.endsWith(".png")) continue;
      const route = file.replace(/\.png$/, "");
      const filePath = path.join(deviceDir, file);
      entries.push({
        route,
        device,
        deviceLabel: deviceLabels[device] ?? device,
        filePath,
        relPath: `../tests/visual/__snapshots__/${device}/${file}`,
      });
    }
  }

  return entries.sort(
    (a, b) =>
      a.route.localeCompare(b.route) || a.device.localeCompare(b.device),
  );
}

class DeviceMatrixReporter implements Reporter {
  private rootDir = "";

  onBegin(config: FullConfig) {
    this.rootDir = config.configFile
      ? path.dirname(config.configFile)
      : config.rootDir;
  }

  onEnd(result: FullResult) {
    const outputDir = path.join(this.rootDir, "visual-report");
    fs.mkdirSync(outputDir, { recursive: true });

    const snapshots = collectSnapshots(this.rootDir);
    const devices = [...new Set(snapshots.map((s) => s.device))].sort();
    const routeOrder = [
      ...visualRoutes.map((r) => r.name),
      "floating-contact-home",
      "floating-contact-research",
      "floating-contact-blog",
    ];
    const routes = [
      ...routeOrder.filter((r) => snapshots.some((s) => s.route === r)),
      ...new Set(snapshots.map((s) => s.route).filter((r) => !routeOrder.includes(r))),
    ];

    const lookup = new Map(
      snapshots.map((s) => [`${s.route}::${s.device}`, s]),
    );

    const rows = routes
      .map((route) => {
        const cells = devices
          .map((device) => {
            const snap = lookup.get(`${route}::${device}`);
            if (!snap) {
              return `<td class="cell missing"><span class="meta">${escapeHtml(deviceLabels[device] ?? device)}</span>—</td>`;
            }
            return `<td class="cell">
              <div class="meta">${escapeHtml(snap.deviceLabel)}</div>
              <a href="${snap.relPath}" target="_blank" rel="noopener">
                <img src="${snap.relPath}" alt="${escapeHtml(route)} on ${escapeHtml(device)}" loading="lazy" />
              </a>
            </td>`;
          })
          .join("");
        return `<tr><th scope="row">${escapeHtml(route)}</th>${cells}</tr>`;
      })
      .join("");

    const deviceHeaders = devices
      .map((d) => `<th>${escapeHtml(deviceLabels[d] ?? d)}</th>`)
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Responsive visual matrix</title>
  <style>
    :root { --ink: #1a1614; --paper: #f7f1e3; --warm: #a8462c; --rule: #e8debf; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; background: var(--paper); color: var(--ink); }
    header { padding: 2rem; border-bottom: 1px solid var(--rule); }
    h1 { margin: 0 0 0.5rem; font-size: 1.5rem; }
    .sub { margin: 0; color: #6b5f52; font-size: 0.9rem; }
    .wrap { overflow-x: auto; padding: 1rem 1rem 3rem; }
    table { border-collapse: collapse; width: max-content; min-width: 100%; }
    th, td { border: 1px solid var(--rule); vertical-align: top; padding: 0.5rem; }
    thead th { background: #fbf6e8; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; max-width: 300px; }
    tbody th { text-align: left; position: sticky; left: 0; background: #fbf6e8; z-index: 1; font-size: 0.85rem; white-space: nowrap; }
    .cell img { display: block; max-width: 260px; width: 100%; height: auto; border: 1px solid var(--rule); }
    .meta { font-size: 0.65rem; color: #6b5f52; margin-bottom: 0.35rem; }
    .missing { color: #8b7e6f; text-align: center; }
    .badge { display: inline-block; margin-top: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.75rem; background: #e7eef4; }
  </style>
</head>
<body>
  <header>
    <h1>Responsive visual matrix</h1>
    <p class="sub">Generated ${new Date().toISOString()} · ${snapshots.length} snapshots · Run status: <strong>${result.status}</strong></p>
    <span class="badge">${devices.length} devices × ${routes.length} views</span>
  </header>
  <div class="wrap">
    <table>
      <thead><tr><th>Page / state</th>${deviceHeaders}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
</body>
</html>`;

    const outFile = path.join(outputDir, "index.html");
    fs.writeFileSync(outFile, html);

    console.log(`\n📱 Device matrix report: ${outFile}\n`);
  }
}

export default DeviceMatrixReporter;
