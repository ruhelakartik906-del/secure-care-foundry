import { absUrl } from "./site-url";
import { socialImagePath } from "./social-images";

export function blogSeo(title: string, description: string, path: string, image?: string, article = false) {
  const socialImage = absUrl(socialImagePath(path));
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: article ? "article" : "website" },
      { property: "og:url", content: absUrl(path) },
      { name: "twitter:card", content: socialImage ? "summary_large_image" : "summary" },
      ...(socialImage ? [
        { property: "og:image", content: socialImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:image", content: socialImage },
      ] : []),
    ],
    links: [{ rel: "canonical", href: absUrl(path) }],
  };
}