import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, modularOtOptions, priceLabel, products } from "@/data/products";
import { blogs } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import { PageHero, ProductCard, Faqs, faqSchema, CtaBand, SectionHead } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { useEnquiry } from "@/components/site/EnquiryDialog";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Phone } from "lucide-react";
import { seo, breadcrumbSchema } from "@/lib/seo";
import { BlogCard } from "@/components/site/BlogCard";
import { absUrl } from "@/lib/site-url";
import mgpsPlantPhoto from "@/assets/mgps-plant-room.png.asset.json";
import { cities, cityPath } from "@/data/cities";
import { getCompliance, comparisons } from "@/data/resources";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData && getProduct(loaderData.slug);
    if (!p) return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    const path = `/products/${p.slug}`;
    const s = seo(titleOverrides[p.slug] ?? `${p.name} Manufacturer & Installation | Unicare`, descOverrides[p.slug] ?? p.short, path, "product");
    const productLd = { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.short, category: p.category, url: absUrl(path), image: absUrl(p.image), brand: { "@type": "Brand", name: "Unicare Medical Solutions" } }) };
    return { ...s, scripts: [breadcrumbSchema([{ name: "Products", path: "/products" }, { name: p.name, path }]), productLd, faqSchema(p.faqs)] };
  },
  component: ProductPage,
});

const titleOverrides: Record<string, string> = {
  "modular-operation-theatre": "Modular Operation Theatre Manufacturer in India | Unicare",
  "medical-gas-pipeline-system": "Medical Gas Pipeline System Manufacturer | MGPS | Unicare",
  "laminar-air-flow": "Laminar Air Flow System for Operation Theatre | Unicare",
};
const descOverrides: Record<string, string> = {
  "modular-operation-theatre": "Modular operation theatre manufacturer: wall and ceiling panels, hermetic doors, laminar air flow, HEPA, pendants, lights, MGPS and installation for hospitals in India.",
  "medical-gas-pipeline-system": "Medical gas pipeline system manufacturer and installer: oxygen, medical air, vacuum and N2O with manifolds, valve boxes, alarms, outlets, testing and commissioning.",
  "laminar-air-flow": "Laminar air flow system for operation theatres with HEPA filtration, coordinated with OT HVAC. Components, installation, maintenance, cost factors and FAQs.",
};
const complianceFor: Record<string, string[]> = {
  "modular-operation-theatre": ["nabh-guidelines-modular-ot"],
  "medical-gas-pipeline-system": ["mgps-standards", "htm-02-01", "nfpa-99"],
  agss: ["mgps-standards"],
  "led-surgical-light": ["iec-60601-2-41-surgical-lights", "cdsco-mdr-2017"],
  "ot-pendant": ["iso-13485", "cdsco-mdr-2017"],
  "laminar-air-flow": ["nabh-guidelines-modular-ot"],
};

const installSteps = ["Requirement discussion", "Site assessment", "Technical drawings & proposal", "Manufacturing", "Installation", "Testing & handover"];

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { open } = useEnquiry();
  const isOt = p.slug === "modular-operation-theatre";
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).concat(products.filter((x) => x.category !== p.category)).slice(0, 3);
  const relBlogs = blogs.filter((b) => b.relatedProducts.includes(p.slug)).slice(0, 3);

  return (
    <>
      <PageHero title={p.name} crumbs={[{ label: "Products", to: "/products" }, { label: p.name }]} />
      <section className="site-wrap grid gap-10 py-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <img src={p.image} alt={p.name} width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
        </div>
        <div className="lg:col-span-5">
          <p className="eyebrow">{p.category}</p>
          <p className="mt-3 text-lg leading-relaxed text-foreground">{p.intro}</p>
          <div className="mt-6 border border-border bg-muted p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Price</p>
            <p className="mt-1 text-xl font-bold">{priceLabel(p.price)}</p>
            <p className="mt-2 text-xs text-muted-foreground">Pricing depends on size, specification, materials, project scope, installation and location.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-sm" onClick={() => open(p.name)}>Get a Quote</Button>
              <Button size="lg" variant="outline" className="rounded-sm" onClick={() => open(p.name)}>Get Latest Price</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="site-wrap grid gap-12 pb-16 lg:grid-cols-12">
        <div className="prose-unicare lg:col-span-8">
          {isOt && <OtLongForm />}
          {p.slug === "medical-gas-pipeline-system" && <MgpsLongForm />}
          {p.slug === "laminar-air-flow" && <LafLongForm />}
          {isOt && (
            <section aria-labelledby="modular-ot-options">
              <h2 id="modular-ot-options">Modular Operation Theatre Options</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {modularOtOptions.map((option) => (
                  <article key={option.slug} id={option.slug} className="scroll-mt-28 border border-border p-4">
                    <img src={option.image} alt={option.name} loading="lazy" width={640} height={480} className="!mb-4 !mt-0 aspect-[4/3] w-full object-cover" />
                    <h3 className="!mt-0">{option.name}</h3>
                    <p className="!mb-0">{option.description}</p>
                    <Link to="/products/modular-operation-theatre/$variant" params={{ variant: option.slug }} className="mt-3 inline-block text-sm font-semibold text-brand-blue">View Details →</Link>
                  </article>
                ))}
              </div>
            </section>
          )}
          <h2>Features</h2>
          <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h2>Specifications</h2>
          <table className="mb-6 w-full border border-border text-sm">
            <tbody>{p.specs.map(([k, v]) => <tr key={k} className="border-b border-border"><th className="w-1/3 bg-muted p-3 text-left font-semibold">{k}</th><td className="p-3 text-muted-foreground">{v}</td></tr>)}</tbody>
          </table>
          <p className="text-xs">Final specifications are confirmed per project after technical planning.</p>
          <h2>Applications</h2>
          <ul>{p.applications.map((a) => <li key={a}>{a}</li>)}</ul>
          <h2>{p.installation ? "Installation & Use" : "Installation Process"}</h2>
          <ol className="mb-6 grid gap-2 sm:grid-cols-2">{(p.installation ?? installSteps).map((s, i) => <li key={s} className="border border-border p-3 text-sm"><span className="font-bold text-brand-blue">0{i + 1}</span> — {s}</li>)}</ol>
          <h2>Benefits</h2>
          <ul>{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
          <h2>Why Choose Unicare</h2>
          <p>We handle design, manufacturing, installation and support as one coordinated project, so hospitals and contractors have a single point of responsibility.</p>
          <h2>Frequently Asked Questions</h2>
          <Faqs faqs={p.faqs} />
          {(complianceFor[p.slug] ?? []).length > 0 && <><h2>Compliance & Standards</h2><p>General overviews of standards referenced for this product (planning guidance only, not a certification claim):</p><ul>{complianceFor[p.slug]!.map((c) => { const r = getCompliance(c); return r ? <li key={c}><Link to="/resources/compliance/$slug" params={{ slug: c }}>{r.title.replace(/ – An Overview$/, "")}</Link></li> : null; })}</ul></>}
          {comparisons.filter((c) => c.products.includes(p.slug)).length > 0 && <p>Comparing options? Read {comparisons.filter((c) => c.products.includes(p.slug)).map((c, i) => <span key={c.slug}>{i ? ", " : ""}<Link to="/resources/comparisons/$slug" params={{ slug: c.slug }}>{c.title}</Link></span>)}.</p>}
          <h2>Pricing & Service Areas</h2>
          <p>See indicative ranges in our <Link to="/modular-ot-cost-india">Modular OT cost guide</Link>, read <Link to="/resources">planning resources</Link> or browse <Link to="/faqs">all FAQs</Link>. We serve hospital projects in {cities.map((c, i) => <span key={c.slug}>{i ? ", " : ""}<a href={cityPath(c)}>{c.name}</a></span>)} and other locations.</p>
          <div className="not-prose mt-8 flex flex-wrap gap-3"><Button asChild variant="outline"><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Now</a></Button><Button asChild variant="outline"><a href={whatsappLink(`Hello Unicare Medical Solutions, I am interested in ${p.name}. Please share more details.`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a></Button></div>
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-28 border border-border p-6">
            <h2 className="text-lg font-bold">Send an Enquiry</h2>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">About {p.shortName}</p>
            <EnquiryForm source={`product-${p.slug}`} variant="contact" defaultProduct={p.name} submitLabel="Send Enquiry" />
          </div>
        </aside>
      </section>

      {relBlogs.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="site-wrap">
            <SectionHead title="Related Articles" />
            <div className="grid gap-6 md:grid-cols-3">{relBlogs.map((b) => <BlogCard key={b.slug} b={b} />)}</div>
          </div>
        </section>
      )}
      <section className="border-t border-border bg-muted py-16">
        <div className="site-wrap">
          <SectionHead title="Related Products" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </div>
      </section>
      <CtaBand title={`Get a Quote for ${p.shortName}`} />
    </>
  );
}

function OtLongForm() {
  return (
    <>
      <h2>What is a Modular Operation Theatre?</h2>
      <p>A modular operation theatre is a surgical room assembled from factory-manufactured wall and ceiling panels with integrated services. Instead of plastered brick walls, the OT uses smooth, joint-sealed panels that are easier to clean and maintain, and that allow HVAC, laminar air flow, gases, lighting and controls to be built in neatly.</p>
      <h2>Modular OT Design</h2>
      <p>Design starts with the room dimensions, surgical specialities, equipment list and workflow (clean and dirty corridors, scrub area, pre-op and recovery). We prepare layouts showing panel arrangement, laminar air flow position, pendants, lights, doors, storage and control panels.</p>
      <h2>Modular OT Components</h2>
      <ul>
        <li><Link to="/modular-ot-wall-panels">Wall panels</Link> and <Link to="/modular-ot-ceiling">ceiling</Link> with coved corners</li><li><Link to="/products/$slug" params={{ slug: "laminar-air-flow" }}>Laminar air flow</Link> unit with <Link to="/hepa-filtration-system-for-operation-theatre">HEPA filters</Link>, fed by the <Link to="/operation-theatre-hvac-system">OT HVAC</Link></li><li><Link to="/products/$slug" params={{ slug: "hermetic-ot-door" }}>Hermetic sliding doors</Link></li>
        <li>Surgeon control panel</li><li><Link to="/products/$slug" params={{ slug: "led-surgical-light" }}>LED surgical lights</Link> and <Link to="/products/$slug" params={{ slug: "ot-pendant" }}>OT pendants</Link></li><li><Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }}>Medical gas outlets (MGPS)</Link> and <Link to="/products/$slug" params={{ slug: "agss" }}>AGSS</Link></li><li>Storage cabinets, X-ray viewer and <Link to="/products/$slug" params={{ slug: "pass-box" }}>pass box</Link></li><li>Flooring suited to OT use</li>
      </ul>
      <h2>Modular OT Materials</h2>
      <p>Panel materials are chosen per project and budget — common options include powder-coated galvanised steel, stainless steel and high-pressure laminate. Material choice affects durability, appearance and modular OT cost.</p>
      <h2>Modular OT Installation</h2>
      <p>Installation follows site readiness: panel framing, wall and ceiling panels, laminar air flow and HVAC integration, doors, electricals, gas outlets, flooring, and finally testing and commissioning.</p>
      <h2>Modular OT Cost</h2>
      <p>Modular operation theatre price in India varies with OT size, materials, laminar air flow specification, doors, controls and scope of HVAC and installation. Indicatively, a complete modular OT is ₹8.5 Lakh – ₹35 Lakh and OT paneling ₹400 – ₹3,500 per sq.ft (see the <Link to="/modular-ot-cost-india">modular OT cost guide</Link>); a project-specific quotation follows a review of your requirement.</p>
      <h2>Modular OT Maintenance</h2>
      <p>Routine maintenance includes cleaning of panels, periodic filter checks and replacement, door and control panel servicing, and validation of air quality as per hospital protocols.</p>
    </>
  );
}

function MgpsLongForm() {
  return (
    <>
      <h2>MGPS Overview</h2>
      <p>A medical gas pipeline system replaces bedside cylinders with a central supply. Gases are generated or stored at a plant room, distributed through cleaned medical-grade copper pipework and delivered at gas-specific terminal outlets in OTs, ICUs, wards and emergency areas. We plan the system around your bed count, departments and the standard specified in your tender.</p>
      <h2>Gas Sources and Manifolds</h2>
      <img src={mgpsPlantPhoto.url} alt="Medical gas plant room with medical air compressors, vacuum plant and cylinder manifold pipework" loading="lazy" width={1128} height={716} className="mb-4 aspect-[1128/716] w-full object-cover" />
      <p>Typical sources include oxygen cylinder manifolds, liquid oxygen tanks or PSA oxygen plants, medical air compressors, vacuum pumps and nitrous oxide manifolds. Manifolds are normally duplex (duty and standby) so supply continues during cylinder changeover.</p>
      <h2>Pipeline, Zone Valve Boxes and Alarms</h2>
      <ul>
        <li>Copper distribution pipeline, cleaned and jointed for medical gas service</li>
        <li>Zone (area) valve service units to isolate departments for maintenance or emergencies</li>
        <li>Area alarm panels showing high/low pressure for each gas in a department</li>
        <li>Master alarm panel monitoring the plant room sources</li>
        <li>Terminal outlets on walls, <Link to="/products/$slug" params={{ slug: "bed-head-panel" }}>bed head panels</Link> or <Link to="/products/$slug" params={{ slug: "ot-pendant" }}>OT pendants</Link></li>
      </ul>
      <h2>Testing and Commissioning</h2>
      <p>Before handover the system is pressure tested for leaks, purged, checked for cross-connection and gas identity at every outlet, and alarms are verified. Test records are shared with the hospital.</p>
      <h2>Maintenance</h2>
      <p>Routine checks cover plant equipment, manifold changeover, alarm function, valve operation and outlet condition, at intervals set by the hospital's maintenance plan.</p>
      <h2>MGPS Cost Factors</h2>
      <p>Cost depends on the number of beds and outlets, gases required, source equipment, pipeline length and building layout. Indicatively, MGPS inside one OT is ₹60,000 – ₹1 Lakh and a hospital MGPS project ₹5 Lakh – ₹30 Lakh; see the <Link to="/modular-ot-cost-india">pricing guide</Link>. For theatres, MGPS is usually planned with the <Link to="/products/$slug" params={{ slug: "modular-operation-theatre" }}>modular OT</Link> and <Link to="/products/$slug" params={{ slug: "agss" }}>AGSS</Link>.</p>
    </>
  );
}

function LafLongForm() {
  return (
    <>
      <h2>What is a Laminar Air Flow System?</h2>
      <p>A laminar air flow (LAF) system is a ceiling-mounted plenum that supplies HEPA-filtered air downward over the operating table in a uniform, low-turbulence flow. It helps keep the surgical zone supplied with filtered air and pushes airborne particles away from the wound area.</p>
      <h2>How It Works</h2>
      <p>Conditioned air from the theatre air handling unit enters the LAF plenum, passes through terminal HEPA filters and leaves through a diffuser screen at low velocity. Return air grilles are placed low on the walls so the air moves from the clean zone outward. The LAF is therefore part of the <Link to="/operation-theatre-hvac-system">OT HVAC system</Link>, not a replacement for it.</p>
      <h2>Components</h2>
      <ul><li>Stainless steel or powder-coated plenum box</li><li>Terminal <Link to="/hepa-filtration-system-for-operation-theatre">HEPA filters</Link></li><li>Perforated diffuser screen</li><li>Ducting connection to the AHU</li><li>Integration with the <Link to="/modular-ot-ceiling">OT ceiling</Link>, surgical lights and pendants</li></ul>
      <h2>Installation and Maintenance</h2>
      <p>The LAF position is fixed during OT layout so it sits above the operating table, clear of the <Link to="/products/$slug" params={{ slug: "led-surgical-light" }}>surgical light</Link> and <Link to="/products/$slug" params={{ slug: "ot-pendant" }}>pendant</Link> mounts. Maintenance includes periodic filter integrity checks, differential pressure monitoring and filter replacement as per the hospital's validation schedule.</p>
      <h2>LAF Cost Factors</h2>
      <p>Price depends on plenum size, filter grade and quantity, material and the HVAC scope. Indicatively ₹85,000 – ₹2.5 Lakh per unit — see the <Link to="/modular-ot-cost-india">pricing guide</Link>. For a comparison with mixed-flow systems read <Link to="/resources/comparisons/$slug" params={{ slug: "laf-vs-conventional-hvac" }}>LAF vs conventional HVAC</Link>.</p>
    </>
  );
}
