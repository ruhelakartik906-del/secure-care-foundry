import { Link } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";
import { cities, otCities, cityPath, type City } from "@/data/cities";
import { locations } from "@/data/locations";
import { priceFactors } from "@/data/pricing";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PageHero, Faqs, faqSchema, CtaBand } from "./common";
import { EnquiryForm } from "./EnquiryForm";
import { seo, breadcrumbSchema } from "@/lib/seo";
import { absUrl } from "@/lib/site-url";
import { ghaziabadWhy } from "@/data/modular-ot-keywords";

export const cityHead = (c: City) => {
  const path = cityPath(c);
  const s = seo(c.title ?? `Modular OT Manufacturer in ${c.name} | Unicare Medical Solutions`, c.description ?? `Modular OT manufacturer in ${c.name}, ${c.state}: OT design, panels, laminar air flow, MGPS and installation for hospitals. Call or WhatsApp for a project quote.`, path);
  const mgps = c.kind === "mgps";
  return { ...s, scripts: [
    breadcrumbSchema([{ name: "Locations", path: "/locations" }, { name: c.heading, path }]),
    { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: c.heading, serviceType: mgps ? "Medical Gas Pipeline System" : "Modular Operation Theatre", areaServed: { "@type": "City", name: c.name }, provider: { "@id": `${absUrl("/")}#organization` }, url: absUrl(path) }) },
    faqSchema(c.faqs),
  ] };
};

const productLinks = [
  ["Modular Operation Theatre", "modular-operation-theatre"], ["Medical Gas Pipeline System", "medical-gas-pipeline-system"], ["Laminar Air Flow", "laminar-air-flow"],
  ["OT Pendant", "ot-pendant"], ["LED Surgical Light", "led-surgical-light"], ["Hermetic OT Door", "hermetic-ot-door"], ["AGSS", "agss"],
] as const;

const otSteps = (c: City) => [
  `Enquiry and drawings: share the ${c.name} hospital address, room sizes or architectural drawings, and the surgical specialities planned.`,
  "Site survey: our engineer measures the room, ceiling height and beam positions, checks the access route for panels and records existing gas, electrical and HVAC services.",
  "Layout and proposal: we prepare the OT layout with panel, door, pass box, pendant and laminar air flow positions, and a project-specific quotation.",
  "Approval and manufacture: after the hospital approves drawings and finishes, panels and frames are made at our Ballabhgarh, Faridabad works.",
  "Site readiness: the hospital's civil and MEP teams complete floor levelling, ceiling supports, HVAC openings and power points agreed in the drawings.",
  "Installation: our team erects the wall frame and panels, fixes the ceiling and laminar air flow unit, and installs doors, lights, the surgeon control panel and accessories.",
  "Testing and handover: room checks are carried out with the HVAC contractor, then the OT is handed over with drawings and operating guidance.",
];
const mgpsSteps = (c: City) => [
  `Requirement: share the ${c.name} hospital address, bed count, number of OT and ICU beds and the gases needed in each area.`,
  "Site survey: our engineer checks the manifold room or gas yard location, pipeline routes through shafts and ceilings, and any existing system to be retained.",
  "Design and proposal: we prepare the pipeline layout with pipe sizes, zone valve boxes, alarm panels and outlet schedule, and a project-specific quotation.",
  "Manifold and pipeline installation: copper pipe is installed, brazed and supported, and manifolds, valve boxes and outlets are fitted.",
  "Testing: pressure, leak, cross-connection and purity tests are carried out and recorded before gas is introduced.",
  "Handover: the hospital receives as-built drawings, test records, the valve and alarm schedule and guidance for the operating staff.",
];

export function CityPage({ c }: { c: City }) {
  const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-10 text-2xl font-bold">{children}</h2>;
  const mgps = c.kind === "mgps";
  const list = (mgps ? cities.filter((x) => x.kind === "mgps") : otCities).filter((x) => x.slug !== c.slug);
  const stateLink = locations.find((l) => l.name === c.state);
  return <>
    <PageHero title={c.heading} intro={c.intro} crumbs={[{ label: "Locations", to: "/locations" }, { label: c.name }]} />
    <section className="site-wrap grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
      <div className="max-w-3xl leading-relaxed text-muted-foreground">
        {/* Real local project photos can be added here once the company supplies them. */}
        <h2 className="text-2xl font-bold text-foreground">{mgps ? `Medical Gas Pipeline Solutions in ${c.name}` : `Modular OT Solutions in ${c.name}`}</h2>
        <p className="mt-3">{c.context}</p>
        {c.local.map((t) => <p key={t} className="mt-3">{t}</p>)}
        {mgps
          ? <p className="mt-3">For system components and gases, see our <Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }} className="text-brand-blue underline">medical gas pipeline system</Link> page and the <Link to="/products/$slug" params={{ slug: "manifold-room-system" }} className="text-brand-blue underline">manifold room system</Link>.</p>
          : <p className="mt-3">For panel systems, finishes and full scope details, see our main page for <Link to="/products/$slug" params={{ slug: "modular-operation-theatre" }} className="text-brand-blue underline">modular operation theatre manufacturers</Link>.</p>}
        {c.slug === "ghaziabad" && <>
          <H>{ghaziabadWhy.heading}</H>
          {ghaziabadWhy.paragraphs.map((t) => <p key={t} className="mt-3">{t}</p>)}
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{ghaziabadWhy.areas.map((a) => <li key={a} className="border border-border px-3 py-2 text-sm text-foreground">{a}</li>)}</ul>
          <p className="mt-4"><strong className="text-foreground">Ghaziabad office:</strong> {site.officeAddress}</p>
          <iframe title="Unicare Medical Solutions Ghaziabad office map" src={`https://www.google.com/maps?q=${encodeURIComponent("357 Malkhan Singh Complex Opp Ambedkar Bhawan Dasna Road Ghaziabad 201001 Uttar Pradesh India")}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-3 aspect-[4/3] w-full border border-border" />
          <p className="mt-2 text-sm">{ghaziabadWhy.mapCaption}</p>
        </>}
        <H>Delivery from our Faridabad works</H>
        <p className="mt-3">{c.delivery} {c.logistics}</p>
        <H>Nearby districts served</H>
        <p className="mt-3">{c.coverage}</p>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{c.districts.map((d) => <li key={d} className="border border-border px-3 py-2 text-sm text-foreground">{d}</li>)}</ul>
        <H>Site survey and installation steps</H>
        <ol className="mt-3 list-decimal space-y-2 pl-5">{(mgps ? mgpsSteps(c) : otSteps(c)).map((s) => <li key={s}>{s}</li>)}</ol>
        <H>Products We Install</H>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">{productLinks.map(([l, s]) => <li key={s}><Link to="/products/$slug" params={{ slug: s }} className="flex items-center gap-2 text-brand-blue hover:underline"><Check className="h-4 w-4 text-accent" />{l}</Link></li>)}</ul>
        {!mgps && <>
          <H>MGPS Solutions</H>
          <p className="mt-3">We plan oxygen, medical air, vacuum and nitrous oxide pipelines with manifolds, valve boxes, alarm panels and outlets. See the <Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }} className="text-brand-blue underline">medical gas pipeline system</Link> page for details.</p>
          <H>LAF / HVAC Solutions</H>
          <p className="mt-3">Laminar air flow units with HEPA filtration are coordinated with the theatre HVAC so that airflow over the operating table and room conditions work together. Read more on <Link to="/products/$slug" params={{ slug: "laminar-air-flow" }} className="text-brand-blue underline">laminar air flow</Link>.</p>
        </>}
        <H>Compliance Considerations</H>
        <p className="mt-3">{mgps
          ? "Bulk liquid oxygen storage needs a PESO licence, and manifold rooms and gas storage are reviewed during the hospital's fire clearance. Hospitals preparing for NABH should share their requirements at the start; final assessment is done by the authorities and the accrediting body."
          : "Hospitals preparing for accreditation such as NABH should share their requirements at the start. We plan layouts, surfaces, airflow and gas systems with these requirements in mind; final assessment is done by the accrediting body."}</p>
        <H>Indicative Cost Factors</H>
        <p className="mt-3">The cost of a {mgps ? "medical gas pipeline" : "modular OT"} in {c.name} depends on:</p>
        <ul className="mt-2 flex flex-wrap gap-2">{(mgps ? ["Number of beds and outlets", "Gases required", "Manifold or liquid oxygen supply", "Pipeline length and routing", "Alarm and valve zones"] : priceFactors).map((f) => <li key={f} className="border border-border px-3 py-1 text-sm">{f}</li>)}</ul>
        <p className="mt-3">See indicative ranges in our {mgps ? <Link to="/mgps-cost-india" className="text-brand-blue underline">MGPS cost guide</Link> : <Link to="/modular-ot-cost-india" className="text-brand-blue underline">Modular OT cost guide</Link>}.</p>
        <H>Why Choose Unicare</H>
        <ul className="mt-3 space-y-2">{["Own manufacturing works in Faridabad", "One team from design to handover", "OT, MGPS and hospital infrastructure from one supplier", "Project-specific quotations, no hidden scope"].map((t) => <li key={t} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" />{t}</li>)}</ul>
        <H>FAQs for {c.name}</H>
        <div className="mt-4"><Faqs faqs={c.faqs} /></div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.phoneHref} className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"><Phone className="h-4 w-4" />Call {site.phone}</a>
          <a href={whatsappLink(`Hello Unicare, I need ${mgps ? "a medical gas pipeline" : "a modular OT"} in ${c.name}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-semibold"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a>
          <Link to="/contact" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold">Contact</Link>
        </div>
        {stateLink && <p className="mt-8 text-sm">State page: {mgps
          ? <Link to="/medical-gas-pipeline-manufacturers-in/$state" params={{ state: stateLink.slug }} className="text-brand-blue hover:underline">Medical gas pipeline manufacturers in {stateLink.name}</Link>
          : <Link to="/modular-operation-theatre-manufacturers-in/$state" params={{ state: stateLink.slug }} className="text-brand-blue hover:underline">Modular OT manufacturers in {stateLink.name}</Link>}</p>}
        <p className="mt-3 text-sm">Other cities: {list.map((x, i) => <span key={x.slug}>{i ? " · " : ""}<a href={cityPath(x)} className="text-brand-blue hover:underline">{x.name}</a></span>)}</p>
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start"><div className="border border-border p-5"><p className="mb-4 font-bold">Get a Quote for {c.name}</p><EnquiryForm defaultProduct={mgps ? "Medical Gas Pipeline System" : "Modular Operation Theatre"} /></div></aside>
    </section>
    <CtaBand />
  </>;
}
