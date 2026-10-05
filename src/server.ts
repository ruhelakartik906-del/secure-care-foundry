import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { products, modularOtOptions } from "./data/products";
import { blogs } from "./data/blogs";
import { locations } from "./data/locations";
import { supabase } from "./integrations/supabase/client";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

const SITE_ORIGIN = "https://unicaremedicalsolutions.com";
const CANONICAL_HOST = "unicaremedicalsolutions.com";

let redirectCache: { at: number; map: Map<string, { to: string; code: number }> } | undefined;
async function getRedirects() {
  if (redirectCache && Date.now() - redirectCache.at < 60_000) return redirectCache.map;
  const { data } = await supabase.from("redirects").select("from_path,to_path,status_code");
  const map = new Map((data ?? []).map((r) => [r.from_path.replace(/(.)\/+$/, "$1"), { to: r.to_path, code: r.status_code }]));
  redirectCache = { at: Date.now(), map };
  return map;
}

const permanent = (to: string, code = 301) => new Response(null, { status: code, headers: { location: to, "cache-control": "public, max-age=3600" } });
const xmlEsc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function sitemapXml(origin: string) {
  const [{ data: cmsProducts }, { data: cmsBlogs }, { data: cmsLocations }, { data: cats }] = await Promise.all([
    supabase.from("cms_products").select("slug,parent_slug,updated_at,robots_index").eq("status", "published"),
    supabase.from("cms_blog_posts").select("slug,category,updated_at,robots_index").eq("status", "published"),
    supabase.from("cms_locations").select("slug,updated_at").eq("status", "published").eq("noindex", false),
    supabase.from("blog_categories").select("slug,name,noindex"),
  ]);
  const entries = new Map<string, string | undefined>();
  const add = (path: string, lastmod?: string) => { if (!entries.has(path) || lastmod) entries.set(path, lastmod); };
  ["/", "/products", "/about", "/blog", "/contact", "/locations", "/privacy-policy", "/disclaimer", "/terms-and-conditions", "/sitemap"].forEach((p) => add(p));
  products.forEach((p) => add(`/products/${p.slug}`));
  modularOtOptions.forEach((p) => add(`/products/modular-operation-theatre/${p.slug}`));
  blogs.forEach((b) => add(`/blog/${b.slug}`, b.date));
  locations.forEach((l) => { add(`/modular-operation-theatre-manufacturers-in/${l.slug}`); add(`/medical-gas-pipeline-manufacturers-in/${l.slug}`); });
  (cmsProducts ?? []).filter((p) => p.robots_index).forEach((p) => add(p.parent_slug ? `/products/${p.parent_slug}/${p.slug}` : `/products/${p.slug}`, p.updated_at));
  (cmsBlogs ?? []).filter((b) => b.robots_index).forEach((b) => add(`/blog/${b.slug}`, b.updated_at));
  (cmsLocations ?? []).forEach((l) => add(`/${l.slug}`, l.updated_at));
  const usedCats = new Set((cmsBlogs ?? []).map((b) => b.category.toLowerCase()));
  (cats ?? []).filter((c) => !c.noindex && usedCats.has(c.name.toLowerCase())).forEach((c) => add(`/blog/category/${c.slug}`));
  const body = [...entries].map(([p, lm]) => `\n  <url><loc>${xmlEsc(origin + (p === "/" ? "/" : p))}</loc>${lm ? `<lastmod>${new Date(lm).toISOString().slice(0, 10)}</lastmod>` : ""}</url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}\n</urlset>`;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const isProdHost = url.hostname.endsWith(CANONICAL_HOST);
      // www → apex, http → https (production domain only, never preview/localhost)
      if (isProdHost && (url.hostname !== CANONICAL_HOST || url.protocol === "http:")) {
        return permanent(`${SITE_ORIGIN}${url.pathname}${url.search}`);
      }
      const origin = SITE_ORIGIN; // sitemap always lists production URLs

      if (url.pathname === "/robots.txt") {
        const txt = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /auth\nDisallow: /search\nDisallow: /private/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
        return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
      }
      if (url.pathname === "/sitemap.xml" || url.pathname === "/sitemap-index.xml") {
        return new Response(await sitemapXml(origin), { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=900" } });
      }

      const isPage = request.method === "GET" && !/\.[a-z0-9]{2,5}$/i.test(url.pathname) && !url.pathname.startsWith("/_") && !url.pathname.startsWith("/api/") && !url.pathname.startsWith("/assets/");
      if (isPage) {
        // one URL convention: no trailing slash
        if (url.pathname.length > 1 && url.pathname.endsWith("/")) return permanent(`${url.pathname.replace(/\/+$/, "")}${url.search}`);
        // flat & singular location URLs → canonical nested plural URLs
        const flat = url.pathname.match(/^\/(modular-operation-theatre|medical-gas-pipeline)-manufacturers?-in-([a-z-]+)$/);
        if (flat && locations.some((l) => l.slug === flat[2])) return permanent(`/${flat[1]}-manufacturers-in/${flat[2]}`);
        const singular = url.pathname.match(/^\/(modular-operation-theatre|medical-gas-pipeline)-manufacturer\/([a-z-]+)$/);
        if (singular) return permanent(`/${singular[1]}-manufacturers-in/${singular[2]}`);
        const hit = (await getRedirects()).get(url.pathname);
        if (hit) {
          if (hit.code === 410) return new Response("Gone", { status: 410 });
          if (hit.to !== url.pathname) return permanent(hit.to, hit.code);
        }
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
