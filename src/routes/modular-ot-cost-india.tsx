import { createFileRoute, Link } from "@tanstack/react-router";
import { pricing, priceFactors } from "@/data/pricing";
import { PageHero, Faqs, faqSchema, CtaBand } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo, breadcrumbSchema } from "@/lib/seo";

const faqs = [
  { q: "How much does a modular OT cost in India?", a: "A complete modular operation theatre typically costs between ₹8.5 Lakh and ₹35 Lakh. The final price depends on OT size, panel material, laminar air flow, doors, equipment and installation scope." },
  { q: "What is the modular OT price per square feet?", a: "OT paneling is indicatively ₹400 to ₹3,500 per sq.ft, depending on the panel material and finish. This covers paneling only, not the complete theatre." },
  { q: "Is the price on this page a final quotation?", a: "No. These are indicative ranges. A final quotation is prepared after reviewing your drawings, specifications and site." },
];

export const Route = createFileRoute("/modular-ot-cost-india")({
  head: () => {
    const s = seo("Modular OT Cost in India (2026) | Price Guide", "Indicative 2026 modular OT cost in India: complete OT, paneling per sq.ft, laminar air flow, OT pendant and MGPS price ranges, plus the factors that decide the final quote.", "/modular-ot-cost-india", "article");
    return { ...s, scripts: [breadcrumbSchema([{ name: "Pricing Guide", path: "/modular-ot-cost-india" }]), faqSchema(faqs)] };
  },
  component: Pricing,
});

function Pricing() {
  return <>
    <PageHero title="Modular OT Cost in India – 2026 Price Guide" intro="A complete modular operation theatre in India typically costs ₹8.5 Lakh to ₹35 Lakh. Below are indicative ranges for the main systems and the factors that decide your final price." crumbs={[{ label: "Pricing Guide" }]} />
    <section className="site-wrap grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold">Indicative Pricing</h2>
        <div className="mt-4 overflow-x-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted"><tr><th className="p-3">System</th><th className="p-3">Indicative range</th><th className="p-3">Basis</th></tr></thead>
            <tbody>{pricing.map((r) => <tr key={r.item} className="border-t border-border"><td className="p-3 font-medium">{r.item}</td><td className="p-3 font-semibold text-brand-blue">{r.range}</td><td className="p-3 text-muted-foreground">{r.unit}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-4 border-l-4 border-accent bg-muted p-4 text-sm"><strong>Important:</strong> these prices are indicative only and are not a quotation. Your final price is confirmed after we review your project.</p>
        <h2 className="mt-10 text-2xl font-bold">What Decides the Final Price</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">{priceFactors.map((f) => <li key={f} className="border border-border px-3 py-2 text-sm">{f}</li>)}</ul>
        <h2 className="mt-10 text-2xl font-bold">Related Products</h2>
        <p className="mt-3 text-muted-foreground">
          <Link to="/products/$slug" params={{ slug: "modular-operation-theatre" }} className="text-brand-blue underline">Modular Operation Theatre</Link> · <Link to="/products/$slug" params={{ slug: "laminar-air-flow" }} className="text-brand-blue underline">Laminar Air Flow</Link> · <Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }} className="text-brand-blue underline">Medical Gas Pipeline System</Link>
        </p>
        <h2 className="mt-10 text-2xl font-bold">FAQs</h2>
        <div className="mt-4"><Faqs faqs={faqs} /></div>
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start"><div className="border border-border p-5"><p className="mb-4 font-bold">Request Detailed Project Quote</p><EnquiryForm source="pricing-guide" defaultProduct="Modular Operation Theatre" submitLabel="Request Detailed Quote" /></div></aside>
    </section>
    <CtaBand />
  </>;
}
