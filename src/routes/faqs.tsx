import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Faqs, faqSchema, CtaBand } from "@/components/site/common";
import { generalFaqs, productFaqGroups } from "@/data/faqs";
import { compliance, comparisons } from "@/data/resources";
import { seo, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/faqs")({
  head: () => {
    const s = seo("Modular OT, MGPS & Hospital Infrastructure FAQs | Unicare", "Answers to common questions about modular operation theatres, medical gas pipelines, OT pendants, surgical lights, pricing and compliance planning.", "/faqs");
    return { ...s, scripts: [breadcrumbSchema([{ name: "Resources", path: "/resources" }, { name: "FAQs", path: "/faqs" }]), faqSchema(generalFaqs)] };
  },
  component: FaqPage,
});

function FaqPage() {
  return <>
    <PageHero title="Frequently Asked Questions" intro="Common questions about our products, pricing, compliance planning and how projects work." crumbs={[{ label: "Resources", to: "/resources" }, { label: "FAQs" }]} />
    <section className="site-wrap max-w-4xl py-12">
      <h2 className="text-2xl font-bold">General</h2>
      <div className="mt-4"><Faqs faqs={generalFaqs} /></div>
      <h2 className="mt-12 text-2xl font-bold">Product FAQs</h2>
      {productFaqGroups.map((g) => <div key={g.title} className="mt-8">
        <div className="flex items-baseline justify-between gap-4"><h3 className="text-lg font-bold">{g.title}</h3>{g.link && <a href={g.link.to} className="shrink-0 text-sm font-semibold text-brand-blue">{g.link.label} →</a>}</div>
        <div className="mt-3"><Faqs faqs={g.faqs} /></div>
      </div>)}
      <h2 className="mt-12 text-2xl font-bold">Compliance & Comparisons</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">{[...compliance.map((r) => ({ r, t: "compliance" as const })), ...comparisons.map((r) => ({ r, t: "comparisons" as const }))].map(({ r, t }) => <li key={r.slug} className="border border-border p-3 text-sm">{t === "compliance" ? <Link to="/resources/compliance/$slug" params={{ slug: r.slug }} className="font-medium text-brand-blue">{r.title}</Link> : <Link to="/resources/comparisons/$slug" params={{ slug: r.slug }} className="font-medium text-brand-blue">{r.title}</Link>}</li>)}</ul>
      <p className="mt-8 text-sm text-muted-foreground">Looking for prices? See the <Link to="/modular-ot-cost-india" className="font-semibold text-brand-blue">Modular OT pricing guide</Link>.</p>
    </section>
    <CtaBand />
  </>;
}
