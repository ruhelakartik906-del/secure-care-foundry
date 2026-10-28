import { describe, expect, it } from "vitest";
import { absUrl, SITE_URL } from "@/lib/site-url";
import { staticPaths } from "@/lib/static-pages";
import { sitemapEntries, sitemapXml, sitemapExcludedPaths } from "@/lib/sitemap";
import server from "@/server";

describe("Company-confirmed SEO host and sitemap policy", () => {
  it("uses only the www production host, preserving path conventions", () => {
    expect(SITE_URL).toBe("https://www.unicaremedicalsolutions.com");
    expect(absUrl("/")).toBe("https://www.unicaremedicalsolutions.com/");
    expect(absUrl("/products/laminar-air-flow")).toBe("https://www.unicaremedicalsolutions.com/products/laminar-air-flow");
  });
  it("excludes noindex and retired pages while keeping the Blogs listing hosted", () => {
    expect(staticPaths()).toContain("/blogs");
    expect(sitemapEntries().map((entry) => entry.path)).toContain("/blogs");
    expect(sitemapEntries().map((entry) => entry.path)).toEqual(staticPaths().filter((path) => !sitemapExcludedPaths.includes(path)));
  });
  it("records this revision's content changes without inventing dates for unchanged pages", () => {
    const entries = sitemapEntries();
    expect(entries.find((entry) => entry.path === "/products/modular-operation-theatre")?.lastmod).toBe("2026-10-24");
    expect(entries.find((entry) => entry.path === "/products/ot-pendant")?.lastmod).toBeUndefined();
    expect(sitemapXml()).toContain("<lastmod>2026-10-24</lastmod>");
  });
  it("redirects apex to www without changing path or query", async () => {
    const response = await server.fetch(new Request("https://unicaremedicalsolutions.com/products/laminar-air-flow?source=test"), {}, {});
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://www.unicaremedicalsolutions.com/products/laminar-air-flow?source=test");
  });
  it("retains search blocking and points robots at the www sitemap", async () => {
    const response = await server.fetch(new Request("https://www.unicaremedicalsolutions.com/robots.txt"), {}, {});
    const text = await response.text();
    expect(text).toContain("Disallow: /search");
    expect(text).toContain("Sitemap: https://www.unicaremedicalsolutions.com/sitemap.xml");
  });
});
import { productLongForm } from "@/data/product-long-form";
import { describe as d2, it as i2, expect as e2 } from "vitest";
d2("expanded product pages", () => {
  i2.each(Object.entries(productLongForm))("%s has 4-5 FAQs and 3 related products", (_slug, lf) => {
    e2(lf.faqs.length).toBeGreaterThanOrEqual(4);
    e2(lf.faqs.length).toBeLessThanOrEqual(5);
    e2(lf.related).toHaveLength(3);
  });
});
