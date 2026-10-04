import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogs, getBlog } from "@/data/blogs";
import { getProduct } from "@/data/products";
import { PageHero, ProductCard, Faqs, faqSchema, CtaBand } from "@/components/site/common";
import { seo, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (!getBlog(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const b = loaderData && getBlog(loaderData.slug);
    if (!b) return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    const path = `/blog/${b.slug}`;
    const scripts = [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: b.title, datePublished: b.date, publisher: { "@type": "Organization", name: "Unicare Medical Solutions" } }) },
      breadcrumbSchema([{ name: "Blog", path: "/blog" }, { name: b.title, path }]),
      ...(b.faqs ? [faqSchema(b.faqs)] : []),
    ];
    return { ...seo(`${b.title} | Unicare Blog`, b.excerpt, path, "article"), scripts };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useLoaderData();
  const b = getBlog(slug)!;
  const rel = b.relatedProducts.map(getProduct).filter(Boolean);
  const more = blogs.filter((x) => x.slug !== b.slug).slice(0, 3);
  return (
    <>
      <PageHero title={b.title} intro={b.excerpt} crumbs={[{ label: "Blog", to: "/blog" }, { label: b.category }]} />
      <section className="container-x grid gap-12 py-14 lg:grid-cols-12">
        <article className="prose-unicare lg:col-span-8">
          <p className="!text-xs uppercase tracking-wider">{b.category} · <time dateTime={b.date}>{new Date(b.date).toLocaleDateString("en-IN", { dateStyle: "long" })}</time></p>
          <img src={b.image} alt={b.title} width={1200} height={750} className="mb-6 aspect-[16/9] w-full object-cover" />
          {b.body.map((s) => (
            <div key={s.h}><h2>{s.h}</h2>{s.p.map((t) => <p key={t}>{t}</p>)}</div>
          ))}
          {rel[0] && <p>Learn more on our <Link to="/products/$slug" params={{ slug: rel[0].slug }}>{rel[0].name}</Link> page, or see <Link to="/modular-operation-theatre-manufacturer/$state" params={{ state: "uttar-pradesh" }}>modular OT manufacturers in Uttar Pradesh</Link>.</p>}
          {b.faqs && (<><h2>FAQs</h2><Faqs faqs={b.faqs} /></>)}
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
