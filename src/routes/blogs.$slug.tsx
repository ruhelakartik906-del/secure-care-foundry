import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site/common";
import { Button } from "@/components/ui/button";
import { findBlog } from "@/data/blogs";
import { blogSeo } from "@/lib/blog-seo";
import { blogPath, routes } from "@/lib/routes";
import { breadcrumbSchema } from "@/lib/seo";
import { absUrl } from "@/lib/site-url";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const blog = findBlog(params.slug);
    if (!blog) throw notFound();
    return blog;
  },
  head: ({ loaderData: blog }) => {
    if (!blog) return { ...blogSeo("Article unavailable | Unicare Medical Solutions", "The requested Unicare Medical Solutions article is unavailable.", routes.blogs), meta: [...blogSeo("Article unavailable | Unicare Medical Solutions", "The requested Unicare Medical Solutions article is unavailable.", routes.blogs).meta, { name: "robots", content: "noindex, follow" }] };
    return {
      ...blogSeo(`${blog.title} | Unicare Medical Solutions`, blog.excerpt, blogPath(blog.slug), blog.image, true),
      scripts: [
        breadcrumbSchema([{ name: "Blogs", path: routes.blogs }, { name: blog.title, path: blogPath(blog.slug) }]),
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "BlogPosting", headline: blog.title,
          description: blog.excerpt, datePublished: blog.publishedAt, mainEntityOfPage: absUrl(blogPath(blog.slug)),
          ...(blog.author ? { author: { "@type": "Person", name: blog.author } } : {}),
          ...(blog.image?.startsWith("https://") ? { image: blog.image } : {}),
        }) },
      ],
    };
  },
  component: BlogArticle,
  notFoundComponent: () => <section className="site-wrap py-16"><h1 className="text-3xl font-bold">Article not found</h1><p className="mt-4 text-muted-foreground">This article is not available.</p><Button asChild variant="outline" className="mt-6"><Link to="/blogs"><ArrowLeft className="h-4 w-4" />All blogs</Link></Button></section>,
});

function BlogArticle() {
  const blog = Route.useLoaderData();
  return <>
    <PageHero title={blog.title} crumbs={[{ label: "Blogs", to: routes.blogs }, { label: blog.title }]} />
    <article className="site-wrap py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground"><time dateTime={blog.publishedAt}>{new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(blog.publishedAt))}</time>{blog.author && <span>{blog.author}</span>}</div>
        {blog.image && <img src={blog.image} alt={blog.imageAlt || blog.title} width={1200} height={800} className="mt-8 aspect-[3/2] w-full object-cover" />}
        {blog.sections.map((section, index) => <section key={index} className="mt-8">
          {section.heading && <h2 className="mb-4 text-2xl font-bold text-foreground">{section.heading}</h2>}
          {section.paragraphs.map((paragraph, i) => <p key={i} className="mb-4 leading-relaxed text-foreground">{paragraph}</p>)}
          {section.bullets && <ul className="list-disc space-y-2 pl-5 leading-relaxed">{section.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}</ul>}
        </section>)}
        <Link to="/blogs" className="mt-10 inline-flex items-center gap-2 border-t border-border pt-6 font-semibold text-brand-blue"><ArrowLeft className="h-4 w-4" />All blogs</Link>
      </div>
    </article>
  </>;
}