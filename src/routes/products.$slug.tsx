import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, priceLabel, products } from "@/data/products";
import { blogs } from "@/data/blogs";
import { locations } from "@/data/locations";
import { Button } from "@/components/ui/button";
import { PageHero, ProductCard, Faqs, faqSchema, CtaBand, SectionHead } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { useEnquiry } from "@/components/site/EnquiryDialog";
import { seo, breadcrumbSchema } from "@/lib/seo";
import { BlogCard } from "@/components/site/BlogCard";

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
    const s = seo(`${p.name} Manufacturer & Installation | Unicare`, p.short, path, "product");
    return { ...s, scripts: [breadcrumbSchema([{ name: "Products", path: "/products" }, { name: p.name, path }]), faqSchema(p.faqs)] };
  },
  component: ProductPage,
});

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
          <h2>Features</h2>
          <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h2>Specifications</h2>
          <table className="mb-6 w-full border border-border text-sm">
            <tbody>{p.specs.map(([k, v]) => <tr key={k} className="border-b border-border"><th className="w-1/3 bg-muted p-3 text-left font-semibold">{k}</th><td className="p-3 text-muted-foreground">{v}</td></tr>)}</tbody>
          </table>
          <p className="text-xs">Final specifications are confirmed per project after technical planning.</p>
          <h2>Applications</h2>
          <ul>{p.applications.map((a) => <li key={a}>{a}</li>)}</ul>
          <h2>Installation Process</h2>
          <ol className="mb-6 grid gap-2 sm:grid-cols-2">{installSteps.map((s, i) => <li key={s} className="border border-border p-3 text-sm"><span className="font-bold text-brand-blue">0{i + 1}</span> — {s}</li>)}</ol>
          <h2>Benefits</h2>
          <ul>{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
          <h2>Why Choose Unicare</h2>
          <p>We handle design, manufacturing, installation and support as one coordinated project, so hospitals and contractors have a single point of responsibility.</p>
          <h2>Frequently Asked Questions</h2>
          <Faqs faqs={p.faqs} />
          <h3>Service locations</h3>
          <p>
            {locations.slice(0, 8).map((l, i) => (
              <span key={l.slug}>{i > 0 && " · "}<Link to="/modular-operation-theatre-manufacturer/$state" params={{ state: l.slug }}>{l.name}</Link></span>
            ))}
          </p>
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
        <li>Wall and ceiling panels with coved corners</li><li>Laminar air flow unit with HEPA filters</li><li>Hermetic sliding doors</li>
        <li>Surgeon control panel</li><li>Surgical lights and pendants</li><li>Medical gas outlets and AGSS</li><li>Storage cabinets, X-ray viewer and pass box</li><li>Flooring suited to OT use</li>
      </ul>
      <h2>Modular OT Materials</h2>
      <p>Panel materials are chosen per project and budget — common options include powder-coated galvanised steel, stainless steel and high-pressure laminate. Material choice affects durability, appearance and modular OT cost.</p>
      <h2>Modular OT Installation</h2>
      <p>Installation follows site readiness: panel framing, wall and ceiling panels, laminar air flow and HVAC integration, doors, electricals, gas outlets, flooring, and finally testing and commissioning.</p>
      <h2>Modular OT Cost</h2>
      <p>Modular operation theatre price in India varies with OT size, materials, laminar air flow specification, doors, controls and scope of HVAC and installation. Rather than a fixed price per square foot, we provide a project-specific quotation after reviewing your requirement.</p>
      <h2>Modular OT Maintenance</h2>
      <p>Routine maintenance includes cleaning of panels, periodic filter checks and replacement, door and control panel servicing, and validation of air quality as per hospital protocols.</p>
    </>
  );
}
