import { createFileRoute, Link } from "@tanstack/react-router";
import { FileCheck2, HelpCircle, Scale } from "lucide-react";
import { PageHero, CtaBand, SectionHead } from "@/components/site/common";
import { ResourceList } from "@/components/site/ResourcePage";
import { compliance, comparisons } from "@/data/resources";
import { seo, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/resources/")({
  head: () => {
    const s = seo("Modular OT Resources – Compliance, Comparisons & FAQs | Unicare", "Planning resources for hospitals: overviews of OT and MGPS standards, product comparisons, FAQs and articles on modular operation theatres.", "/resources");
    return { ...s, scripts: [breadcrumbSchema([{ name: "Resources", path: "/resources" }])] };
  },
  component: Resources,
});

const hubs = [
  { icon: FileCheck2, title: "Compliance", text: "General overviews of standards and regulations referenced in OT and MGPS projects.", to: "/resources/compliance" as const },
  { icon: Scale, title: "Comparisons", text: "Side-by-side comparisons to help you choose the right system.", to: "/resources/comparisons" as const },
  { icon: HelpCircle, title: "FAQs", text: "Answers to common questions on products, pricing and projects.", to: "/faqs" as const },
];

function Resources() {
  return <>
    <PageHero title="Resources for Hospital Infrastructure Planning" intro="Guides, comparisons and answers to help hospital teams plan operation theatres, medical gas systems and critical-care areas." crumbs={[{ label: "Resources" }]} />
    <section className="site-wrap py-12"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{hubs.map(({ icon: Icon, title, text, to }) => <Link key={title} to={to} className="border border-border p-6 transition hover:border-brand-blue"><Icon className="h-6 w-6 text-brand-blue" /><h2 className="mt-4 text-lg font-bold">{title}</h2><p className="mt-2 text-sm text-muted-foreground">{text}</p></Link>)}</div></section>
    <section className="border-t border-border bg-muted py-16"><div className="site-wrap"><SectionHead eyebrow="Compliance" title="Standards & Regulations – Overviews" /><ResourceList items={compliance} base="compliance" /></div></section>
    <section className="py-16"><div className="site-wrap"><SectionHead eyebrow="Comparisons" title="Compare Options" /><ResourceList items={comparisons} base="comparisons" /></div></section>
    <CtaBand />
  </>;
}
