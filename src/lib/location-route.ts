import { notFound } from "@tanstack/react-router";
import { getLocation } from "@/data/locations";
import { locationTitle, locationFaqs } from "@/components/site/LocationPage";
import { faqSchema } from "@/components/site/common";
import { seo, breadcrumbSchema } from "./seo";
import { getProduct } from "@/data/products";

export const makeLocationLoader = () => ({ params }: { params: { state: string } }) => {
  if (!getLocation(params.state)) throw notFound();
  return { state: params.state };
};

export const makeLocationHead = (productSlug: string, base: string) => ({ loaderData }: { loaderData?: { state: string } }) => {
  const l = loaderData && getLocation(loaderData.state);
  if (!l) return { meta: [{ title: "Location not found" }, { name: "robots", content: "noindex" }] };
  const title = locationTitle(productSlug, l);
  const product = getProduct(productSlug);
  if (!product) return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
  const path = `/${base}/${l.slug}`;
  const s = seo(`${title} | Unicare`, `${product.name} design, manufacturing and installation in ${l.name} — serving ${l.cities.slice(0, 4).join(", ")} and more.`, path);
  return { ...s, scripts: [breadcrumbSchema([{ name: "Locations", path: "/locations" }, { name: l.name, path }]), faqSchema(locationFaqs(productSlug, l))] };
};
