import { absUrl } from "./site-url";

const defaultImage = "/favicon.png";

export type SeoOptions = {
  index?: boolean;
  follow?: boolean;
  canonical?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
};

export const robotsContent = (index = true, follow = true) =>
  `${index ? "index" : "noindex"}, ${follow ? "follow" : "nofollow"}${index ? ", max-image-preview:large" : ""}`;

export const seo = (title: string, description: string, path: string, type = "website", image = defaultImage, opts: SeoOptions = {}) => {
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
