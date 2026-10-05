const defaultImage = "/favicon.png";

export const seo = (title: string, description: string, path: string, type = "website", image = defaultImage) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ],
  links: [{ rel: "canonical", href: path }],
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  type: "application/ld+json",
  children: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((i, idx) => ({ "@type": "ListItem", position: idx + 1, name: i.name, item: i.path })),
  }),
});
