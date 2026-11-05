import { site } from "@/data/site";
import type { Product, ModularOtOption } from "@/data/products";
import { absUrl } from "./site-url";
import { homepageHero } from "./social-images";

export const organizationId = `${absUrl("/")}#organization`;

export const indicativeOffers: Record<string, { lowPrice: number; highPrice: number }> = {
  "modular-operation-theatre": { lowPrice: 850000, highPrice: 3500000 },
  "laminar-air-flow": { lowPrice: 85000, highPrice: 250000 },
  "ot-pendant": { lowPrice: 30000, highPrice: 100000 },
  "medical-gas-pipeline-system": { lowPrice: 500000, highPrice: 3000000 },
};

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": organizationId,
  name: site.name,
  legalName: site.legalName,
  url: absUrl("/"),
  logo: absUrl("/logo-512.png"),
  image: absUrl(homepageHero),
  telephone: site.phone,
  email: site.email,
  contactPoint: [{ "@type": "ContactPoint", telephone: site.phone, email: site.email, contactType: "sales enquiries", areaServed: "IN" }],
  areaServed: "IN",
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30",
    closes: "18:30",
  }],
  address: [
    { "@type": "PostalAddress", streetAddress: "357, Malkhan Singh Complex, Opp. Ambedkar Bhawan, Dasna Road", addressLocality: "Ghaziabad", postalCode: "201001", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
    { "@type": "PostalAddress", streetAddress: "Plot No. B/260, Adarsh Nagar, Subedar Colony", addressLocality: "Ballabhgarh", postalCode: "121004", addressRegion: "Haryana", addressCountry: "IN" },
  ],
  // TODO: Add sameAs only after the company supplies verified LinkedIn, Facebook, IndiaMART and YouTube profile URLs.
  // TODO: foundingDate, founder and GSTIN require actual company-approved values.
});

export const localBusinessSchemas = () => organizationSchema().address.map((address, i) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${absUrl("/")}#${i === 0 ? "ghaziabad-office" : "faridabad-works"}`,
  name: `${site.name} – ${i === 0 ? "Ghaziabad office" : "Faridabad works"}`,
  parentOrganization: { "@id": organizationId },
  url: absUrl("/contact"),
  telephone: site.phone,
  email: site.email,
  address,
}));

export function serviceSchema(name: string, description: string, path: string, image: string) {
  return {
    "@context": "https://schema.org", "@type": "Service", name, description,
    url: absUrl(path), image: absUrl(image), serviceType: name,
    provider: { "@id": organizationId }, areaServed: "IN",
  };
}

export function productSchema(p: Product, path: string) {
  const range = indicativeOffers[p.slug];
  if (!range) return serviceSchema(p.name, p.short, path, p.image);
  return {
    "@context": "https://schema.org", "@type": "Product", name: p.name,
    description: `${p.short} Indicative pricing only; final quotation depends on project scope.`,
    category: p.category, url: absUrl(path), image: absUrl(p.slug === "modular-operation-theatre" ? homepageHero : p.image),
    brand: { "@type": "Brand", name: site.name },
    offers: { "@type": "AggregateOffer", ...range, priceCurrency: "INR", availability: "https://schema.org/InStock", url: absUrl(path) },
  };
}

export const variantFaqs = (option: ModularOtOption) => [
  { q: `What does a ${option.menuName} project include?`, a: "The final scope is prepared around room dimensions, selected panel system, airflow, doors, controls, medical gases and installation requirements." },
  { q: `How is ${option.menuName} pricing calculated?`, a: "Pricing depends on room size, material selection, equipment integration and site scope. We provide a project-specific quotation after reviewing your requirement." },
  { q: `How should we compare ${option.menuName} with other options?`, a: "Compare the complete assembly, not the material name alone. Review backing, supports, junctions, service access, cleaning compatibility and the repair or replacement method against the hospital's approved requirements." },
  { q: `How should ${option.menuName} surfaces be maintained?`, a: "Follow the offered material and finish supplier's cleaning instructions, inspect damaged surfaces and service junctions, and use an approved repair method. Material selection does not replace hospital infection-control procedures." },
  { q: `What is the lead time for ${option.menuName}?`, a: "Lead time is confirmed in the quotation after drawings, approvals and site readiness have been reviewed for the room scope." },
];