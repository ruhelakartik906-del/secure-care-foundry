import { describe, expect, it } from "vitest";
import { canIndexHost, guardIndexingHtml } from "@/lib/indexing-guard";
import { homeDefaults } from "@/data/home-content";
import { products, modularOtOptions } from "@/data/products";
import { responsiveImage } from "@/lib/responsive-images";
import { existsSync } from "node:fs";

describe("Duplicate-host indexing safeguards", () => {
  it("allows indexing only on the company-confirmed www host", () => {
    expect(canIndexHost("www.unicaremedicalsolutions.com")).toBe(true);
    for (const host of ["secure-care-foundry.lovable.app", "preview.lovable.app", "localhost", "unicaremedicalsolutions.com", "other.example"]) {
      expect(canIndexHost(host)).toBe(false);
    }
  });
  it("replaces SSR indexing directives on non-production hosts", () => {
    const html = '<html><head><meta content="index, follow" name="robots"></head><body></body></html>';
    expect(guardIndexingHtml(html, "secure-care-foundry.lovable.app")).toContain('<meta name="robots" content="noindex, follow">');
    expect(guardIndexingHtml(html, "preview.lovable.app")).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(guardIndexingHtml(html, "www.unicaremedicalsolutions.com")).toBe(html);
  });
  it("adds protection when a page has no robots tag", () => {
    expect(guardIndexingHtml("<html><head></head></html>", "other.example")).toContain('content="noindex, nofollow"');
  });
});

describe("Company-hosted image delivery", () => {
  it("uses existing local WebP files for every current product and homepage photo", () => {
    const images = [homeDefaults.heroImage, homeDefaults.otImage, homeDefaults.mgpsImage, ...products.map((p) => p.image), ...modularOtOptions.map((p) => p.image)];
    for (const image of images) {
      expect(image.startsWith("/images/")).toBe(true);
      expect(image.endsWith(".webp")).toBe(true);
      expect(existsSync(`public${image}`)).toBe(true);
      expect(existsSync(`public${responsiveImage(image).src}`)).toBe(true);
    }
  });
  it("removes the retired Hospital OT from shared card and enquiry options", () => {
    expect(modularOtOptions.map((p) => p.slug)).not.toContain("hospital-modular-ot");
  });
});