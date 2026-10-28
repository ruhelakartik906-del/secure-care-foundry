import { describe, expect, it } from "vitest";
import { htmlSitemap } from "@/lib/html-sitemap";
import { sitemapEntries } from "@/lib/sitemap";
import { locations, locationLead } from "@/data/locations";
import { blogs } from "@/data/blogs";

describe("October 28 site fixes", () => {
  it("HTML sitemap lists exactly the sitemap.xml URLs", () => {
    const html = htmlSitemap().flatMap((g) => g.links.map((l) => l.path)).sort();
    expect(html).toEqual(sitemapEntries().map((e) => e.path).sort());
  });
  it("state intros never say 'is with'", () => {
    for (const l of locations) expect(locationLead(l)).not.toMatch(/\bis with\b/);
    expect(locationLead(locations.find((l) => l.slug === "kerala")!)).toMatch(/^Kerala has a high density of hospitals/);
  });
  it("blog titles are at most 60 characters and excerpts 140-155", () => {
    for (const b of blogs) {
      expect(b.title.length).toBeLessThanOrEqual(60);
      expect(b.excerpt.length).toBeGreaterThanOrEqual(140);
      expect(b.excerpt.length).toBeLessThanOrEqual(155);
    }
  });
});
