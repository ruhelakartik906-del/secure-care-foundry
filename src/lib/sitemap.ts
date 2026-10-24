import { staticPaths } from "./static-pages";
import { absUrl } from "./site-url";

// TODO: Supply company-confirmed, page-specific significant content-change dates.
// Never infer lastmod from generation/build time or filesystem modification times.
export const pageLastModified: Readonly<Record<string, string>> = {};

export function sitemapEntries() {
  return staticPaths().filter((path) => path !== "/blogs").map((path) => ({
    path,
    lastmod: pageLastModified[path],
  }));
}

const xmlEscape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function sitemapXml() {
  const body = sitemapEntries().map(({ path, lastmod }) => `\n  <url><loc>${xmlEscape(absUrl(path))}</loc>${lastmod ? `<lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}</url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}\n</urlset>\n`;
}