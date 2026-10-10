/**
 * Single source of truth for public URLs. Header, footer, homepage, related links
 * and the sitemap must build paths from these helpers so one page = one URL.
 * Convention: lowercase, hyphenated, no trailing slash (server 301s variants).
 */
import { cities, cityPath } from "@/data/cities";

export { cityPath };
export const productPath = (slug: string) => `/products/${slug}`;
export const otStatePath = (state: string) => `/modular-operation-theatre-manufacturers-in/${state}`;
export const mgpsStatePath = (state: string) => `/medical-gas-pipeline-manufacturers-in/${state}`;
export const compliancePath = (slug: string) => `/resources/compliance/${slug}`;
export const comparisonPath = (slug: string) => `/resources/comparisons/${slug}`;

export const routes = {
  home: "/",
  products: "/products",
  pricing: "/modular-ot-cost-india",
  locations: "/locations",
  resources: "/resources",
  compliance: "/resources/compliance",
  comparisons: "/resources/comparisons",
  faqs: "/faqs",
  contact: "/contact",
  quote: "/get-a-quote",
} as const;

export const priorityCityPaths = cities.map((c) => ({ name: c.name, url: cityPath(c) }));
