import { cities, cityPath } from "@/data/cities";
import { compliance, comparisons } from "@/data/resources";
import { products, modularOtOptions } from "@/data/products";
import { locations } from "@/data/locations";

/** Every public page of the static site — drives prerendering and sitemap.xml. */
export function staticPaths(): string[] {
  const entries = new Map<string, string | undefined>();
  const add = (path: string) => { entries.set(path, undefined); };
  ["/", "/products", "/about", "/contact", "/locations", "/privacy-policy", "/disclaimer", "/terms-and-conditions", "/sitemap", "/solutions", "/get-a-quote", "/modular-ot-wall-panels", "/modular-ot-ceiling", "/operation-theatre-hvac-system", "/hepa-filtration-system-for-operation-theatre", "/modular-ot-doors", "/operation-theatre-electrical-system", "/modular-ot-cost-india", "/resources", "/resources/compliance", "/resources/comparisons", "/faqs"].forEach((p) => add(p));
  products.forEach((p) => add(`/products/${p.slug}`));
  modularOtOptions.forEach((p) => add(`/products/modular-operation-theatre/${p.slug}`));
  cities.forEach((c) => add(cityPath(c)));
  compliance.forEach((r) => add(`/resources/compliance/${r.slug}`));
  comparisons.forEach((r) => add(`/resources/comparisons/${r.slug}`));
  locations.forEach((l) => { add(`/modular-operation-theatre-manufacturers-in/${l.slug}`); add(`/medical-gas-pipeline-manufacturers-in/${l.slug}`); });
  return [...entries.keys()];
}
