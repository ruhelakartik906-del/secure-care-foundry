import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { blogs } from "@/data/blogs";
import type { Blog } from "@/data/blogs";
import { PageHero, CtaBand } from "@/components/site/common";
import { BlogCard } from "@/components/site/BlogCard";
import { seo, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog/category/$category")({
  loader: async ({ params }) => {
    const { data: cat } = await supabase.from("blog_categories").select("*").eq("slug", params.category).maybeSingle();
    if (!cat) throw notFound();
    const { data } = await supabase.from("cms_blog_posts").select("slug,title,category,excerpt,published_at,featured_image_url,related_product_slugs").eq("status", "published").ilike("category", cat.name).order("published_at", { ascending: false });
    const cms: Blog[] = (data ?? []).map((i) => ({ slug: i.slug, title: i.title, category: i.category, excerpt: i.excerpt, date: i.published_at ?? "", image: i.featured_image_url ?? blogs[0]?.image ?? "", relatedProducts: i.related_product_slugs, body: [] }));
    const local = blogs.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase() && !cms.some((c) => c.slug === b.slug));
    return { cat, items: [...cms, ...local] };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Category not found" }, { name: "robots", content: "noindex" }] };
    const { cat, items } = loaderData;
    const path = `/blog/category/${cat.slug}`;
    // empty categories are thin pages: keep them out of the index
    const s = seo(cat.seo_title || `${cat.name} Articles | Unicare Medical Solutions`, cat.meta_description || `Guides and insights on ${cat.name.toLowerCase()} for hospitals, architects and healthcare project teams from Unicare Medical Solutions.`, path, "website", undefined, { index: !cat.noindex && items.length > 0 });
    return { ...s, scripts: [breadcrumbSchema([{ name: "Blog", path: "/blog" }, { name: cat.name, path }])] };
  },
  notFoundComponent: () => <div className="site-wrap py-20"><h1 className="text-3xl font-bold">Category not found</h1><Link to="/blog" className="mt-4 inline-block underline">Back to blog</Link></div>,
  errorComponent: () => <div className="site-wrap py-20"><h1 className="text-3xl font-bold">This category could not load</h1><Link to="/blog" className="mt-4 inline-block underline">Back to blog</Link></div>,
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData();
  return <>
    <PageHero title={cat.name} intro={cat.intro || `Articles about ${cat.name.toLowerCase()} from the Unicare team.`} crumbs={[{ label: "Blog", to: "/blog" }, { label: cat.name }]} />
    <section className="site-wrap grid gap-6 py-14 md:grid-cols-2 lg:grid-cols-3">
      {items.map((b) => <BlogCard key={b.slug} b={b} />)}
      {!items.length && <p className="text-muted-foreground">No articles in this category yet. <Link to="/blog" className="underline">Browse all articles</Link>.</p>}
    </section>
    <CtaBand />
  </>;
}
