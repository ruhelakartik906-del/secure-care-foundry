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
    expect(sitemapEntries().map((entry) => entry.path)).not.toContain("/blogs");
    expect(sitemapEntries().map((entry) => entry.path)).toEqual(staticPaths().filter((path) => !sitemapExcludedPaths.includes(path)));
  });
  it("does not fabricate page last-change dates", () => {
    expect(sitemapXml()).not.toContain("<lastmod>");
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