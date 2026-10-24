import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { SITE_URL } from "../src/lib/site-url";
const routePaths = readdirSync("src/routes").filter((file) => file.endsWith(".tsx")).flatMap((file) => {
  const match = readFileSync(`src/routes/${file}`, "utf8").match(/createFileRoute\(["']([^"']+)["']\)/);
  const path = match?.[1]?.replace(/(.)\/+$/, "$1");
  return path && !path.includes("$") && !["/search", "/page-not-found"].includes(path) ? [path] : [];
}).sort();
writeFileSync("src/lib/public-route-paths.ts", `// Generated from src/routes by scripts/gen-static.ts; do not edit manually.\nexport const publicRoutePaths: string[] = ${JSON.stringify(routePaths, null, 2)};\n`);
const { staticPaths } = await import("../src/lib/static-pages");
const { sitemapXml } = await import("../src/lib/sitemap");
const ORIGIN = SITE_URL;
const paths = staticPaths();
writeFileSync("prerender-pages.json", JSON.stringify([...paths, "/page-not-found"], null, 0));
writeFileSync("public/sitemap.xml", sitemapXml());
writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\nDisallow: /search\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
console.log(paths.length, "pages");
