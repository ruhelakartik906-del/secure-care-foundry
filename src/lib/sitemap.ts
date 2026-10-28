import { staticPaths } from "./static-pages";
import { absUrl } from "./site-url";
import { hospitalOtPath } from "./retired-pages";

// Production page indexing policy; preview-host noindex must not empty this sitemap.
export const sitemapExcludedPaths: readonly string[] = ["/search", "/page-not-found", hospitalOtPath];

// TODO: Supply company-confirmed, page-specific significant content-change dates for remaining pages.
// Never infer lastmod from generation/build time or filesystem modification times.
// These pages gained new internal navigation content in the October 24 technical SEO revision.
export const pageLastModified: Readonly<Record<string, string>> = {
  "/products/modular-operation-theatre": "2026-10-24",
  "/modular-ot-wall-panels": "2026-10-24",
  "/modular-ot-ceiling": "2026-10-24",
  "/operation-theatre-hvac-system": "2026-10-24",
  "/hepa-filtration-system-for-operation-theatre": "2026-10-24",
  "/modular-ot-doors": "2026-10-24",
  "/operation-theatre-electrical-system": "2026-10-24",
  "/products/cubicle-curtain-system": "2026-10-28",
  "/products/led-surgical-light": "2026-10-28",
  "/products/hospital-furniture": "2026-10-28",
  "/products/pass-box": "2026-10-28",
  "/products/medical-gas-pipeline-system": "2026-10-28",
  "/products/bed-head-panel": "2026-10-28",
  "/products/surgical-scrub-sink-station": "2026-10-28",
  "/products/manifold-room-system": "2026-10-28",
  "/products/agss": "2026-10-28",
  "/products/cssd-systems": "2026-10-28",
  "/products/oxygen-outlet": "2026-10-28",
  "/mgps-cost-india": "2026-10-28",
  "/blogs": "2026-10-28",
  "/blogs/what-is-cssd-hospital-sterilisation-department-guide": "2026-10-28",
  "/blogs/dynamic-vs-static-pass-box": "2026-10-28",
};

export function sitemapEntries() {
  return staticPaths().filter((path) => !sitemapExcludedPaths.includes(path)).map((path) => ({
    path,
    lastmod: pageLastModified[path],
  }));
}

const xmlEscape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function sitemapXml() {
  const body = sitemapEntries().map(({ path, lastmod }) => `\n  <url><loc>${xmlEscape(absUrl(path))}</loc>${lastmod ? `<lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}</url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}\n</urlset>\n`;
}