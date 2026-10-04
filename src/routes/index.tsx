import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, ClipboardCheck, Factory, Headphones, Layers, Wrench } from "lucide-react";
import hero from "@/assets/modular-ot.jpg";
import { products } from "@/data/products";
import { blogs } from "@/data/blogs";
import { locations } from "@/data/locations";
import { Button } from "@/components/ui/button";
import { ProductCard, SectionHead, CtaBand } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { BlogCard } from "@/components/site/BlogCard";
import { useEnquiry } from "@/components/site/EnquiryDialog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Modular Operation Theatre & Medical Gas Pipeline Manufacturer | Unicare Medical Solutions",
      "Design, manufacturing and installation of modular operation theatres, medical gas pipeline systems, laminar air flow, CSSD and hospital infrastructure across India.",
      "/",
    ),
  component: Home,
});

const why = [
  { icon: Building2, t: "Complete Hospital Infrastructure Solutions", d: "OT, gas, critical care, CSSD and furniture from one project partner." },
  { icon: Factory, t: "Quality-Focused Manufacturing", d: "Controlled fabrication of panels, systems and fittings before site delivery." },
  { icon: Wrench, t: "Professional Installation", d: "Trained site teams for installation, testing and commissioning." },
  { icon: Layers, t: "Project-Based Customization", d: "Every OT and system is configured to your drawings and clinical needs." },
  { icon: Headphones, t: "Technical Support", d: "Support after handover for maintenance and service requirements." },
  { icon: ClipboardCheck, t: "Reliable Project Execution", d: "Planned schedules and single-point coordination with your contractors." },
];

const steps = [
  ["01", "Understand Requirement", "We discuss your facility, departments, procedures and budget."],
  ["02", "Site / Project Assessment", "Our team reviews drawings, room sizes and existing services."],
  ["03", "Technical Planning", "Layouts, specifications and a project-specific proposal."],
  ["04", "Manufacturing", "Panels, systems and components are fabricated for your project."],
  ["05", "Installation", "Coordinated on-site installation with your civil and MEP teams."],
  ["06", "Testing & Handover", "Testing, commissioning and handover with documentation."],
];

const facilities = ["Hospitals", "Multispecialty Hospitals", "Super Specialty Hospitals", "Nursing Homes", "Clinics", "Diagnostic Centres", "Government Hospitals", "Medical Colleges", "Healthcare Projects", "Operation Theatre Projects", "ICU & Critical Care Areas", "CSSD Facilities"];

function Home() {
  const { open } = useEnquiry();
  const ot = products[0];
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img src={hero} alt="Modular operation theatre with laminar air flow ceiling and surgical lights" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-35" fetchPriority="high" />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <p className="eyebrow text-navy-foreground/80">Hospital Infrastructure · Medical Equipment</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.08] md:text-6xl">Complete Hospital Infrastructure &amp; Medical Equipment Solutions</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/85">
            Design, Manufacturing &amp; Installation Solutions for Modular Operation Theatres, Medical Gas Pipeline Systems, Hospital Infrastructure and Critical Care Environments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => open()}>Get a Quote</Button>
            <Button size="lg" variant="outline" className="rounded-sm border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" asChild>
              <Link to="/products">View Products</Link>
            </Button>
          </div>
          <button onClick={() => open()} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">
            Discuss Your Hospital Project <ArrowRight className="h-4 w-4" />
          </button>
          <ul className="mt-14 grid max-w-4xl grid-cols-2 gap-px border border-navy-foreground/20 bg-navy-foreground/20 md:grid-cols-4">
            {["Quality Manufacturing", "Professional Installation", "Project Support", "Hospital Infrastructure Expertise"].map((t) => (
              <li key={t} className="bg-navy/80 px-4 py-4 text-sm font-medium">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-x grid gap-10 py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">About Unicare</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">Medical Infrastructure Built for Modern Healthcare</h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Unicare Medical Solutions manufactures, supplies and installs critical hospital infrastructure — from modular operation theatres and medical gas pipeline systems to laminar air flow, CSSD and ICU fit-outs. We work with hospitals, architects and contractors from first requirement through technical planning, project execution and after-installation technical support.
          </p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-blue hover:underline">Know More About Unicare <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="border-t border-border bg-muted py-20">
        <div className="container-x">
          <SectionHead eyebrow="Products" title="Our Medical Infrastructure Solutions" intro="Engineered systems for operation theatres, critical care, sterilisation and hospital wards — each configured to your project." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* FEATURED OT */}
      <section className="bg-background py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img src={ot.image} alt="Modular operation theatre installation" loading="lazy" width={1600} height={1008} className="aspect-[4/3] w-full object-cover" />
          <div>
            <p className="eyebrow">Featured Solution</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">Modular Operation Theatre Manufacturer</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Unicare designs, manufactures and installs modular OTs for new hospitals and theatre upgrades. Each modular OT is planned around your room size, surgical specialities and infection-control needs, with wall and ceiling panels, laminar air flow, hermetic doors, surgeon control panels and medical gas integration delivered as one coordinated project.
            </p>
            <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {["Modular OT design & layout", "Panel manufacturing", "Installation & commissioning", "Hospital project support", "Custom configurations", "Complete OT infrastructure"].map((x) => (
                <li key={x} className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-accent" />{x}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-sm" onClick={() => open(ot.name)}>Get Modular OT Quote</Button>
              <Button size="lg" variant="outline" className="rounded-sm" asChild><Link to="/products/$slug" params={{ slug: ot.slug }}>View Modular OT Details</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-border bg-muted py-20">
        <div className="container-x">
          <SectionHead eyebrow="Why Unicare" title="Why Hospitals Choose Unicare Medical Solutions" />
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {why.map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-background p-7">
                <Icon className="h-6 w-6 text-brand-blue" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRA SOLUTIONS (categories) */}
      <section className="py-20">
        <div className="container-x">
          <SectionHead eyebrow="Capabilities" title="Hospital Infrastructure Solutions" intro="From the operation theatre to the ward, we cover the systems that keep clinical areas safe and functional." />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Operation Theatre", "Modular OT, laminar air flow, AGSS and scrub stations.", "modular-operation-theatre"],
              ["Medical Gas & Critical Care", "MGPS, bed head panels and ICU curtain systems.", "medical-gas-pipeline-system"],
              ["CSSD & Hospital Furniture", "Sterile services planning and ward furniture packages.", "cssd-systems"],
            ].map(([t, d, slug]) => (
              <Link key={t} to="/products/$slug" params={{ slug }} className="group border border-border p-7 hover:border-brand-blue">
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-navy py-20 text-navy-foreground">
        <div className="container-x">
          <p className="eyebrow text-navy-foreground/70">Our Process</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold md:text-4xl">From Hospital Requirement to Complete Installation</h2>
          <ol className="mt-12 grid gap-px bg-navy-foreground/15 md:grid-cols-3 lg:grid-cols-6">
            {steps.map(([n, t, d]) => (
              <li key={n} className="bg-navy p-6">
                <span className="font-display text-3xl font-extrabold text-accent">{n}</span>
                <h3 className="mt-3 font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="py-20">
        <div className="container-x">
          <SectionHead eyebrow="Who We Serve" title="Solutions for Healthcare Facilities" />
          <ul className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3 lg:grid-cols-4">
            {facilities.map((f) => <li key={f} className="bg-background px-5 py-5 text-sm font-semibold">{f}</li>)}
          </ul>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="border-t border-border bg-muted py-20">
        <div className="container-x">
          <SectionHead eyebrow="Our Work" title="Hospital Infrastructure Projects" intro="A selection of the systems we deliver. Project photographs from completed installations will be added here." />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <figure key={p.slug} className="relative aspect-square overflow-hidden bg-background">
                <img src={p.image} alt={p.shortName} loading="lazy" width={600} height={600} className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-navy/85 px-3 py-2 text-xs font-semibold text-navy-foreground">{p.shortName}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="container-x">
          <SectionHead eyebrow="Testimonials" title="What Our Clients Say" />
          <div className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Client testimonials will appear here once they are added and approved.
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section className="bg-navy py-20 text-navy-foreground">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">Planning a New Hospital or Upgrading Your Existing Facility?</h2>
            <p className="mt-4 leading-relaxed text-navy-foreground/80">Share your requirement with our team and get the right medical infrastructure solution for your project.</p>
            <div className="mt-8 border-t border-navy-foreground/20 pt-6 text-sm text-navy-foreground/75">
              <p className="font-semibold text-navy-foreground">Popular locations</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {locations.slice(0, 6).map((l) => (
                  <Link key={l.slug} to="/modular-operation-theatre-manufacturer/$state" params={{ state: l.slug }} className="underline-offset-4 hover:underline">Modular OT in {l.name}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-background p-6 text-foreground md:p-8 lg:col-span-7">
            <EnquiryForm source="consultation" variant="lead" submitLabel="Request a Consultation" />
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="py-20">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <SectionHead eyebrow="Insights" title="Medical Infrastructure Insights" />
            <Link to="/blog" className="mb-10 hidden text-sm font-semibold text-brand-blue hover:underline md:block">All articles →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {blogs.slice(0, 3).map((b) => <BlogCard key={b.slug} b={b} />)}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

