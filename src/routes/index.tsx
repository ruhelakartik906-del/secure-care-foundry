import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Building2, ClipboardCheck, Cross, Factory, GraduationCap, HeartPulse, Hospital, Microscope, PackageCheck, ScanLine, ShieldCheck, Stethoscope, Wrench } from "lucide-react";
import hero from "@/assets/modular-ot.jpg";
import { modularOtOptions, products } from "@/data/products";
import { blogs } from "@/data/blogs";
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
  { icon: Activity, t: "Technical Support", d: "Support after handover for maintenance and service requirements." },
  { icon: ClipboardCheck, t: "Reliable Project Execution", d: "Planned schedules and coordination with your contractors." },
];

const trust = [
  { icon: Factory, title: "Quality Manufacturing", text: "Built for demanding healthcare environments." },
  { icon: Wrench, title: "Professional Installation", text: "Planned and executed for project requirements." },
  { icon: ClipboardCheck, title: "Project Support", text: "Support from planning through installation." },
  { icon: Hospital, title: "Hospital Infrastructure Expertise", text: "Solutions for modern healthcare facilities." },
];

const steps = [
  ["01", "Understand Requirement", "We discuss your facility, departments, procedures and budget."],
  ["02", "Site / Project Assessment", "Our team reviews drawings, room sizes and existing services."],
  ["03", "Technical Planning", "Layouts, specifications and a project-specific proposal."],
  ["04", "Manufacturing", "Panels, systems and components are fabricated for your project."],
  ["05", "Installation", "Coordinated on-site installation with your civil and MEP teams."],
  ["06", "Testing & Handover", "Testing, commissioning and handover with documentation."],
];

const facilities = [
  { icon: Hospital, title: "Hospitals", text: "Integrated infrastructure for new and expanding hospital facilities." },
  { icon: Cross, title: "Multispecialty Hospitals", text: "Coordinated systems across surgical and critical-care departments." },
  { icon: Building2, title: "Super Specialty Hospitals", text: "Project-focused solutions for advanced clinical environments." },
  { icon: HeartPulse, title: "Nursing Homes", text: "Practical infrastructure planned for compact healthcare facilities." },
  { icon: Stethoscope, title: "Clinics", text: "Essential equipment and fit-outs for procedure-led clinics." },
  { icon: ScanLine, title: "Diagnostic Centres", text: "Clinical-area solutions configured around diagnostic workflows." },
  { icon: Building2, title: "Government Hospitals", text: "Technical support for institutional healthcare projects." },
  { icon: GraduationCap, title: "Medical Colleges", text: "Infrastructure for teaching hospitals and clinical departments." },
  { icon: Layers, title: "Healthcare Projects", text: "Planning support for architects, contractors and project teams." },
  { icon: Activity, title: "Operation Theatre Projects", text: "Modular OT design, manufacturing and coordinated installation." },
  { icon: HeartPulse, title: "ICU & Critical Care Areas", text: "Bedside systems and privacy solutions for critical-care zones." },
  { icon: Microscope, title: "CSSD Facilities", text: "Sterile-services planning, equipment and workflow support." },
];

function Home() {
  const { open } = useEnquiry();
  const ot = products[0]!;
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img src={hero} alt="Modular operation theatre with laminar air flow ceiling and surgical lights" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-35" fetchPriority="high" />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="site-wrap relative py-20 md:py-28 lg:py-32">
          <p className="eyebrow text-navy-foreground/80">Modular Operation Theatre · Hospital Infrastructure</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.08] md:text-6xl">Modular Operation Theatre Solutions for Modern Hospitals</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/85">
            Design, manufacturing and installation of modular operation theatres, medical gas pipeline systems and critical hospital infrastructure for healthcare projects across India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => open()}>Get a Quote</Button>
            <Button size="lg" variant="outline" className="rounded-sm border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" asChild>
              <Link to="/products">View Products</Link>
            </Button>
          </div>
          <Button variant="link" onClick={() => open("Modular Operation Theatre")} className="mt-4 h-auto px-0 text-navy-foreground">
            Discuss Your Hospital Project <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-border bg-background">
        <div className="site-wrap grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 bg-background px-5 py-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/5"><Icon className="h-5 w-5 text-accent" strokeWidth={1.7} /></div>
              <div><h2 className="text-sm font-bold uppercase">{title}</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="site-wrap grid gap-10 py-20 lg:grid-cols-12">
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
        <div className="site-wrap">
          <SectionHead eyebrow="Products" title="Our Medical Infrastructure Solutions" intro="Engineered systems for operation theatres, critical care, sterilisation and hospital wards — each configured to your project." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* FEATURED OT */}
      <section className="bg-background py-20">
        <div className="site-wrap grid items-center gap-12 lg:grid-cols-2">
          <img src={ot.image} alt="Modular operation theatre installation" loading="lazy" width={1600} height={1008} className="aspect-[4/3] w-full object-cover" />
          <div>
            <p className="eyebrow">Featured Solution</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">Modular Operation Theatre Solutions</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              As a modular operation theatre manufacturer, Unicare plans, manufactures and installs modular OTs for new hospitals and theatre upgrades. Modular OT price and cost depend on room size, selected materials, airflow requirements and installation scope, so every proposal is prepared around the project.
            </p>
            <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {["Modular OT design & layout", "Panel manufacturing", "Installation & commissioning", "Hospital project support", "Custom configurations", "Complete OT infrastructure"].map((x) => (
                <li key={x} className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-accent" />{x}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-sm" onClick={() => open(ot.name)}>Get Modular OT Quote</Button>
              <Button size="lg" variant="outline" className="rounded-sm" asChild><Link to="/products/$slug" params={{ slug: ot.slug }}>Explore Modular OT</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* MODULAR OT OPTIONS */}
      <section className="border-y border-border bg-muted py-20">
        <div className="site-wrap">
          <SectionHead eyebrow="Modular OT Range" title="Modular Operation Theatre Options" intro="Select an OT construction approach around your hospital layout, clinical use and project requirements." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modularOtOptions.map((option) => (
              <article key={option.slug} className="group bg-background border border-border">
                <Link to="/products/$slug" params={{ slug: ot.slug }} hash={option.slug} className="block aspect-[16/9] overflow-hidden"><img src={option.image} alt={option.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /></Link>
                <div className="p-5"><h3 className="text-lg font-bold">{option.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.description}</p><Link to="/products/$slug" params={{ slug: ot.slug }} hash={option.slug} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">View Details <ArrowRight className="h-4 w-4" /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="py-20">
        <div className="site-wrap">
          <SectionHead eyebrow="Who We Serve" title="Solutions for Healthcare Facilities" intro="Medical infrastructure and equipment solutions designed for hospitals, healthcare institutions and critical-care environments." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {facilities.map(({ icon: Icon, title, text }) => <article key={title} className="group border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-sm"><Icon className="h-6 w-6 text-brand-blue" strokeWidth={1.5} /><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-border bg-muted py-20">
        <div className="site-wrap">
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

      {/* PROCESS */}
      <section className="bg-navy py-20 text-navy-foreground">
        <div className="site-wrap">
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

      {/* TESTIMONIALS */}
      <section className="border-t border-border bg-muted py-20">
        <div className="site-wrap">
          <SectionHead eyebrow="Client Testimonials" title="Trusted by Healthcare Projects" intro="See what our clients say about working with Unicare Medical Solutions." />
          <div className="border border-dashed border-border bg-background p-10 text-center">
            <ShieldCheck className="mx-auto h-7 w-7 text-brand-blue" />
            <p className="mt-3 text-sm text-muted-foreground">Verified client testimonials will appear here after they are published.</p>
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section className="bg-navy py-20 text-navy-foreground">
        <div className="site-wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">Planning a New Hospital or Upgrading Your Existing Facility?</h2>
            <p className="mt-4 leading-relaxed text-navy-foreground/80">Share your requirement with our team and get the right medical infrastructure solution for your project.</p>
          </div>
          <div className="bg-background p-6 text-foreground md:p-8 lg:col-span-7">
            <EnquiryForm source="consultation" variant="lead" submitLabel="Request a Quote" />
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="py-20">
        <div className="site-wrap">
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

