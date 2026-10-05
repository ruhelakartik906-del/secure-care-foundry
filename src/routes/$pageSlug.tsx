import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { PageHero, Faqs, faqSchema, CtaBand } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo, breadcrumbSchema } from "@/lib/seo";
import { absUrl } from "@/lib/site-url";
import { getProduct } from "@/data/products";
import { site } from "@/data/site";

// CMS-managed location pages served at the top level, e.g. /modular-operation-theatre-manufacturers-in-lucknow
export const Route = createFileRoute("/$pageSlug")({
  loader: async ({ params }) => {
    if (!/^[a-z0-9-]{3,120}$/.test(params.pageSlug)) throw notFound();
    const { data } = await supabase.from("cms_locations").select("*").eq("slug", params.pageSlug).eq("status", "published").maybeSingle();
    if (!data) throw notFound();
    const { data: related } = await supabase.from("cms_locations").select("slug,title").eq("status", "published").eq("product_slug", data.product_slug).neq("slug", data.slug).limit(8);
    return { page: data, related: related ?? [] };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Page not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.page;
    const path = `/${p.slug}`;
    const title = p.seo_title || `${p.title} | Unicare Medical Solutions`;
    const description = p.meta_description || p.introduction.slice(0, 158);
    const s = seo(p.og_title || title, p.og_description || description, path, "website", p.og_image || p.image_url || undefined, { canonical: p.canonical_path, index: !p.noindex });
    s.meta[0] = { title };
    s.meta[1] = { name: "description", content: description };
    const faqs = Array.isArray(p.faqs) ? (p.faqs as { q: string; a: string }[]).filter((f) => f.q && f.a) : [];
    return { ...s, scripts: [
      breadcrumbSchema([{ name: "Locations", path: "/locations" }, { name: p.title, path }]),
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: p.title, serviceType: getProduct(p.product_slug)?.name ?? p.title, areaServed: { "@type": "State", name: p.state }, provider: { "@id": `${absUrl("/")}#organization` }, url: absUrl(path) }) },
      ...(faqs.length ? [faqSchema(faqs)] : []),
    ] };
  },
  notFoundComponent: NotFound,
  errorComponent: NotFound,
  component: CmsLocationPage,
});

function NotFound() {
  return <div className="site-wrap flex min-h-[60vh] flex-col justify-center py-20"><p className="eyebrow">Error 404</p><h1 className="mt-3 text-4xl font-bold">Page Not Found</h1><p className="mt-4 text-muted-foreground">The page you are looking for may have been moved or no longer exists.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/" className="bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Go Home</Link><Link to="/products" className="border border-border px-5 py-3 text-sm font-semibold">View Products</Link><Link to="/blog" className="border border-border px-5 py-3 text-sm font-semibold">Read Blog</Link><Link to="/contact" className="border border-border px-5 py-3 text-sm font-semibold">Contact Us</Link></div></div>;
}

function CmsLocationPage() {
  const { page: p, related } = Route.useLoaderData();
  const product = getProduct(p.product_slug);
  const content = Array.isArray(p.content) ? (p.content as unknown[]).map(String) : [];
  const faqs = Array.isArray(p.faqs) ? (p.faqs as { q: string; a: string }[]).filter((f) => f.q && f.a) : [];
  const links = Array.isArray(p.internal_links) ? (p.internal_links as { label: string; path: string }[]).filter((l) => l.label && l.path?.startsWith("/")) : [];
  return <>
    <PageHero title={p.title} intro={p.introduction} crumbs={[{ label: "Locations", to: "/locations" }, { label: p.state }]} />
    <section className="site-wrap grid gap-12 py-14 lg:grid-cols-12">
      <article className="prose-unicare lg:col-span-8">
        {p.image_url && <img src={p.image_url} alt={p.image_alt || p.title} width={1200} height={675} className="mb-6 aspect-[16/9] w-full object-cover" />}
        {content.map((line, i) => line.startsWith("## ") ? <h2 key={i}>{line.slice(3)}</h2> : <p key={i}>{line}</p>)}
        {product && <p>See full specifications on our <Link to="/products/$slug" params={{ slug: product.slug }}>{product.name}</Link> page.</p>}
        {!!links.length && <><h2>Related pages</h2><ul>{links.map((l) => <li key={l.path}><a href={l.path}>{l.label}</a></li>)}</ul></>}
        {!!faqs.length && <><h2>Frequently asked questions</h2><Faqs faqs={faqs} /></>}
        {!!related.length && <><h2>Other service locations</h2><p>{related.map((r, i) => <span key={r.slug}>{i > 0 && " · "}<a href={`/${r.slug}`}>{r.title}</a></span>)}</p></>}
        <h2>Contact</h2><p>Call <a href={site.phoneHref}>{site.phone}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </article>
      <aside className="lg:col-span-4"><div className="border border-border p-5"><h2 className="font-bold">Request a quotation</h2><EnquiryForm source="location" variant="lead" defaultProduct={product?.name} /></div></aside>
    </section>
    <CtaBand />
  </>;
}
