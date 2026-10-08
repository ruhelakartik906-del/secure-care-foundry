import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCompliance } from "@/data/resources";
import { ResourcePage, articleSchema } from "@/components/site/ResourcePage";
import { faqSchema } from "@/components/site/common";
import { seo, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/resources/compliance/$slug")({
  loader: ({ params }) => { const r = getCompliance(params.slug); if (!r) throw notFound(); return { slug: r.slug }; },
  head: ({ loaderData }) => {
    const r = loaderData && getCompliance(loaderData.slug);
    if (!r) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const path = `/resources/compliance/${r.slug}`;
    const s = seo(r.metaTitle, r.description, path, "article");
    return { ...s, scripts: [breadcrumbSchema([{ name: "Resources", path: "/resources" }, { name: "Compliance", path: "/resources/compliance" }, { name: r.title, path }]), articleSchema(r, path), faqSchema(r.faqs)] };
  },
  component: () => { const { slug } = Route.useLoaderData(); return <ResourcePage r={getCompliance(slug)!} section={{ label: "Compliance", to: "/resources/compliance" }} />; },
});
