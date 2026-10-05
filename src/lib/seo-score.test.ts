import { describe, expect, it } from "vitest";
import { analyzeSeo, slugify } from "./seo-score";

const base = { title: "", seoTitle: "", metaDescription: "", slug: "", focusKeyword: "", html: "", canonical: "", featuredImage: "", featuredAlt: "", schemaType: "BlogPosting" };

describe("seo checker", () => {
  it("flags a duplicate SEO title", () => {
    const r = analyzeSeo({ ...base, seoTitle: "Modular OT Cost", otherTitles: ["modular ot cost"] });
    expect(r.checks.find((c) => c.id === "dup-title")?.status).toBe("bad");
  });
  it("detects focus keyword in slug", () => {
    const r = analyzeSeo({ ...base, focusKeyword: "modular ot cost", slug: "modular-ot-cost-in-india" });
    expect(r.checks.find((c) => c.id === "kw-slug")?.status).toBe("good");
  });
  it("scores between 0 and 100", () => {
    const r = analyzeSeo(base);
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThan(50);
  });
});

describe("slugify", () => {
  it("builds clean blog slugs from titles", () => {
    expect(slugify("Modular Operation Theatre Cost in India!")).toBe("modular-operation-theatre-cost-in-india");
  });
});
