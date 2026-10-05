import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { blogs } from "@/data/blogs";
import type { Blog } from "@/data/blogs";
import { supabase } from "@/integrations/supabase/client";
import { PageHero, CtaBand } from "@/components/site/common";
import { seo } from "@/lib/seo";
import { BlogCard } from "@/components/site/BlogCard";

export const Route = createFileRoute("/blog/")({
  head: () => seo("Medical Infrastructure Blog | Unicare Medical Solutions", "Guides on modular operation theatres, medical gas pipeline systems, laminar air flow, CSSD and hospital infrastructure planning.", "/blog"),
  component: BlogIndex,
});

function BlogIndex() {
  const [items, setItems] = useState<Blog[]>(blogs);
  useEffect(() => { supabase.from("cms_blog_posts").select("slug,title,category,excerpt,published_at,featured_image_url,related_product_slugs,content").eq("published", true).order("published_at", { ascending: false }).then(({ data }) => { if (!data?.length) return; setItems(data.map((item) => ({ slug: item.slug, title: item.title, category: item.category, excerpt: item.excerpt, date: item.published_at ?? new Date().toISOString(), image: item.featured_image_url ?? blogs[0]?.image ?? "", relatedProducts: item.related_product_slugs, body: Array.isArray(item.content) ? item.content.map((part, index) => typeof part === "object" && part && "text" in part ? { h: "h" in part && typeof part["h"] === "string" ? part["h"] : `Section ${index + 1}`, p: [String(part["text"])] } : { h: `Section ${index + 1}`, p: [String(part)] }) : [] }))); }); }, []);
  return <>
      <PageHero title="Medical Infrastructure Insights" intro="Practical guides for hospital owners, architects and project teams." crumbs={[{ label: "Blog" }]} />
      <section className="site-wrap grid gap-6 py-14 md:grid-cols-2 lg:grid-cols-3">
        {items.map((b) => <BlogCard key={b.slug} b={b} />)}
      </section>
      <CtaBand />
    </>;
}
