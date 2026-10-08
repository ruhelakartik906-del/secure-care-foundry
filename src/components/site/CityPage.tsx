import { Link } from "@tanstack/react-router";
import { Check, MessageCircle, Phone } from "lucide-react";
import { cities, cityPath, type City } from "@/data/cities";
import { priceFactors } from "@/data/pricing";
import { site, whatsappLink } from "@/data/site";
import { PageHero, Faqs, faqSchema, CtaBand } from "./common";
import { EnquiryForm } from "./EnquiryForm";
import { seo, breadcrumbSchema } from "@/lib/seo";
import { absUrl } from "@/lib/site-url";

export const cityHead = (c: City) => {
  const path = cityPath(c);
  const s = seo(`Modular OT Manufacturer in ${c.name} | Unicare Medical Solutions`, `Modular OT manufacturer in ${c.name}, ${c.state}: OT design, panels, laminar air flow, MGPS and installation for hospitals. Call or WhatsApp for a project quote.`, path);
  return { ...s, scripts: [
    breadcrumbSchema([{ name: "Modular OT Cities", path: "/locations" }, { name: c.name, path }]),
    { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: `Modular OT in ${c.name}`, serviceType: "Modular Operation Theatre", areaServed: { "@type": "City", name: c.name }, provider: { "@id": `${absUrl("/")}#organization` }, url: absUrl(path) }) },
    faqSchema(c.faqs),
  ] };
};

const productLinks = [
  ["Modular Operation Theatre", "modular-operation-theatre"], ["Medical Gas Pipeline System", "medical-gas-pipeline-system"], ["Laminar Air Flow", "laminar-air-flow"],
  ["Surgical Scrub Sink", "surgical-scrub-sink-station"], ["Bed Head Panel", "bed-head-panel"], ["AGSS", "agss"],
] as const;

export function CityPage({ c }: { c: City }) {
  const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-10 text-2xl font-bold">{children}</h2>;
  return <>
    <PageHero title={`Modular OT Manufacturer in ${c.name}`} intro={c.intro} crumbs={[{ label: "Modular OT Cities", to: "/locations" }, { label: c.name }]} />
    <section className="site-wrap grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
      <div className="max-w-3xl leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold text-foreground">Modular OT Solutions in {c.name}</h2>
        <p className="mt-3">{c.context}</p>
        <H>Hospital Infrastructure Solutions</H>
        <p className="mt-3">Along with the operation theatre, we supply the connected hospital infrastructure: medical gas pipelines for wards and ICUs, bed head panels, cubicle curtain tracks, CSSD planning and hospital furniture.</p>
        <H>Products We Install</H>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">{productLinks.map(([l, s]) => <li key={s}><Link to="/products/$slug" params={{ slug: s }} className="flex items-center gap-2 text-brand-blue hover:underline"><Check className="h-4 w-4 text-accent" />{l}</Link></li>)}</ul>
        <H>Modular OT Installation</H>
        <p className="mt-3">Work starts with a site survey and layout, followed by panel manufacturing at our works, on-site assembly, integration of doors, lights and control panel, and testing before handover. {c.logistics}</p>
        <H>MGPS Solutions</H>
        <p className="mt-3">We plan oxygen, medical air, vacuum and nitrous oxide pipelines with manifolds, valve boxes, alarm panels and outlets. See the <Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }} className="text-brand-blue underline">medical gas pipeline system</Link> page for details.</p>
        <H>LAF / HVAC Solutions</H>
        <p className="mt-3">Laminar air flow units with HEPA filtration are coordinated with the theatre HVAC so that airflow over the operating table and room conditions work together. Read more on <Link to="/products/$slug" params={{ slug: "laminar-air-flow" }} className="text-brand-blue underline">laminar air flow</Link>.</p>
        <H>Compliance Considerations</H>
        <p className="mt-3">Hospitals preparing for accreditation such as NABH should share their requirements at the start. We plan layouts, surfaces, airflow and gas systems with these requirements in mind; final assessment is done by the accrediting body.</p>
        <H>Project and Service Coverage</H>
        <p className="mt-3">{c.coverage}</p>
        <H>Indicative Cost Factors</H>
        <p className="mt-3">The cost of a modular OT in {c.name} depends on:</p>
        <ul className="mt-2 flex flex-wrap gap-2">{priceFactors.map((f) => <li key={f} className="border border-border px-3 py-1 text-sm">{f}</li>)}</ul>
        <p className="mt-3">See indicative ranges in our <Link to="/modular-ot-cost-india" className="text-brand-blue underline">Modular OT cost guide</Link>.</p>
        <H>Why Choose Unicare</H>
        <ul className="mt-3 space-y-2">{["Own manufacturing works in Faridabad", "One team from design to handover", "OT, MGPS and hospital infrastructure from one supplier", "Project-specific quotations, no hidden scope"].map((t) => <li key={t} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" />{t}</li>)}</ul>
        <H>FAQs for {c.name}</H>
        <div className="mt-4"><Faqs faqs={c.faqs} /></div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.phoneHref} className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"><Phone className="h-4 w-4" />Call {site.phone}</a>
          <a href={whatsappLink(`Hello Unicare, I need a modular OT in ${c.name}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-semibold"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          <Link to="/contact" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold">Contact</Link>
        </div>
        <p className="mt-8 text-sm">Other cities: {cities.filter((x) => x.slug !== c.slug).map((x, i) => <span key={x.slug}>{i ? " · " : ""}<a href={cityPath(x)} className="text-brand-blue hover:underline">{x.name}</a></span>)}</p>
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start"><div className="border border-border p-5"><p className="mb-4 font-bold">Get a Quote for {c.name}</p><EnquiryForm defaultProduct="Modular Operation Theatre" /></div></aside>
    </section>
    <CtaBand />
  </>;
}
