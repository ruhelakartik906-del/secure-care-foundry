import { sitemapEntries } from "./sitemap";
import { getModularOtOption, getProduct } from "@/data/products";
import { getLocation } from "@/data/locations";
import { blogs } from "@/data/blogs";
import { cities, cityPath } from "@/data/cities";
import { compliance, comparisons } from "@/data/resources";

export const htmlSitemapGroups = [
  "Products",
  "Solutions",
  "Modular OT services",
  "Locations – Modular OT",
  "Locations – MGPS",
  "Resources",
  "Guides",
  "Blogs",
  "Company",
] as const;
export type HtmlSitemapGroup = (typeof htmlSitemapGroups)[number];

const solutionPaths = ["/solutions", "/modular-ot-wall-panels", "/modular-ot-ceiling", "/modular-ot-doors", "/modular-ot-flooring", "/operation-theatre-hvac-system", "/hepa-filtration-system-for-operation-theatre", "/operation-theatre-electrical-system", "/ot-accessories", "/digital-operation-theatre"];
const guidePaths = ["/modular-ot-cost-india", "/mgps-cost-india", "/faqs"];
const companyLabels: Record<string, string> = {
  "/": "Home", "/about": "About Us", "/contact": "Contact Us", "/get-a-quote": "Get a Quote", "/sitemap": "Sitemap",
  "/privacy-policy": "Privacy Policy", "/disclaimer": "Disclaimer", "/terms-and-conditions": "Terms & Conditions",
};

const humanize = (path: string) => path.split("/").filter(Boolean).pop()!.split("-").map((w) => (w.length <= 4 && /^(ot|mgps|hepa|hvac|india)$/.test(w) ? (w === "india" ? "India" : w.toUpperCase()) : w[0].toUpperCase() + w.slice(1))).join(" ");

function classify(path: string): { group: HtmlSitemapGroup; label: string } {
  const seg = path.split("/").filter(Boolean);
  if (seg[0] === "products") {
    if (!seg[1]) return { group: "Products", label: "All Products" };
    if (seg[1] === "modular-operation-theatre" && seg[2]) return { group: "Modular OT services", label: getModularOtOption(seg[2])?.name ?? humanize(path) };
    return { group: "Products", label: getProduct(seg[1])?.name ?? humanize(path) };
  }
  if (seg[0] === "modular-operation-theatre-manufacturers-in") return { group: "Locations – Modular OT", label: `Modular OT — ${getLocation(seg[1])?.name ?? humanize(path)}` };
  if (seg[0] === "medical-gas-pipeline-manufacturers-in") return { group: "Locations – MGPS", label: `Medical Gas Pipeline — ${getLocation(seg[1])?.name ?? humanize(path)}` };
  const city = cities.find((c) => cityPath(c) === path);
  if (city) return { group: "Locations – Modular OT", label: `Modular OT — ${city.name} (city)` };
  if (path === "/locations") return { group: "Locations – Modular OT", label: "All Service Locations" };
  if (seg[0] === "blogs") return { group: "Blogs", label: seg[1] ? blogs.find((b) => b.slug === seg[1])?.title ?? humanize(path) : "All Blogs" };
  if (seg[0] === "resources") {
    const r = seg[2] && [...compliance, ...comparisons].find((x) => x.slug === seg[2]);
    return { group: "Resources", label: r ? r.title : seg[1] ? humanize(path) : "Resources" };
  }
  if (solutionPaths.includes(path)) return { group: "Solutions", label: path === "/solutions" ? "All Solutions" : humanize(path) };
  if (guidePaths.includes(path)) return { group: "Guides", label: humanize(path) };
  if (seg[0] === "services") return { group: "Modular OT services", label: humanize(path) };
  return { group: "Company", label: companyLabels[path] ?? humanize(path) };
}

/** Grouped HTML sitemap built from the same entries as sitemap.xml, so both always list the same URLs. */
export function htmlSitemap() {
  const groups = new Map<HtmlSitemapGroup, { path: string; label: string }[]>(htmlSitemapGroups.map((g) => [g, []]));
  for (const { path } of sitemapEntries()) {
    const { group, label } = classify(path);
    groups.get(group)!.push({ path, label });
  }
  return htmlSitemapGroups.map((g) => ({ group: g, links: groups.get(g)! })).filter((g) => g.links.length);
}
