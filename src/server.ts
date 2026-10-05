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

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/sitemap.xml") {
        const [{ data: cmsProducts }, { data: cmsBlogs }, { data: cmsLocations }] = await Promise.all([supabase.from("cms_products").select("slug,parent_slug").eq("published", true), supabase.from("cms_blog_posts").select("slug").eq("published", true), supabase.from("cms_locations").select("slug").eq("published", true).eq("noindex", false)]);
        const paths = Array.from(new Set(["/", "/products", "/about", "/blog", "/contact", "/locations", "/privacy-policy", "/disclaimer", "/terms-and-conditions", "/sitemap", ...products.map((p) => `/products/${p.slug}`), ...modularOtOptions.map((p) => `/products/modular-operation-theatre/${p.slug}`), ...blogs.map((b) => `/blog/${b.slug}`), ...locations.flatMap((l) => [`/modular-operation-theatre-manufacturer/${l.slug}`, `/medical-gas-pipeline-manufacturer/${l.slug}`, `/modular-operation-theatre-manufacturers-in/${l.slug}`, `/medical-gas-pipeline-manufacturers-in/${l.slug}`]), ...(cmsProducts ?? []).map((p) => p.parent_slug ? `/products/${p.parent_slug}/${p.slug}` : `/products/${p.slug}`), ...(cmsBlogs ?? []).map((b) => `/blog/${b.slug}`), ...(cmsLocations ?? []).map((l) => `/${l.slug}`)]));
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `\n  <url><loc>${url.origin}${path}</loc></url>`).join("")}\n</urlset>`;
        return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
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
