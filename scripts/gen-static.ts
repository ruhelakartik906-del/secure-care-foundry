import { writeFileSync } from "node:fs";
import { staticPaths } from "../src/lib/static-pages";
const ORIGIN = "https://unicaremedicalsolutions.com";
const paths = staticPaths();
writeFileSync("prerender-pages.json", JSON.stringify([...paths, "/page-not-found"], null, 0));
writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `\n  <url><loc>${ORIGIN}${p}</loc></url>`).join("")}\n</urlset>\n`);
writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\nDisallow: /search\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
console.log(paths.length, "pages");
