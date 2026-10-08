import { createFileRoute, notFound } from "@tanstack/react-router";
import { getComparison } from "@/data/resources";
import { ResourcePage, articleSchema } from "@/components/site/ResourcePage";
import { faqSchema } from "@/components/site/common";
import { seo, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/resources/comparisons/$slug")({
  loader: ({ params }) => { const r = getComparison(params.slug); if (!r) throw notFound(); return { slug: r.slug }; },
  head: ({ loaderData }) => {
    const r = loaderData && getComparison(loaderData.slug);
    if (!r) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const path = `/resources/comparisons/${r.slug}`;
    const s = seo(r.metaTitle, r.description, path, "article");
    return { ...s, scripts: [breadcrumbSchema([{ name: "Resources", path: "/resources" }, { name: "Comparisons", path: "/resources/comparisons" }, { name: r.title, path }]), articleSchema(r, path), faqSchema(r.faqs)] };
  },
  component: () => { const { slug } = Route.useLoaderData(); return <ResourcePage r={getComparison(slug)!} section={{ label: "Comparisons", to: "/resources/comparisons" }} />; },
});
