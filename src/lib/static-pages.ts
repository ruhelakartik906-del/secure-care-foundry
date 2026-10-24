import { cities, cityPath } from "@/data/cities";
import { compliance, comparisons } from "@/data/resources";
import { products, modularOtOptions } from "@/data/products";
import { locations } from "@/data/locations";
import { blogs } from "@/data/blogs";
import { blogPath, routes } from "@/lib/routes";
import { publicRoutePaths } from "./public-route-paths";

/** Every public page of the static site — drives prerendering and sitemap.xml. */
export function staticPaths(routePaths: readonly string[] = publicRoutePaths): string[] {
  const entries = new Map<string, string | undefined>();
  const add = (path: string) => { entries.set(path, undefined); };
  routePaths.forEach((p) => add(p));
  products.forEach((p) => add(`/products/${p.slug}`));
  add(routes.blogs);
  blogs.forEach((blog) => add(blogPath(blog.slug)));
  modularOtOptions.forEach((p) => add(`/products/modular-operation-theatre/${p.slug}`));
  cities.forEach((c) => add(cityPath(c)));
  compliance.forEach((r) => add(`/resources/compliance/${r.slug}`));
  comparisons.forEach((r) => add(`/resources/comparisons/${r.slug}`));
  locations.forEach((l) => { add(`/modular-operation-theatre-manufacturers-in/${l.slug}`); add(`/medical-gas-pipeline-manufacturers-in/${l.slug}`); });
  return [...entries.keys()];
}
