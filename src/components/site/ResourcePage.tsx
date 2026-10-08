import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import type { Resource } from "@/data/resources";
import { getProduct } from "@/data/products";
import { cities, cityPath } from "@/data/cities";
import { site, whatsappLink } from "@/data/site";
import { PageHero, Faqs, ProductCard, CtaBand, SectionHead } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { absUrl } from "@/lib/site-url";

export const articleSchema = (r: Resource, path: string) => ({
  type: "application/ld+json",
  children: JSON.stringify({
    "@context": "https://schema.org", "@type": "Article", headline: r.title, description: r.description,
    mainEntityOfPage: absUrl(path), author: { "@type": "Organization", name: "Unicare Medical Solutions" },
    publisher: { "@type": "Organization", name: "Unicare Medical Solutions" },
  }),
});

export function ResourcePage({ r, section }: { r: Resource; section: { label: string; to: string } }) {
  const related = r.products.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p);
  return <>
    <PageHero title={r.title} intro={r.intro} crumbs={[{ label: "Resources", to: "/resources" }, section, { label: r.title }]} />
    <section className="site-wrap grid gap-10 py-12 lg:grid-cols-12">
      <article className="prose-unicare lg:col-span-8">
        {r.table && <>
          <h2>Comparison at a Glance</h2>
          <div className="not-prose mb-8 overflow-x-auto border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted"><tr>{r.table.head.map((h) => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr></thead>
              <tbody>{r.table.rows.map((row) => <tr key={row[0]} className="border-t border-border">{row.map((c, i) => <td key={i} className={i === 0 ? "p-3 font-medium" : "p-3 text-muted-foreground"}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </>}
        {r.sections.map((s) => <section key={s.h}><h2>{s.h}</h2>{s.p.map((p) => <p key={p}>{p}</p>)}{s.list && <ul>{s.list.map((x) => <li key={x}>{x}</li>)}</ul>}</section>)}
        <h2>Frequently Asked Questions</h2>
        <Faqs faqs={r.faqs} />
        <h2>Useful Links</h2>
        <ul>
          <li><Link to="/modular-ot-cost-india">Modular OT cost in India – pricing guide</Link></li>
          <li><Link to="/faqs">All frequently asked questions</Link></li>
          {cities.slice(0, 4).map((c) => <li key={c.slug}><a href={cityPath(c)}>Modular OT manufacturer in {c.name}</a></li>)}
        </ul>
        <div className="not-prose mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline"><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Now</a></Button>
          <Button asChild variant="outline"><a href={whatsappLink(`Hello Unicare Medical Solutions, I read "${r.title}" and would like to discuss my project.`)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
        </div>
      </article>
      <aside className="lg:col-span-4">
        <div className="sticky top-28 border border-border p-6">
          <h2 className="text-lg font-bold">Get a Quote</h2>
          <p className="mb-4 mt-1 text-sm text-muted-foreground">Tell us about your project.</p>
          <EnquiryForm source={`resource-${r.slug}`} variant="contact" defaultProduct={related[0]?.name} submitLabel="Send Enquiry" />
        </div>
      </aside>
    </section>
    {related.length > 0 && <section className="border-t border-border bg-muted py-16"><div className="site-wrap"><SectionHead title="Related Products" /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <ProductCard key={p.slug} p={p} />)}</div></div></section>}
    <CtaBand />
  </>;
}

export function ResourceList({ items, base }: { items: Resource[]; base: "compliance" | "comparisons" }) {
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((r) => (
    <article key={r.slug} className="flex flex-col border border-border bg-background p-6 transition hover:border-brand-blue">
      <h3 className="text-lg font-bold">{r.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.description}</p>
      {base === "compliance"
        ? <Link to="/resources/compliance/$slug" params={{ slug: r.slug }} className="mt-4 text-sm font-semibold text-brand-blue">Read overview →</Link>
        : <Link to="/resources/comparisons/$slug" params={{ slug: r.slug }} className="mt-4 text-sm font-semibold text-brand-blue">Read comparison →</Link>}
    </article>
  ))}</div>;
}
