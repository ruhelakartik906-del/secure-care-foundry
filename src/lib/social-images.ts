import { getModularOtOption, getProduct } from "@/data/products";

export const homepageHero = "/images/modular-ot-hero.webp";

export function pageSocialSource(path: string) {
  const segments = path.split("/").filter(Boolean);
  if (segments[0] === "products") {
    if (segments[1] === "modular-operation-theatre" && segments[2]) {
      return getModularOtOption(segments[2])?.image ?? homepageHero;
    }
    // This product's detail page displays the homepage OT hero as its main photo.
    if (segments[1] === "modular-operation-theatre") return homepageHero;
    return getProduct(segments[1] ?? "")?.image ?? homepageHero;
  }
  return homepageHero;
}

export function socialImagePath(path: string) {
  const source = pageSocialSource(path);
  const filename = source.split("/").pop() ?? "modular-ot-hero.webp";
  return `/og/${filename.replace(/\.webp$/, "-1200x630.webp")}`;
}