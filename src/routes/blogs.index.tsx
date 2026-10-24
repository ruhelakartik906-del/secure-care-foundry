import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Newspaper } from "lucide-react";
import { PageHero } from "@/components/site/common";
import { blogs } from "@/data/blogs";
import { blogSeo } from "@/lib/blog-seo";
import { routes } from "@/lib/routes";
import { breadcrumbSchema } from "@/lib/seo";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    ...blogSeo("Blogs | Unicare Medical Solutions", "Articles from Unicare Medical Solutions on modular operation theatres, medical gas pipelines and hospital infrastructure.", routes.blogs),
    scripts: [breadcrumbSchema([{ name: "Blogs", path: routes.blogs }])],
  }),
  component: Blogs,
});

function Blogs() {
  return <>
    <PageHero title="Blogs" intro="Modular operation theatres, medical gas systems and hospital infrastructure." crumbs={[{ label: "Blogs" }]} />
    <section className="site-wrap py-14 md:py-16">
      {blogs.length === 0 ? (
        <div className="mx-auto max-w-xl py-10 text-center">
          <Newspaper aria-hidden="true" className="mx-auto h-10 w-10 text-brand-blue" />
          <h2 className="mt-5 text-2xl font-bold text-foreground">Articles coming soon</h2>
          <p className="mt-3 text-muted-foreground">No articles have been published yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => <article key={blog.slug} className="flex flex-col border border-border bg-card">
            {blog.image && <Link to="/blogs/$slug" params={{ slug: blog.slug }} className="block aspect-[4/3] overflow-hidden bg-muted"><ResponsiveImage src={blog.image} alt={blog.imageAlt || blog.title} loading="lazy" width={800} height={600} className="h-full w-full object-cover" /></Link>}
            <div className="flex flex-1 flex-col p-6">
              <time dateTime={blog.publishedAt} className="text-xs text-muted-foreground">{formatDate(blog.publishedAt)}</time>
              <h2 className="mt-3 text-xl font-bold leading-snug"><Link to="/blogs/$slug" params={{ slug: blog.slug }} className="hover:text-brand-blue">{blog.title}</Link></h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{blog.excerpt}</p>
              <Link to="/blogs/$slug" params={{ slug: blog.slug }} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">Read article <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
          </article>)}
        </div>
      )}
    </section>
  </>;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}