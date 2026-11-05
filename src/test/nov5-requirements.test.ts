import { describe, expect, it } from "vitest";
import { site } from "@/data/site";
import { blogs } from "@/data/blogs";
import { locations } from "@/data/locations";
import { stateServing } from "@/data/state-serving";
import { modularOtOptions } from "@/data/products";
import { variantFaqs, localBusinessSchemas } from "@/lib/structured-data";
import { planningFaqs, aboutFaqs } from "@/data/expansion-faqs";
import { getLongForm, productExtraSections } from "@/data/product-long-form";
import { existsSync, readFileSync } from "node:fs";

describe("November 5 company requirements", () => {
  it("uses the newly supplied public email without changing the enquiry destination", () => {
    expect(site.email).toBe("info@unicaremedicalsolutions.com");
    expect(readFileSync("src/components/site/EnquiryFormContent.tsx", "utf8")).toContain("https://formsubmit.co/ajax/unicaremedical2023@gmail.com");
  });
  it("keeps exactly the existing 24 locality entries with distinct survey guidance", () => {
    expect(locations).toHaveLength(24);
    expect(new Set(Object.values(stateServing).map((parts) => parts.join(" "))).size).toBe(24);
    for (const location of locations) {
      expect(stateServing[location.slug]?.length).toBe(2);
      if (location.slug !== "chandigarh") expect(location.cities.slice(0, 6).length).toBeGreaterThanOrEqual(5);
    }
    expect(stateServing.chandigarh?.join(" ")).toContain("outside Chandigarh");
  });
  it("publishes both requested new articles above 1200 words with product connections", () => {
    const cases = [["medical-gas-pipeline-hospitals-components-layout-safety", "medical-gas-pipeline-system"], ["plan-modular-icu-space-equipment-cost-factors", "modular-icu-nicu"]];
    for (const [slug, product] of cases) {
      const article = blogs.find((b) => b.slug === slug);
      expect(article?.sections.flatMap((s) => [s.heading ?? "", ...s.paragraphs]).join(" ").split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(1200);
      expect(article?.relatedProducts?.[0]).toBe(product);
      expect(article?.publishedAt).toBe("2026-11-05");
      expect(article?.image && existsSync(`public${article.image}`)).toBe(true);
    }
  });
  it("keeps five FAQ entries for each expanded variant and system and the About page", () => {
    expect(aboutFaqs).toHaveLength(5);
    for (const option of modularOtOptions) expect(variantFaqs(option)).toHaveLength(5);
    for (const faqs of Object.values(planningFaqs)) expect(faqs).toHaveLength(5);
  });
  it("does not add new content blocks to the protected Laminar Air Flow product", () => {
    expect(getLongForm("laminar-air-flow")).toBeUndefined();
    expect(productExtraSections["laminar-air-flow"]).toBeUndefined();
  });
  it("adds two genuine-address business entities without inventing founders or profiles", () => {
    const entities = localBusinessSchemas();
    expect(entities).toHaveLength(2);
    expect(entities.map((entity) => entity.address.addressLocality)).toEqual(["Ghaziabad", "Ballabhgarh"]);
    for (const entity of entities) {
      expect(entity.email).toBe("info@unicaremedicalsolutions.com");
      expect(entity).not.toHaveProperty("founder");
      expect(entity).not.toHaveProperty("sameAs");
    }
  });
});