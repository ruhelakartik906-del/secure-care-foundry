import { describe, expect, it } from "vitest";
import { sitemapEntries } from "@/lib/sitemap";
import { getProduct } from "@/data/products";
import { getSystemPage } from "@/data/systems";
import { getLongForm, productExtraSections, variantSections } from "@/data/product-long-form";

const newPages = ["/products/ot-table", "/modular-ot-flooring", "/ot-accessories", "/digital-operation-theatre", "/services/hospital-project-consulting"];

describe("October 28 company content brief", () => {
  it.each(newPages)("lists %s in the sitemap with the 2026-10-28 lastmod", (path) => {
    const entry = sitemapEntries().find((e) => e.path === path);
    expect(entry).toBeDefined();
    expect(entry?.lastmod).toBe("2026-10-28");
  });
  it("adds the OT table product with its three requested related products", () => {
    expect(getProduct("ot-table")?.related).toEqual(["led-surgical-light", "ot-pendant", "modular-operation-theatre"]);
  });
  it("leaves the laminar air flow page without long-form or extra sections", () => {
    expect(getLongForm("laminar-air-flow")).toBeUndefined();
    expect(productExtraSections["laminar-air-flow"]).toBeUndefined();
  });
  it("replaces the AGSS body while keeping its FAQs", () => {
    const agss = getLongForm("agss");
    expect(agss?.body?.length).toBeGreaterThan(0);
    expect(agss?.faqs.length).toBeGreaterThanOrEqual(4);
  });
  it("adds the supplied panel sections to the PPGI and stainless variant pages", () => {
    expect(variantSections["ppgi-modular-ot"]?.some((b) => b.kind === "h2" && b.text === "PPGI / GI sandwich PUF panels")).toBe(true);
    expect(variantSections["stainless-steel-modular-ot"]?.some((b) => b.kind === "h2" && b.text === "Stainless steel sandwich PUF panels")).toBe(true);
  });
  it("creates the three new system pages with body content", () => {
    for (const path of ["/modular-ot-flooring", "/ot-accessories", "/digital-operation-theatre"] as const) {
      expect(getSystemPage(path).body?.length).toBeGreaterThan(0);
    }
  });
});
