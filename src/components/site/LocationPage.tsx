import { Link } from "@tanstack/react-router";
import { getProduct, products, modularOtOptions } from "@/data/products";
import { locations, locationLead, type Location } from "@/data/locations";

/** Lowercases a product name but keeps acronyms such as OT and MGPS upper-case. */
const lc = (t: string) => t.toLowerCase().replace(/\b(ot|mgps|agss|icu|nicu|led|cssd|hvac|laf|hpl|ppgi|ss)\b/g, (m) => m.toUpperCase());
import { Button } from "@/components/ui/button";
import { PageHero, Faqs, CtaBand } from "./common";
import { EnquiryForm } from "./EnquiryForm";
import { useEnquiry } from "./EnquiryDialog";

export const locationTitle = (productSlug: string, l: Location) => `${getProduct(productSlug)?.keyword ?? "Hospital Infrastructure"} Manufacturers in ${l.name}`;

export const locationFaqs = (productSlug: string, l: Location) => {
  const p = getProduct(productSlug);
  if (!p) return [];
  return [
    { q: `Do you install ${p.shortName} in ${l.name}?`, a: `Yes. We take up ${lc(p.shortName)} projects in ${l.name}, including ${l.cities.slice(0, 3).join(", ")}. Share your project location and requirement for a site assessment.` },
    { q: `What is the ${p.shortName} price in ${l.name}?`, a: `Pricing depends on specification, size, materials and installation scope. We provide a project-specific quotation after understanding your requirement.` },
  ];
};

export function LocationPage({ productSlug, location: l }: { productSlug: string; location: Location }) {
  const p = getProduct(productSlug);
  const { open } = useEnquiry();
  if (!p) return null;
  const title = locationTitle(productSlug, l);
  return (
    <>
      <PageHero title={title} intro={`Design, manufacturing and installation of ${lc(p.name)} for hospitals and healthcare projects across ${l.name}.`} crumbs={[{ label: "Locations", to: "/locations" }, { label: l.name }]} />
      <section className="site-wrap grid gap-12 py-14 lg:grid-cols-12">
        <div className="prose-unicare lg:col-span-8">
          <h2>{p.shortName} solutions in {l.name}</h2>
          <p>{locationLead(l)} Unicare Medical Solutions supports hospitals, nursing homes, medical colleges and healthcare contractors in {l.name} with {lc(p.name)} projects — from requirement discussion and site assessment to manufacturing, installation and handover.</p>
          <h2>Hospital infrastructure requirements</h2>
          <p>{p.intro}</p>
          <h2>Manufacturing &amp; installation</h2>
          <ul>{p.features.slice(0, 5).map((f) => <li key={f}>{f}</li>)}</ul>
          <h2>Project consultation</h2>
          <p>For projects in {l.name}, our team reviews your drawings or room details, prepares a technical proposal and coordinates installation with your civil and MEP contractors.</p>
          <h2>Cities we serve in {l.name}</h2>
          <ul className="!list-none !pl-0 grid grid-cols-2 gap-2 sm:grid-cols-3">{l.cities.map((c) => <li key={c} className="border border-border px-3 py-2 text-sm text-foreground">{c}</li>)}</ul>
          <h2>Applications</h2>
          <ul>{p.applications.map((a) => <li key={a}>{a}</li>)}</ul>
          <h2>Frequently asked questions</h2>
          <Faqs faqs={locationFaqs(productSlug, l)} />
          <h3>Modular Operation Theatre</h3>
          <ul>
            <li><Link to="/products/$slug" params={{ slug: "modular-operation-theatre" }}>Modular Operation Theatre</Link></li>
            <li><Link to="/modular-operation-theatre-manufacturers-in/$state" params={{ state: l.slug }}>Modular Operation Theatre Manufacturer in {l.name}</Link></li>
            {modularOtOptions.map((o) => <li key={o.slug}><Link to="/products/modular-operation-theatre/$variant" params={{ variant: o.slug }}>{o.name}</Link></li>)}
          </ul>
          <h3>Our main products</h3>
          <ul className="!list-none !pl-0 grid grid-cols-1 gap-2 sm:grid-cols-2">{products.map((x) => <li key={x.slug}><Link to="/products/$slug" params={{ slug: x.slug }}>{x.name}</Link></li>)}</ul>
          <h3>Other locations</h3>
          <p>{locations.filter((x) => x.slug !== l.slug).slice(0, 10).map((x, i) => <span key={x.slug}>{i > 0 && " · "}<Link to="/modular-operation-theatre-manufacturers-in/$state" params={{ state: x.slug }}>{x.name}</Link></span>)}</p>
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-28 border border-border p-6">
            <h2 className="text-lg font-bold">Enquire for {l.name}</h2>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">{p.shortName} project</p>
            <EnquiryForm source={`location-${p.slug}-${l.slug}`} variant="contact" defaultProduct={p.name} submitLabel="Send Enquiry" />
            <Button variant="outline" className="mt-3 w-full rounded-sm" onClick={() => open(p.name)}>Get a Detailed Quote</Button>
          </div>
        </aside>
      </section>
      <CtaBand title={`Planning a ${p.shortName} project in ${l.name}?`} />
    </>
  );
}
