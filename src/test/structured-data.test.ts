import { describe, expect, it } from "vitest";
import { products, modularOtOptions } from "@/data/products";
import { organizationSchema, productSchema, serviceSchema } from "@/lib/structured-data";
import { socialImagePath } from "@/lib/social-images";
import { staticPaths } from "@/lib/static-pages";
import { existsSync, readFileSync } from "node:fs";

describe("Company-supplied Task 3 schema rules", () => {
  const ranges = [
    ["modular-operation-theatre", 850000, 3500000],
    ["laminar-air-flow", 85000, 250000],
    ["ot-pendant", 30000, 100000],
    ["medical-gas-pipeline-system", 500000, 3000000],
  ] as const;
  it.each(ranges)("uses the supplied indicative INR offer for %s", (slug, lowPrice, highPrice) => {
    const p = products.find((item) => item.slug === slug);
    if (!p) throw new Error(`Missing product ${slug}`);
    const schema = productSchema(p, `/products/${slug}`);
    expect(schema["@type"]).toBe("Product");
    expect(schema).toHaveProperty("offers", {
      "@type": "AggregateOffer", lowPrice, highPrice, priceCurrency: "INR",
      availability: "https://schema.org/InStock", url: `https://www.unicaremedicalsolutions.com/products/${slug}`,
    });
  });
  it.each(products.filter((p) => !ranges.some(([slug]) => slug === p.slug)))("uses Service for unpriced $slug", (p) => {
    const schema = productSchema(p, `/products/${p.slug}`);
    expect(schema["@type"]).toBe("Service");
    expect(schema).toHaveProperty("provider", { "@id": "https://www.unicaremedicalsolutions.com/#organization" });
    expect(schema).toHaveProperty("areaServed", "IN");
    expect(schema).toHaveProperty("serviceType", p.name);
    expect(schema).not.toHaveProperty("offers");
    expect(schema).not.toHaveProperty("aggregateRating");
  });
  it.each(modularOtOptions)("uses Service for the unpriced $slug variant", (o) => {
    expect(serviceSchema(o.name, o.description, `/products/modular-operation-theatre/${o.slug}`, o.image)["@type"]).toBe("Service");
  });
  it("preserves the supplied organization facts and both addresses", () => {
    const org = organizationSchema();
    expect(org["@type"]).toEqual(["Organization", "LocalBusiness"]);
    expect(org.legalName).toBe("Unicare Medical Solutions");
    expect(org.telephone).toBe("+91-7678443838");
    expect(org.email).toBe("unicaremedical2023@gmail.com");
    expect(org.address.map((a) => a.addressLocality)).toEqual(["Ghaziabad", "Ballabhgarh"]);
    expect(org.openingHoursSpecification[0]).toEqual({ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "18:30" });
    expect(org).not.toHaveProperty("sameAs");
  });
  it("has a real 1200×630 WebP crop for every static page", () => {
    for (const path of staticPaths()) {
      const image = socialImagePath(path);
      expect(existsSync(`public${image}`), image).toBe(true);
      const data = readFileSync(`public${image}`);
      expect(data.toString("ascii", 0, 4)).toBe("RIFF");
      // PIL-generated WebP VP8: frame width/height are little-endian at offsets 26/28.
      expect(data.toString("ascii", 12, 16)).toBe("VP8 ");
      expect(data.readUInt16LE(26) & 0x3fff).toBe(1200);
      expect(data.readUInt16LE(28) & 0x3fff).toBe(630);
    }
    expect(socialImagePath("/products/ot-pendant")).toBe("/og/ot-pendant-1200x630.webp");
    expect(socialImagePath("/modular-operation-theatre-manufacturers-in/assam")).toBe("/og/modular-ot-hero-1200x630.webp");
  });
});