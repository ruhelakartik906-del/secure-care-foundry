import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogs, getBlog } from "@/data/blogs";
import { getProduct } from "@/data/products";
import { PageHero, ProductCard, Faqs, faqSchema, CtaBand } from "@/components/site/common";
import { seo, breadcrumbSchema, fitDesc } from "@/lib/seo";
import { absUrl } from "@/lib/site-url";
import { cleanHtml } from "@/lib/html";
import { supabase } from "@/integrations/supabase/client";
import type { Blog } from "@/data/blogs";

const catSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const fallback = getBlog(params.slug);
    const { data } = await supabase.from("cms_blog_posts").select("*").eq("slug", params.slug).eq("status", "published").maybeSingle();
    if (!data && !fallback) throw notFound();
    const blog: Blog = data ? { slug: data.slug, title: data.title, category: data.category, excerpt: data.excerpt, date: data.published_at ?? data.created_at, image: data.featured_image_url ?? blogs[0]?.image ?? "", relatedProducts: data.related_product_slugs, ...(Array.isArray(data.faqs) && data.faqs.length ? { faqs: data.faqs as { q: string; a: string }[] } : {}), body: Array.isArray(data.content) ? data.content.map((part, index) => typeof part === "object" && part && "text" in part ? { h: "heading" in part && typeof part["heading"] === "string" && part["heading"] ? part["heading"] : `Section ${index + 1}`, p: [String(part["text"])] } : { h: `Section ${index + 1}`, p: [String(part)] }) : [] } : fallback as Blog;
    return {
      blog,
      html: data?.content_html ? cleanHtml(data.content_html) : null,
      cms: data ? {
        metaTitle: data.meta_title, metaDescription: data.meta_description, canonical: data.canonical_url, ogTitle: data.og_title, ogDescription: data.og_description, ogImage: data.og_image,
        twitterTitle: data.twitter_title, twitterDescription: data.twitter_description, twitterImage: data.twitter_image, index: data.robots_index, follow: data.robots_follow,
        schemaType: data.schema_type || "BlogPosting", modified: data.updated_at, alt: data.featured_image_alt, caption: data.featured_image_caption, imgTitle: data.featured_image_title, tags: data.tags,
      } : null,
      author: data?.author ?? "Unicare Medical Solutions",
    };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.blog;
    if (!b) return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.cms;
    const path = `/blog/${b.slug}`;
    const title = c?.metaTitle || `${b.title} | Unicare Medical Solutions`;
    const description = c?.metaDescription || b.excerpt;
    const image = c?.ogImage || b.image;
    const s = seo(c?.ogTitle || title, c?.ogDescription || description, path, "article", image, { canonical: c?.canonical, index: c?.index ?? true, follow: c?.follow ?? true, twitterTitle: c?.twitterTitle, twitterDescription: c?.twitterDescription, twitterImage: c?.twitterImage });
    s.meta[0] = { title };
    s.meta[1] = { name: "description", content: fitDesc(description) };
    const scripts = [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": c?.schemaType ?? "BlogPosting", headline: b.title, description,
        ...(image ? { image: [absUrl(image)] } : {}),
        author: { "@type": "Organization", name: loaderData.author },
        datePublished: b.date, ...(c?.modified ? { dateModified: c.modified } : {}),
        mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(c?.canonical || path) },
        publisher: { "@type": "Organization", name: "Unicare Medical Solutions", logo: { "@type": "ImageObject", url: absUrl("/favicon.png") } },
      }) },
      breadcrumbSchema([{ name: "Blog", path: "/blog" }, { name: b.category, path: `/blog/category/${catSlug(b.category)}` }, { name: b.title, path }]),
      ...(b.faqs ? [faqSchema(b.faqs)] : []),
    ];
    return { ...s, scripts };
  },
  component: BlogPost,
});

function BlogPost() {
  const { blog: b, author, html, cms } = Route.useLoaderData();
  const rel = b.relatedProducts.map(getProduct).filter(Boolean);
  const more = blogs.filter((x) => x.slug !== b.slug).slice(0, 3);
  return (
    <>
      <PageHero title={b.title} intro={b.excerpt} crumbs={[{ label: "Blog", to: "/blog" }, { label: b.category }]} />
      <section className="site-wrap grid gap-12 py-14 lg:grid-cols-12">
        <article className="prose-unicare lg:col-span-8">
          <p className="!text-xs uppercase tracking-wider">
            <Link to="/blog/category/$category" params={{ category: catSlug(b.category) }}>{b.category}</Link> · {author} · <time dateTime={b.date}>{new Date(b.date).toLocaleDateString("en-IN", { dateStyle: "long" })}</time>
          </p>
          <figure className="mb-6">
            <img src={b.image} alt={cms?.alt || b.title} title={cms?.imgTitle ?? undefined} width={1200} height={675} fetchPriority="high" className="aspect-[16/9] w-full object-cover" />
            {cms?.caption && <figcaption className="mt-2 text-xs text-muted-foreground">{cms.caption}</figcaption>}
          </figure>
          {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : b.body.map((s) => (
            <div key={s.h}><h2>{s.h}</h2>{s.p.map((t) => <p key={t}>{t}</p>)}</div>
          ))}
          {rel[0] && <p>Learn more on our <Link to="/products/$slug" params={{ slug: rel[0].slug }}>{rel[0].name}</Link> page, or see <Link to="/modular-operation-theatre-manufacturers-in/$state" params={{ state: "uttar-pradesh" }}>modular OT manufacturers in Uttar Pradesh</Link>.</p>}
          {b.faqs && (<><h2>FAQs</h2><Faqs faqs={b.faqs} /></>)}
          {!!cms?.tags?.length && <p className="!text-xs">Tags: {cms.tags.join(", ")}</p>}
        </article>
        <aside className="space-y-6 lg:col-span-4">
          {rel.slice(0, 1).map((p) => p && <ProductCard key={p.slug} p={p} />)}
          <div className="border border-border p-5">
            <h2 className="font-bold">More articles</h2>
            <ul className="mt-3 space-y-3 text-sm">{more.map((m) => <li key={m.slug}><Link to="/blog/$slug" params={{ slug: m.slug }} className="hover:text-brand-blue">{m.title}</Link></li>)}</ul>
          </div>
        </aside>
      </section>
      <CtaBand />
    </>
  );
}
