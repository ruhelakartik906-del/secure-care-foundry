import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, modularOtOptions, priceLabel, products } from "@/data/products";
import { pageSeo } from "@/data/page-seo";
import { getLongForm, productExtraSections, type LongForm } from "@/data/product-long-form";
import { Button } from "@/components/ui/button";
import { PageHero, ProductCard, Faqs, faqSchema, CtaBand, SectionHead } from "@/components/site/common";
import { ContentBlocks } from "@/components/site/ContentBlocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { useEnquiry } from "@/components/site/EnquiryDialog";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Phone } from "lucide-react";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import { seo, breadcrumbSchema } from "@/lib/seo";
import { productSchema } from "@/lib/structured-data";
import { cities, cityPath } from "@/data/cities";
import { getCompliance, comparisons } from "@/data/resources";
const otHeroSrc = "/images/modular-ot-hero.webp";
const otSupportSrc = "/images/modular-ot-room.webp";
const lafDiffuserSrc = "/images/perforated-cleanroom-ceiling-air-diffuser.webp";

const heroImages: Record<string, { src: string; alt: string; w: number; h: number }> = {
  "modular-operation-theatre": { src: otHeroSrc, alt: "Modern modular operation theatre with surgical lights, ceiling-mounted pendants and medical equipment.", w: 1600, h: 900 },
  "laminar-air-flow": { src: lafDiffuserSrc, alt: "Perforated ceiling-mounted laminar air-flow diffuser panel for operating theatre ventilation.", w: 1536, h: 1024 },
};

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
    const productLd = { type: "application/ld+json", children: JSON.stringify(productSchema(p, path)) };
    return { ...s, scripts: [breadcrumbSchema([{ name: "Products", path: "/products" }, { name: p.name, path }]), productLd, faqSchema(getLongForm(p.slug)?.faqs ?? p.faqs)] };
  },
  component: ProductPage,
});

const titleOverrides: Record<string, string> = {
  "modular-operation-theatre": "Modular Operation Theatre Manufacturer in India | Unicare",
  "medical-gas-pipeline-system": "Medical Gas Pipeline System Manufacturer | MGPS | Unicare",
  "laminar-air-flow": "Laminar Air Flow System for Operation Theatre | Unicare",
  "ot-pendant": "OT Pendant Supplier & Installation | Unicare",
};
const descOverrides: Record<string, string> = {
  "modular-operation-theatre": "Modular operation theatre manufacturer for hospitals in India: OT panels, hermetic doors, laminar air flow and MGPS with installation. Get a quote.",
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
  const p = getProduct(slug);
  const { open } = useEnquiry();
  if (!p) return null;
  const path = `/products/${p.slug}`;
  const hero = heroImages[p.slug];
  const isOt = p.slug === "modular-operation-theatre";
  const hasLongForm = ["modular-operation-theatre", "medical-gas-pipeline-system", "laminar-air-flow"].includes(p.slug);
  const lf = getLongForm(p.slug);
  const extras = productExtraSections[p.slug];
  const pickRelated = (slugs: string[]) => slugs.map((r) => getProduct(r)).filter((x): x is NonNullable<typeof x> => !!x);
  const related = lf ? pickRelated(lf.related) : p.related ? pickRelated(p.related) : products.filter((x) => x.slug !== p.slug && x.category === p.category).concat(products.filter((x) => x.category !== p.category)).slice(0, 3);

  return (
    <>
      <PageHero title={pageSeo[path]?.h1 ?? p.name} crumbs={[{ label: "Products", to: "/products" }, { label: p.name }]} />
      <section className="site-wrap grid gap-10 py-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {hero ? (
            <ResponsiveImage src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} fetchPriority="high" className="h-auto w-full" />
          ) : (
            <ResponsiveImage decoding="async" fetchPriority="high" src={p.image} alt={p.name} width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
          )}
        </div>
        <div className="lg:col-span-5">
          <p className="eyebrow">{p.category}</p>
          <p className="mt-3 text-lg leading-relaxed text-foreground">{p.intro}</p>
          <div className="mt-6 border border-border bg-muted p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Price</p>
            <p className="mt-1 text-xl font-bold">{priceLabel(p.price)}</p>
            <p className="mt-2 text-xs text-muted-foreground">Pricing depends on size, specification, materials, project scope, installation and location.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-sm" onClick={() => open(p.name)} aria-label={`Get a Quote for ${p.name}`}>Get a Quote</Button>
              <Button size="lg" variant="outline" className="rounded-sm" asChild><a href={whatsappLink(`Hello Unicare Medical Solutions, I am interested in ${p.name}. Please share more details.`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="site-wrap grid gap-12 pb-16 lg:grid-cols-12">
        <div className="prose-unicare lg:col-span-8">
          {isOt && <OtLongForm />}
          {lf && <LongFormSections lf={lf} name={p.name} />}
          {p.slug === "medical-gas-pipeline-system" && <p>Looking for the outlets themselves? See our <Link to="/products/$slug" params={{ slug: "oxygen-outlet" }}>medical gas and oxygen outlets</Link>, or read the <Link to="/mgps-cost-india">MGPS cost guide</Link> for indicative budgets.</p>}
          {p.slug === "oxygen-outlet" && <p>Outlets are part of a complete <Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }}>medical gas pipeline system</Link>. For indicative pipeline budgets, see the <Link to="/mgps-cost-india">MGPS cost guide</Link>.</p>}
          {p.slug === "laminar-air-flow" && <LafLongForm />}
          {isOt && (
            <section aria-labelledby="modular-ot-options">
              <h2 id="modular-ot-options">Modular Operation Theatre Options</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {modularOtOptions.map((option) => (
                  <article key={option.slug} id={option.slug} className="scroll-mt-28 border border-border p-4">
                    <ResponsiveImage src={option.image} alt={option.name} loading="lazy" width={640} height={480} className="!mb-4 !mt-0 aspect-[4/3] w-full object-cover" />
                    <h3 className="!mt-0">{option.name}</h3>
                    <p className="!mb-0">{option.description}</p>
                    <Link to="/products/modular-operation-theatre/$variant" params={{ variant: option.slug }} className="mt-3 inline-block text-sm font-semibold text-brand-blue">View Details →</Link>
                  </article>
                ))}
              </div>
            </section>
          )}
          {!lf && <>
          <h2>Features</h2>
          <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h2>Specifications</h2>
          <table className="mb-6 w-full border border-border text-sm">
            <tbody>{p.specs.map(([k, v]) => <tr key={k} className="border-b border-border"><th className="w-1/3 bg-muted p-3 text-left font-semibold">{k}</th><td className="p-3 text-muted-foreground">{v}</td></tr>)}</tbody>
          </table>
          <p className="text-xs">Final specifications are confirmed per project after technical planning.</p>
          <h2>Applications</h2>
          <ul>{p.applications.map((a) => <li key={a}>{a}</li>)}</ul>
          {(p.installation || !hasLongForm) && <><h2>{p.installation ? "Installation & Use" : "Installation Process"}</h2>
          <ol className="mb-6 grid gap-2 sm:grid-cols-2">{(p.installation ?? installSteps).map((s, i) => <li key={s} className="border border-border p-3 text-sm"><span className="font-bold text-brand-blue">0{i + 1}</span> — {s}</li>)}</ol></>}
          <h2>Benefits</h2>
          <ul>{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
          {extras && <ContentBlocks blocks={extras} />}
          <h2>Frequently Asked Questions</h2>
          <Faqs faqs={p.faqs} />
          </>}
          {(complianceFor[p.slug] ?? []).length > 0 && <><h2>Compliance & Standards</h2><p>General overviews of standards referenced for this product (planning guidance only, not a certification claim):</p><ul>{(complianceFor[p.slug] ?? []).map((c) => { const r = getCompliance(c); return r ? <li key={c}><Link to="/resources/compliance/$slug" params={{ slug: c }}>{r.title.replace(/ – An Overview$/, "")}</Link></li> : null; })}</ul></>}
          {comparisons.filter((c) => c.products.includes(p.slug)).length > 0 && <p>Comparing options? Read {comparisons.filter((c) => c.products.includes(p.slug)).map((c, i) => <span key={c.slug}>{i ? ", " : ""}<Link to="/resources/comparisons/$slug" params={{ slug: c.slug }}>{c.title}</Link></span>)}.</p>}
          <h2>Pricing & Service Areas</h2>
          <p>See indicative ranges in our <Link to="/modular-ot-cost-india">Modular OT cost guide</Link>, read <Link to="/resources">planning resources</Link> or browse <Link to="/faqs">all FAQs</Link>. We serve hospital projects in {cities.map((c, i) => <span key={c.slug}>{i ? ", " : ""}<a href={cityPath(c)}>{c.name}</a></span>)} and other locations.</p>
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-28 border border-border p-6">
            <h2 className="text-lg font-bold">Send an Enquiry</h2>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">About {p.shortName}</p>
            <EnquiryForm source={`product-${p.slug}`} variant="contact" defaultProduct={p.name} submitLabel="Send Enquiry" />
          </div>
        </aside>
      </section>

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
      <ResponsiveImage src={otSupportSrc} alt="Modular operating theatre showing integrated medical infrastructure and surgical equipment." loading="lazy" width={1600} height={900} className="mb-4 h-auto w-full" />
      <h2>Modular OT Design</h2>
      <p>Design starts with the room dimensions, surgical specialities, equipment list and workflow (clean and dirty corridors, scrub area, pre-op and recovery). We prepare layouts showing panel arrangement, laminar air flow position, pendants, lights, doors, storage and control panels.</p>
      <h2>Modular OT Components</h2>
      <ul>
        <li><Link to="/modular-ot-wall-panels">Wall panels</Link> and <Link to="/modular-ot-ceiling">ceiling</Link> with coved corners</li><li><Link to="/products/$slug" params={{ slug: "laminar-air-flow" }}>Laminar air flow</Link> unit with <Link to="/hepa-filtration-system-for-operation-theatre">HEPA filters</Link>, fed by the <Link to="/operation-theatre-hvac-system">OT HVAC</Link></li><li><Link to="/products/$slug" params={{ slug: "hermetic-ot-door" }}>Hermetic sliding doors</Link></li>
        <li><Link to="/operation-theatre-electrical-system">Electrical system and surgeon control panel</Link></li><li><Link to="/modular-ot-doors">Modular OT doors</Link></li><li><Link to="/products/$slug" params={{ slug: "led-surgical-light" }}>LED surgical lights</Link> and <Link to="/products/$slug" params={{ slug: "ot-pendant" }}>OT pendants</Link></li><li><Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }}>Medical gas outlets (MGPS)</Link> and <Link to="/products/$slug" params={{ slug: "agss" }}>AGSS</Link></li><li>Storage cabinets, X-ray viewer and <Link to="/products/$slug" params={{ slug: "pass-box" }}>pass box</Link></li><li>Flooring suited to OT use</li>
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

function LongFormSections({ lf, name }: { lf: LongForm; name: string }) {
  return (
    <>
      <h2>{lf.whatTitle}</h2>
      {lf.what.map((t) => <p key={t}>{t}</p>)}
      {lf.image && <ResponsiveImage src={lf.image.src} alt={lf.image.alt} loading="lazy" width={lf.image.w} height={lf.image.h} className="mb-4 h-auto w-full" />}
      <h2>{lf.typesTitle}</h2>
      {lf.typesIntro && <p>{lf.typesIntro}</p>}
      <ul>{lf.types.map((t) => <li key={t.name}><strong>{t.name}:</strong> {t.text}</li>)}</ul>
      <h2>{lf.specsTitle}</h2>
      <table className="mb-6 w-full border border-border text-sm">
        <tbody>{lf.specs.map(([k, v]) => <tr key={k} className="border-b border-border"><th className="w-1/3 bg-muted p-3 text-left font-semibold">{k}</th><td className="p-3 text-muted-foreground">{v}</td></tr>)}</tbody>
      </table>
      <p className="text-xs">Final specifications of the {name.toLowerCase()} are confirmed per project after technical planning.</p>
      <h2>{lf.installTitle}</h2>
      {lf.install.map((t) => <p key={t}>{t}</p>)}
      <ol className="mb-6 grid gap-2 sm:grid-cols-2">{lf.steps.map((s, i) => <li key={s} className="border border-border p-3 text-sm"><span className="font-bold text-brand-blue">0{i + 1}</span> — {s}</li>)}</ol>
      <h2>{lf.priceTitle}</h2>
      {lf.price.map((t) => <p key={t}>{t}</p>)}
      <ul>{lf.priceFactors.map((f) => <li key={f}>{f}</li>)}</ul>
      <h2>Frequently Asked Questions</h2>
      <Faqs faqs={lf.faqs} />
    </>
  );
}

function LafLongForm() {
  return (
    <>
      <h2>Laminar Air-Flow System for Operating Theatres</h2>
      <p>The ceiling-mounted laminar air-flow system is one of the most central parts of the operating room — it not only receives the fresh supply air, but also filters it through a <Link to="/hepa-filtration-system-for-operation-theatre">HEPA filter</Link> to remove bacteria, and diffuses the air as per OR (OT) requirements. The unidirectional air-flow system, made of aluminium or SS 304-grade sheets, is designed to receive and pressurise supply air through connected aluminium ducts. It is properly leak-tested, thermally insulated, and adequately sized according to <Link to="/operation-theatre-hvac-system">HVAC</Link> air-flow requirements calculated from room air volume, and fitted with a quality HEPA filter through which the pressurised air flows through a unidirectional diffuser made SS 304 grade steel sheets or monofilament fabric made from nylon/polyethene yarn.</p>
      <p>Proper sizing of the laminar air-flow plenum system, high-quality HEPA filters (with a dust-spot efficiency of 99.97% at 0.3 micron), diffuser quality, and leak-proofing are all very important to maintain a proper, aseptic air quality inside the OR (OT).</p>
      <h2>Installation and Maintenance</h2>
      <p>The LAF position is fixed during OT layout so it sits above the operating table, clear of the <Link to="/products/$slug" params={{ slug: "led-surgical-light" }}>surgical light</Link> and <Link to="/products/$slug" params={{ slug: "ot-pendant" }}>pendant</Link> mounts, and integrated with the <Link to="/modular-ot-ceiling">OT ceiling</Link>. Maintenance includes periodic filter integrity checks, differential pressure monitoring and filter replacement as per the hospital's validation schedule.</p>
      <h2>LAF Cost Factors</h2>
      <p>Price depends on plenum size, filter grade and quantity, material and the HVAC scope. Indicatively ₹85,000 – ₹2.5 Lakh per unit — see the <Link to="/modular-ot-cost-india">pricing guide</Link>. For a comparison with mixed-flow systems read <Link to="/resources/comparisons/$slug" params={{ slug: "laf-vs-conventional-hvac" }}>LAF vs conventional HVAC</Link>.</p>
    </>
  );
}
