import { describe, expect, it } from "vitest";
import { sitemapEntries } from "@/lib/sitemap";
import { pageSeo } from "@/data/page-seo";
import { locations } from "@/data/locations";
import { locationTitle } from "@/components/site/LocationPage";

describe("November 23 SEO rules", () => {
  it("every sitemap URL has a lastmod", () => {
    expect(sitemapEntries().filter((e) => !e.lastmod)).toEqual([]);
  });
  it("main modular OT page uses the requested title and H1", () => {
    expect(pageSeo["/products/modular-operation-theatre"]?.title).toBe("Modular Operation Theatre Manufacturers & Suppliers");
    expect(pageSeo["/products/modular-operation-theatre"]?.h1).toBe("Modular Operation Theatre Manufacturers & Suppliers in India");
  });
  it("state modular OT titles start with the state name", () => {
    for (const l of locations) expect(locationTitle("modular-operation-theatre", l).startsWith(l.name)).toBe(true);
    const up = locations.find((l) => l.slug === "uttar-pradesh");
    expect(up && `${locationTitle("modular-operation-theatre", up)} | Unicare`).toBe("Uttar Pradesh Modular OT Manufacturers | Unicare");
  });
});
