import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { cities, cityPath } from "@/data/cities";
import { stateParagraphs, locationFaqs } from "@/components/site/LocationPage";
import { stateOtExtra } from "@/data/state-ot-extra";
import { sitemapEntries } from "@/lib/sitemap";

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

describe("November 24 local pages", () => {
  it("gives every state page at least 200 state-specific words, with no paragraph shared between its OT and MGPS pages", () => {
    for (const l of locations) {
      const x = stateOtExtra[l.slug]!;
      const ot = [...stateParagraphs("modular-operation-theatre", l).paragraphs, x.mix, x.needs, x.extra ?? "", x.local ?? "", x.site, x.steps];
      const mg = stateParagraphs("medical-gas-pipeline-system", l).paragraphs;
      expect(words(ot.join(" ")), l.slug).toBeGreaterThanOrEqual(300);
      expect(words(mg.join(" "))).toBeGreaterThanOrEqual(200);
      expect(ot.filter((p) => mg.includes(p))).toEqual([]);
    }
  });
  it("gives every modular OT state page four FAQs, with no question repeated across states", () => {
    const qs = locations.flatMap((l) => { const f = locationFaqs("modular-operation-theatre", l); expect(f).toHaveLength(4); return f.map((q) => q.q); });
    expect(new Set(qs).size).toBe(qs.length);
  });
  it("publishes the eight requested new local pages with four FAQs and sitemap dates", () => {
    const wanted = ["/modular-ot-manufacturer-faridabad", "/modular-ot-manufacturer-noida", "/modular-ot-manufacturer-gurgaon", "/medical-gas-pipeline-ghaziabad", "/modular-ot-manufacturer-lucknow", "/modular-ot-manufacturer-meerut", "/modular-ot-manufacturer-patna", "/medical-gas-pipeline-noida"];
    const sm = sitemapEntries();
    for (const path of wanted) {
      const c = cities.find((x) => cityPath(x) === path);
      expect(c).toBeDefined();
      expect(c!.title!.length).toBeLessThan(60);
      expect(c!.description!.length).toBeGreaterThanOrEqual(140);
      expect(c!.description!.length).toBeLessThanOrEqual(155);
      expect(sm.find((e) => e.path === path)?.lastmod).toBe("2026-11-24");
    }
  });
  it("gives all 15 city pages at least four local FAQs", () => {
    expect(cities).toHaveLength(15);
    for (const c of cities) expect(c.faqs.length).toBeGreaterThanOrEqual(4);
  });
});
