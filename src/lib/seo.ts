export const seo = (title: string, description: string, path: string, type = "website") => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { name: "twitter:card", content: "summary_large_image" },
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
