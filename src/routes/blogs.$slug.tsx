import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/common";
import { Button } from "@/components/ui/button";
import { findBlog, sectionId } from "@/data/blogs";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { blogSeo } from "@/lib/blog-seo";
import { blogPath, routes } from "@/lib/routes";
import { breadcrumbSchema } from "@/lib/seo";
import { absUrl } from "@/lib/site-url";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";

const fmt = (d: string) => new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(d));

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const blog = findBlog(params.slug);
    if (!blog) throw notFound();
    return blog;
  },
  head: ({ loaderData: blog }) => {
    if (!blog) { const s = blogSeo("Article unavailable | Unicare Medical Solutions", "The requested Unicare Medical Solutions article is unavailable.", routes.blogs); return { ...s, meta: [...s.meta, { name: "robots", content: "noindex, follow" }] }; }
    return {
      ...blogSeo(blog.title.length > 60 ? blog.title : `${blog.title} | Unicare`, blog.excerpt, blogPath(blog.slug), blog.image, true),
      scripts: [
        breadcrumbSchema([{ name: "Blogs", path: routes.blogs }, { name: blog.title, path: blogPath(blog.slug) }]),
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Article", headline: blog.title,
          description: blog.excerpt, datePublished: blog.publishedAt, dateModified: blog.updatedAt ?? blog.publishedAt,
          mainEntityOfPage: absUrl(blogPath(blog.slug)),
          ...(blog.author ? { author: { "@type": "Organization", name: blog.author, url: absUrl("/") } } : {}),
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absUrl("/images/unicare-logo.webp") } },
          ...(blog.image ? { image: absUrl(blog.image) } : {}),
        }) },
      ],
    };
  },
  component: BlogArticle,
  errorComponent: () => <section className="site-wrap py-16"><h1 className="text-3xl font-bold">Article unavailable</h1></section>,
  notFoundComponent: () => <section className="site-wrap py-16"><h1 className="text-3xl font-bold">Article not found</h1><p className="mt-4 text-muted-foreground">This article is not available.</p><Button asChild variant="outline" className="mt-6"><Link to="/blogs"><ArrowLeft className="h-4 w-4" />All blogs</Link></Button></section>,
});

function BlogArticle() {
  const blog = Route.useLoaderData();
  const toc = blog.sections.filter((s) => s.heading).map((s) => s.heading as string);
  const related = (blog.relatedProducts ?? []).map((slug) => products.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  return <>
    <PageHero title={blog.title} crumbs={[{ label: "Blogs", to: routes.blogs }, { label: blog.title }]} />
    <article className="site-wrap py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          {blog.author && <span>By <strong className="font-semibold text-foreground">{blog.author}</strong></span>}
          <span>Published <time dateTime={blog.publishedAt}>{fmt(blog.publishedAt)}</time></span>
          {blog.updatedAt && <span>Updated <time dateTime={blog.updatedAt}>{fmt(blog.updatedAt)}</time></span>}
        </div>
        {blog.image && <ResponsiveImage src={blog.image} alt={blog.imageAlt || blog.title} width={1200} height={800} className="mt-8 aspect-[3/2] w-full object-cover" />}
        {toc.length > 2 && <nav aria-label="Table of contents" className="mt-8 border border-border bg-muted/40 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-foreground">Table of contents</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">{toc.map((h) => <li key={h}><a href={`#${sectionId(h)}`} className="text-brand-blue hover:underline">{h}</a></li>)}</ol>
        </nav>}
        {blog.sections.map((section, index) => <section key={index} className="mt-8">
          {section.heading && <h2 id={sectionId(section.heading)} className="mb-4 scroll-mt-28 text-2xl font-bold text-foreground">{section.heading}</h2>}
          {section.paragraphs.map((paragraph, i) => <p key={i} className="mb-4 leading-relaxed text-foreground">{paragraph}</p>)}
          {section.bullets && <ul className="mb-4 list-disc space-y-2 pl-5 leading-relaxed">{section.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}</ul>}
        </section>)}
        {related.length > 0 && <aside aria-labelledby="related-products" className="mt-12 border border-border bg-card p-6">
          <h2 id="related-products" className="text-xl font-bold text-foreground">Related products</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">{related.map((p) => <li key={p.slug}>
            <Link to="/products/$slug" params={{ slug: p.slug }} className="flex h-full items-center justify-between gap-2 border border-border p-4 font-semibold text-foreground hover:border-brand-blue hover:text-brand-blue">{p.name}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
          </li>)}</ul>
        </aside>}
        <Link to="/blogs" className="mt-10 inline-flex items-center gap-2 border-t border-border pt-6 font-semibold text-brand-blue"><ArrowLeft className="h-4 w-4" />All blogs</Link>
      </div>
    </article>
  </>;
}
