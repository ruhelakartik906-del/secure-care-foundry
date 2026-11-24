import { Link } from "@tanstack/react-router";
import { getProduct, products, modularOtOptions } from "@/data/products";
import { locations, locationLead, type Location } from "@/data/locations";

/** Lowercases a product name but keeps acronyms such as OT and MGPS upper-case. */
const lc = (t: string) => t.toLowerCase().replace(/\b(ot|mgps|agss|icu|nicu|led|cssd|hvac|laf|hpl|ppgi|ss)\b/g, (m) => m.toUpperCase());
import { Button } from "@/components/ui/button";
import { PageHero, Faqs, CtaBand } from "./common";
import { EnquiryForm } from "./EnquiryForm";
import { useEnquiry } from "./EnquiryDialog";
import { stateLocal } from "@/data/state-local";
import { cities, cityPath } from "@/data/cities";

export const locationTitle = (productSlug: string, l: Location) =>
  productSlug === "modular-operation-theatre" ? `${l.name} Modular OT Manufacturers` : `${getProduct(productSlug)?.keyword ?? "Hospital Infrastructure"} Manufacturers in ${l.name}`;

export const locationFaqs = (productSlug: string, l: Location) => {
  const p = getProduct(productSlug);
  if (!p) return [];
  return [
    { q: `Do you install ${p.shortName} in ${l.name}?`, a: `Yes. We take up ${lc(p.shortName)} projects in ${l.name}, including ${l.cities.slice(0, 3).join(", ")}. Share your project location and requirement for a site assessment.` },
    { q: `What is the ${p.shortName} price in ${l.name}?`, a: `Pricing depends on specification, size, materials and installation scope. We provide a project-specific quotation after understanding your requirement.` },
  ];
};

/** State-specific copy; OT and MGPS pages use different paragraphs for the same state. */
export function stateParagraphs(productSlug: string, l: Location): { heading: string; paragraphs: string[] } {
  const d = stateLocal[l.slug];
  if (!d) return { heading: "", paragraphs: [] };
  const list = d.cities.join(", ");
  if (productSlug === "medical-gas-pipeline-system") return {
    heading: `Medical gas pipeline work in ${l.name}`,
    paragraphs: [
      `Medical gas pipeline projects in ${l.name} cover hospitals in ${list}. ${d.mgps}`,
      `${d.hospitals} For a pipeline proposal, the bed count, the number of theatres and ICU beds, and the gases each area needs decide manifold size, pipe diameters and the number of outlets.`,
      `Copper pipe, manifolds, valve boxes, alarm panels and outlets leave our Ballabhgarh, Faridabad works by road ${d.route}. For ${d.hub} the road distance is approximately ${d.km} km, about ${d.drive}. Pipe and fittings travel capped and bagged to keep the bore clean, and pressure and purity testing is booked only after the installed pipeline is complete; the actual dispatch and test dates are written into the project programme.`,
      `Gas systems in ${l.name} have their own approval steps. A bulk liquid oxygen tank needs a licence from PESO under the pressure vessel rules, manifold rooms and gas storage are reviewed by the ${d.fire} during fire clearance, and the ${d.pcb} handles the hospital's environmental consents. We provide test certificates, as-built drawings and a valve and alarm schedule that the hospital and its gas supplier can use with these authorities; the approvals themselves are issued by them.`,
    ],
  };
  return {
    heading: `Modular OT projects in ${l.name}: cities, hospitals and delivery`,
    paragraphs: [
      `Modular operation theatre planning in ${l.name} centres on ${list}. ${d.hospitals}`,
      d.ot,
      `OT wall and ceiling panels, hermetic doors and laminar air flow units travel from our works in Ballabhgarh, Faridabad ${d.route}. ${d.hub} is approximately ${d.km} km away by road, roughly ${d.drive}. Panels are packed flat with edge protection and dispatched once the room's civil work and ceiling supports are ready; the confirmed arrival and installation dates are set in each project programme.`,
      `Before a new or rebuilt theatre goes into use, hospitals in ${l.name} usually need state-level clearances in addition to any NABH accreditation they seek: registration of the establishment with the state health authority, fire safety clearance from the ${d.fire}, and biomedical waste authorisation from the ${d.pcb}. Our drawings, material data sheets and room test records are prepared so the hospital's consultant can include them in these submissions.`,
    ],
  };
}

function StateSection({ productSlug, l }: { productSlug: string; l: Location }) {
  const { heading, paragraphs } = stateParagraphs(productSlug, l);
  const isMgps = productSlug === "medical-gas-pipeline-system";
  const local = cities.filter((c) => c.state === l.name && (isMgps ? c.kind === "mgps" : c.kind !== "mgps"));
  return <>
    <h2>{heading}</h2>
    {paragraphs.map((text) => <p key={text}>{text}</p>)}
    {local.length > 0 && <p>Local pages: {local.map((c, i) => <span key={c.slug}>{i ? " · " : ""}<a href={cityPath(c)}>{c.heading}</a></span>)}</p>}
  </>;
}

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
          {/* TODO(company photo): add a unique, real project photo installed in this state, with alt text such as
              "{p.name} installed in {l.name} – Unicare". Do not use stock or AI images. */}
          <h2>{p.shortName} solutions in {l.name}</h2>
          <p>{locationLead(l)} Unicare Medical Solutions supports hospitals, nursing homes, medical colleges and healthcare contractors in {l.name} with {lc(p.name)} projects — from requirement discussion and site assessment to manufacturing, installation and handover.</p>
          <StateSection productSlug={productSlug} l={l} />
          <p>Compare all wall, ceiling and finish options on our main page for <Link to="/products/$slug" params={{ slug: "modular-operation-theatre" }}>modular operation theatre manufacturers</Link>.</p>
          <p className="font-medium text-foreground">Also see:{" "}
            {productSlug === "medical-gas-pipeline-system"
              ? <Link to="/modular-operation-theatre-manufacturers-in/$state" params={{ state: l.slug }}>Modular operation theatre in {l.name}</Link>
              : <Link to="/medical-gas-pipeline-manufacturers-in/$state" params={{ state: l.slug }}>Medical gas pipeline in {l.name}</Link>}
          </p>
          <h2>Manufacturing &amp; installation</h2>
          <ul>{p.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}</ul>
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
