import { createFileRoute } from "@tanstack/react-router";
import { blogs } from "@/data/blogs";
import { PageHero, CtaBand } from "@/components/site/common";
import { seo } from "@/lib/seo";
import { BlogCard } from "./index";

export const Route = createFileRoute("/blog/")({
  head: () => seo("Medical Infrastructure Blog | Unicare Medical Solutions", "Guides on modular operation theatres, medical gas pipeline systems, laminar air flow, CSSD and hospital infrastructure planning.", "/blog"),
  component: () => (
    <>
      <PageHero title="Medical Infrastructure Insights" intro="Practical guides for hospital owners, architects and project teams." crumbs={[{ label: "Blog" }]} />
      <section className="container-x grid gap-6 py-14 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b) => <BlogCard key={b.slug} b={b} />)}
      </section>
      <CtaBand />
    </>
  ),
});
