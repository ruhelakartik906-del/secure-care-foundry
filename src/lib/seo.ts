import { absUrl } from "./site-url";

const defaultImage = "/favicon.png";

export type SeoOptions = {
  index?: boolean;
  follow?: boolean;
  canonical?: string | null | undefined;
  twitterTitle?: string | null | undefined;
  twitterDescription?: string | null | undefined;
  twitterImage?: string | null | undefined;
};

export const robotsContent = (index = true, follow = true) =>
  `${index ? "index" : "noindex"}, ${follow ? "follow" : "nofollow"}${index ? ", max-image-preview:large" : ""}`;

/** Keep titles near 60 chars by shortening the brand suffix / filler words. */
export const fitTitle = (t: string) => {
  let s = t.trim();
  if (s.endsWith(" - Unicare Medical Solutions")) return s; // user-chosen homepage title
  if (s.length > 60) s = s.replace(/ \| Unicare Medical Solutions$/, " | Unicare");
  if (s.length > 60) s = s.replace(" Manufacturer & Installation", " Manufacturer");
  if (s.length > 60) s = s.replace("Modular Operation Theatre", "Modular OT");
  if (s.length > 60) s = s.replace(/ \| Unicare$/, "");
  return s;
};
const DESC_CTA = " Contact Unicare Medical Solutions for design, installation and a project quote.";
/** Keep descriptions in the ~120–160 char range at word boundaries. */
export const fitDesc = (d: string) => {
  let s = (d || "").replace(/\s+/g, " ").trim();
  if (s.length < 120) {
    const ctas = [DESC_CTA, " Get design, installation and a quote from Unicare.", " Request a project quote today."];
    const fit = ctas.find((c) => (s + c).length <= 160);
    if (fit) s += fit;
  }
  if (s.length > 160) {
    const cut = s.slice(0, 158);
    const dot = cut.lastIndexOf(". ");
    s = dot > 110 ? cut.slice(0, dot + 1) : cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + ".";
  }
  return s;
};

export const seo = (rawTitle: string, rawDescription: string, path: string, type = "website", image = defaultImage, opts: SeoOptions = {}) => {
  const title = fitTitle(rawTitle);
  const description = fitDesc(rawDescription);
  const canonical = absUrl(opts.canonical || path);
  const img = absUrl(image || defaultImage);
  const tImg = absUrl(opts.twitterImage || image || defaultImage);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robotsContent(opts.index ?? true, opts.follow ?? true) },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: canonical },
      { property: "og:image", content: img },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.twitterTitle || title },
      { name: "twitter:description", content: opts.twitterDescription || description },
      { name: "twitter:image", content: tImg },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
};

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  type: "application/ld+json",
  children: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((i, idx) => ({ "@type": "ListItem", position: idx + 1, name: i.name, item: absUrl(i.path) })),
  }),
});
