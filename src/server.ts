import { staticPaths } from "./lib/static-pages";
import { cities, cityPath } from "@/data/cities";
import { compliance, comparisons } from "@/data/resources";
import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { products, modularOtOptions } from "./data/products";
import { locations } from "./data/locations";

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


const permanent = (to: string, code = 301) => new Response(null, { status: code, headers: { location: to, "cache-control": "public, max-age=3600" } });
const xmlEsc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function sitemapXml(origin: string) {
  const entries = new Map<string, string | undefined>();
  const add = (path: string, lastmod?: string) => { if (!entries.has(path) || lastmod) entries.set(path, lastmod); };
  staticPaths().forEach((p) => add(p));
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
        const txt = `User-agent: *\nAllow: /\nDisallow: /search\nDisallow: /private/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
        return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
      }
      if (url.pathname === "/sitemap.xml" || url.pathname === "/sitemap-index.xml") {
        return new Response(await sitemapXml(origin), { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=900" } });
      }

      if (url.pathname === "/projects" || url.pathname === "/projects/") return permanent("/products");

      const prerendering = typeof process !== "undefined" && process.env.TSS_PRERENDERING === "true";
      const isPage = !prerendering && request.method === "GET" && !/\.[a-z0-9]{2,5}$/i.test(url.pathname) && !url.pathname.startsWith("/_") && !url.pathname.startsWith("/api/") && !url.pathname.startsWith("/assets/");
      if (isPage) {
        // one URL convention: no trailing slash
        if (url.pathname.length > 1 && url.pathname.endsWith("/")) return permanent(`${url.pathname.replace(/\/+$/, "")}${url.search}`);
        // flat & singular location URLs → canonical nested plural URLs
        const flat = url.pathname.match(/^\/(modular-operation-theatre|medical-gas-pipeline)-manufacturers?-in-([a-z-]+)$/);
        if (flat && locations.some((l) => l.slug === flat[2])) return permanent(`/${flat[1]}-manufacturers-in/${flat[2]}`);
        const singular = url.pathname.match(/^\/(modular-operation-theatre|medical-gas-pipeline)-manufacturer\/([a-z-]+)$/);
        if (singular) return permanent(`/${singular[1]}-manufacturers-in/${singular[2]}`);
        if (/^\/(blog|admin|reset-password)(\/|$)/.test(url.pathname)) return new Response(null, { status: 301, headers: { location: url.pathname.startsWith("/blog") ? "/" : "/" } });
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
