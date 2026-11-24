import { staticPaths } from "./static-pages";
import { absUrl } from "./site-url";
import { hospitalOtPath } from "./retired-pages";
import { locations } from "@/data/locations";
import { modularOtOptions } from "@/data/products";
import { cities, cityPath } from "@/data/cities";

// Production page indexing policy; preview-host noindex must not empty this sitemap.
export const sitemapExcludedPaths: readonly string[] = ["/search", "/page-not-found", hospitalOtPath];

// TODO: Supply company-confirmed, page-specific significant content-change dates for remaining pages.
// Never infer lastmod from generation/build time or filesystem modification times.
// These pages gained new internal navigation content in the October 24 technical SEO revision.
export const pageLastModified: Readonly<Record<string, string>> = {
  // Pages changed or created in the October 28 company content brief.
  "/products/modular-operation-theatre": "2026-10-28",
  "/modular-ot-wall-panels": "2026-10-28",
  "/modular-ot-ceiling": "2026-10-28",
  "/operation-theatre-hvac-system": "2026-10-28",
  "/hepa-filtration-system-for-operation-theatre": "2026-10-24",
  "/modular-ot-doors": "2026-10-28",
  "/operation-theatre-electrical-system": "2026-10-28",
  "/products/hermetic-ot-door": "2026-10-28",
  "/products/ot-pendant": "2026-10-28",
  "/products/ot-table": "2026-10-28",
  "/modular-ot-flooring": "2026-10-28",
  "/ot-accessories": "2026-10-28",
  "/digital-operation-theatre": "2026-10-28",
  "/services/hospital-project-consulting": "2026-10-28",
  "/about": "2026-10-28",
  "/products/modular-operation-theatre/ppgi-modular-ot": "2026-10-28",
  "/products/modular-operation-theatre/stainless-steel-modular-ot": "2026-10-28",
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
  // Dates of the last commit that changed each page's own content (git history).
  "/disclaimer": "2026-10-04", "/privacy-policy": "2026-10-04", "/terms-and-conditions": "2026-10-04",
  "/faqs": "2026-10-28", "/get-a-quote": "2026-10-28", "/locations": "2026-10-28", "/products": "2026-10-28",
  "/sitemap": "2026-10-28", "/solutions": "2026-10-28", "/resources": "2026-10-10",
  "/products/laminar-air-flow": "2026-10-22",
  ...Object.fromEntries(["nabh-guidelines-modular-ot", "mgps-standards", "htm-02-01", "nfpa-99", "iso-13485", "cdsco-mdr-2017", "iec-60601-2-41-surgical-lights"].map((s) => [`/resources/compliance/${s}`, "2026-10-08"])),
  ...Object.fromEntries(["modular-ot-vs-conventional-ot", "puf-vs-hpl-ot-panels", "laf-vs-conventional-hvac", "single-arm-vs-double-arm-ot-pendant", "indian-vs-imported-surgical-lights"].map((s) => [`/resources/comparisons/${s}`, "2026-10-08"])),
  // Significant editorial updates made on November 5; not derived from build time.
  ...Object.fromEntries([
    "/", "/about", "/contact", "/products/medical-gas-pipeline-system", "/products/modular-icu-nicu", "/modular-ot-cost-india", "/modular-ot-flooring", "/digital-operation-theatre", "/hepa-filtration-system-for-operation-theatre",
    "/resources/compliance", "/resources/comparisons", "/blogs",
    "/blogs/medical-gas-pipeline-hospitals-components-layout-safety", "/blogs/plan-modular-icu-space-equipment-cost-factors",
    ...modularOtOptions.map((option) => `/products/modular-operation-theatre/${option.slug}`),
    ...locations.flatMap((location) => [`/modular-operation-theatre-manufacturers-in/${location.slug}`, `/medical-gas-pipeline-manufacturers-in/${location.slug}`]),
    ...cities.map(cityPath),
  ].map((path) => [path, "2026-11-05"])),
  // November 23: modular OT keyword links and state-led titles/H1s.
  ...Object.fromEntries([
    "/", "/products/modular-operation-theatre",
    ...locations.flatMap((location) => [`/modular-operation-theatre-manufacturers-in/${location.slug}`, `/medical-gas-pipeline-manufacturers-in/${location.slug}`]),
    ...cities.map(cityPath),
  ].map((path) => [path, "2026-11-23"])),
  // November 24: state-specific rewrites, expanded and new local city pages.
  ...Object.fromEntries([
    "/locations", "/sitemap", "/resources/compliance", "/resources/comparisons",
    ...["nabh-guidelines-modular-ot", "mgps-standards", "htm-02-01", "nfpa-99", "iso-13485", "cdsco-mdr-2017", "iec-60601-2-41-surgical-lights"].map((s) => `/resources/compliance/${s}`),
    ...["modular-ot-vs-conventional-ot", "puf-vs-hpl-ot-panels", "laf-vs-conventional-hvac", "single-arm-vs-double-arm-ot-pendant", "indian-vs-imported-surgical-lights"].map((s) => `/resources/comparisons/${s}`),
    ...locations.flatMap((location) => [`/modular-operation-theatre-manufacturers-in/${location.slug}`, `/medical-gas-pipeline-manufacturers-in/${location.slug}`]),
    ...cities.map(cityPath),
  ].map((path) => [path, "2026-11-24"])),
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