import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import server from "@/server";
import { hospitalOtPath, hospitalOtDestination } from "@/lib/retired-pages";
import { sitemapEntries } from "@/lib/sitemap";
import { modularOtOptions } from "@/data/products";
import { responsiveImage } from "@/lib/responsive-images";

const walk = (dir: string): string[] => readdirSync(dir).flatMap((file) => {
  const path = join(dir, file);
  return statSync(path).isDirectory() ? walk(path) : [path];
});

describe("Technical SEO requirements", () => {
  it("301 redirects every duplicate-host path to www without rendering or changing paths", async () => {
    for (const path of ["/", "/products/ot-pendant", "/unknown/path/", "/robots.txt", "/images/modular-ot-hero.webp", hospitalOtPath]) {
      for (const method of ["GET", "HEAD"]) {
        const response = await server.fetch(new Request(`https://secure-care-foundry.lovable.app${path}?source=test`, { method }), {}, {});
        expect(response.status).toBe(301);
        expect(response.headers.get("location")).toBe(`https://www.unicaremedicalsolutions.com${path}?source=test`);
        expect(await response.text()).toBe("");
      }
    }
  });
  it("permanently redirects Hospital OT to the main OT and retains the query", async () => {
    const response = await server.fetch(new Request(`https://www.unicaremedicalsolutions.com${hospitalOtPath}?source=test`), {}, {});
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe(`${hospitalOtDestination}?source=test`);
  });
  it("does not list retired or noindex pages in the sitemap", () => {
    const paths = sitemapEntries().map((entry) => entry.path);
    for (const path of [hospitalOtPath, "/search", "/page-not-found"]) expect(paths).not.toContain(path);
    expect(modularOtOptions.some((option) => option.slug === "hospital-modular-ot")).toBe(false);
  });
  it("sets the requested security headers even on redirects", async () => {
    const response = await server.fetch(new Request(`https://www.unicaremedicalsolutions.com${hospitalOtPath}`), {}, {});
    expect(response.headers.get("strict-transport-security")).toBe("max-age=31536000; includeSubDomains");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
  });
  it("keeps every served WebP under the requested byte limits", () => {
    const files = walk("public").filter((path) => path.endsWith(".webp"));
    expect(files.length).toBeGreaterThan(40);
    for (const file of files) expect(statSync(file).size, file).toBeLessThan(file.endsWith("/modular-ot-hero.webp") ? 200000 : 150000);
  });
  it("provides a real 768px source for every product photo", () => {
    for (const option of modularOtOptions) {
      const image = responsiveImage(option.image);
      expect(image.srcSet).toContain("-768.webp 768w");
      const path = image.srcSet?.split(" ")[0];
      expect(path).toBeTruthy();
      if (path) expect(readFileSync(`public${path}`).length).toBeGreaterThan(0);
    }
  });
});