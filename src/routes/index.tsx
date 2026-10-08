import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, ArrowRight, Building2, Check, ClipboardCheck, Cross, Factory, GraduationCap, HeartPulse, Hospital, Layers, Microscope, Phone, ScanLine, ShieldCheck, Stethoscope, Wrench } from "lucide-react";
import { mergeHome, homeDefaults } from "@/data/home-content";
import { modularOtOptions, products } from "@/data/products";
import { cities, cityPath } from "@/data/cities";
import { pricing } from "@/data/pricing";
import { compliance } from "@/data/resources";
import { homeFaqs } from "@/data/faqs";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProductCard, SectionHead, CtaBand, Faqs, faqSchema } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { useEnquiry } from "@/components/site/EnquiryDialog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({ ...seo("Modular OT Manufacturer in India | Unicare Medical Solutions", "Modular OT manufacturer in India: design, manufacturing and installation of modular operation theatres, medical gas pipeline systems, laminar air flow and hospital infrastructure.", "/"), scripts: [faqSchema(homeFaqs)] }),
  loader: async () => { const { data } = await supabase.from("cms_pages").select("content").eq("slug", "home").maybeSingle(); return { home: mergeHome(data?.content) }; },
  errorComponent: () => null,
  component: Home,
});

const trust = [
  { icon: Factory, title: "Quality Manufacturing", text: "Built for demanding healthcare environments." },
  { icon: Wrench, title: "Professional Installation", text: "Planned and executed for project requirements." },
  { icon: ClipboardCheck, title: "Project Support", text: "Support from planning through installation." },
  { icon: Hospital, title: "Hospital Infrastructure Expertise", text: "Solutions for modern healthcare facilities." },
];
const why = [
  { icon: Factory, title: "Quality Manufacturing", text: "Project-focused fabrication for demanding healthcare environments." },
  { icon: Wrench, title: "Professional Installation", text: "Coordinated execution, testing and commissioning at site." },
  { icon: ClipboardCheck, title: "Project Support", text: "Technical coordination from requirement through handover." },
  { icon: Hospital, title: "Hospital Infrastructure Expertise", text: "Integrated solutions for surgical and critical-care spaces." },
  { icon: Layers, title: "Customized Project Solutions", text: "Layouts and scope configured around each facility." },
];
const facilities = [
  { icon: Hospital, title: "Hospitals", text: "Integrated infrastructure for new and expanding facilities." },
  { icon: Cross, title: "Multispecialty Hospitals", text: "Coordinated systems across surgical departments." },
  { icon: Building2, title: "Super Specialty Hospitals", text: "Solutions for advanced clinical environments." },
  { icon: HeartPulse, title: "Nursing Homes", text: "Practical infrastructure for compact facilities." },
  { icon: Stethoscope, title: "Clinics", text: "Equipment and fit-outs for procedure-led clinics." },
  { icon: ScanLine, title: "Diagnostic Centres", text: "Solutions configured around diagnostic workflows." },
  { icon: Building2, title: "Government Hospitals", text: "Technical support for institutional projects." },
  { icon: GraduationCap, title: "Medical Colleges", text: "Infrastructure for teaching hospitals." },
  { icon: Layers, title: "Healthcare Projects", text: "Support for architects and project teams." },
  { icon: Activity, title: "Operation Theatre Projects", text: "Modular OT design, manufacture and installation." },
  { icon: HeartPulse, title: "ICU & Critical Care Areas", text: "Bedside and privacy systems for critical care." },
  { icon: Microscope, title: "CSSD Facilities", text: "Sterile-services planning and equipment support." },
];

type Testimonial = { id: string; client_name: string; designation: string | null; company: string | null; city: string | null; testimonial: string; rating: number };

const applications: [string, string][] = [
  ["General & Speciality OTs", "Modular theatres for general surgery, orthopaedics, cardiac, neuro and gynaecology."],
  ["ICU, NICU & HDU", "Bed head panels, pendants, gas outlets and curtain tracks for critical care."],
  ["Hospital-wide MGPS", "Oxygen, medical air, vacuum and nitrous oxide from source to outlet."],
  ["CSSD & Clean Zones", "Pass boxes, hermetic doors and sterile-services planning."],
];

const otherSolutions = products.filter((p) => ["ot-pendant", "led-surgical-light", "hermetic-ot-door", "pass-box", "modular-icu-nicu", "laminar-air-flow"].includes(p.slug));

function Home() {
  const { open } = useEnquiry();
  const h = Route.useLoaderData()?.home ?? homeDefaults;
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => { supabase.from("cms_testimonials").select("id,client_name,designation,company,city,testimonial,rating").eq("published", true).order("sort_order").limit(6).then(({ data }) => setTestimonials(data ?? [])); }, []);
  return <>
    <section className="bg-navy text-navy-foreground">
      <div className="site-wrap grid min-h-[560px] items-stretch lg:grid-cols-2">
        <div className="flex flex-col justify-center py-16 lg:pr-12">
          <p className="eyebrow text-navy-foreground/75">{h.heroEyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] md:text-5xl">{h.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/80">{h.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => open("Modular Operation Theatre")}>{h.heroButton}</Button><Button size="lg" variant="outline" className="rounded-sm border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" asChild><a href={whatsappLink("Hello, I would like to know more about your Modular Operation Theatre solutions.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-4 w-4" />WhatsApp Us</a></Button><a href={site.phoneHref} className="inline-flex items-center gap-2 px-2 text-sm font-semibold text-navy-foreground/90 hover:underline"><Phone className="h-4 w-4" />{site.phone}</a></div>
          <div className="mt-8 grid gap-2 text-sm sm:grid-cols-2">{trust.map((item) => <span key={item.title} className="flex items-center gap-2 text-navy-foreground/85"><Check className="h-4 w-4 text-accent" />{item.title}</span>)}</div>
        </div>
        <div className="relative min-h-[320px] lg:min-h-full"><img src={h.heroImage} alt={h.heroImageAlt} width={1400} height={882} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-navy to-transparent lg:block" /></div>
      </div>
    </section>
    <section className="border-b border-border bg-background"><div className="site-wrap grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">{trust.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 bg-background px-5 py-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/5"><Icon className="h-5 w-5 text-accent" /></div><div><p className="text-sm font-bold uppercase">{title}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p></div></div>)}</div></section>


    <section className="bg-muted py-20"><div className="site-wrap"><SectionHead eyebrow="Our Products" title={h.productsTitle} intro={h.productsIntro} /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0, 6).map((p) => <ProductCard key={p.slug} p={p} />)}</div><div className="mt-10 text-center"><Link to="/products" className="font-semibold text-brand-blue hover:underline">View All Products →</Link></div></div></section>

    <section className="py-20"><div className="site-wrap"><div className="grid items-center gap-12 lg:grid-cols-2"><img src={h.otImage} alt={h.otImageAlt} loading="lazy" width={1400} height={882} className="aspect-[4/3] w-full object-cover" /><div><p className="eyebrow">Primary Solution</p><h2 className="mt-2 text-3xl font-bold md:text-4xl">{h.otTitle}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{h.otText}</p><div className="mt-6 grid gap-2 text-sm sm:grid-cols-2">{["Room-specific OT design", "Panel manufacturing", "Airflow and services integration", "Installation and commissioning"].map((x) => <span key={x} className="flex gap-2"><Check className="h-4 w-4 text-accent" />{x}</span>)}</div><Button size="lg" className="mt-8 rounded-sm" onClick={() => open("Modular Operation Theatre")}>Discuss Your Modular OT Project</Button></div></div><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{modularOtOptions.map((option) => <article key={option.slug} className="group border border-border bg-background"><Link to="/products/modular-operation-theatre/$variant" params={{ variant: option.slug }} className="block aspect-[16/9] overflow-hidden"><img src={option.image} alt={option.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" /></Link><div className="p-5"><h3 className="text-lg font-bold">{option.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.description}</p><Button variant="outline" className="mt-4 rounded-sm" onClick={() => open(option.name)}>Enquire Now</Button></div></article>)}</div></div></section>

    <section className="border-y border-border bg-muted py-20"><div className="site-wrap grid items-center gap-12 lg:grid-cols-2"><div><p className="eyebrow">Medical Gas Systems</p><h2 className="mt-2 text-3xl font-bold md:text-4xl">{h.mgpsTitle}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{h.mgpsText}</p><div className="mt-6 grid gap-2 text-sm sm:grid-cols-2">{["Source equipment & manifolds", "Copper pipeline distribution", "Valve boxes & alarm panels", "Testing & commissioning"].map((x) => <span key={x} className="flex gap-2"><Check className="h-4 w-4 text-accent" />{x}</span>)}</div><div className="mt-8 flex flex-wrap gap-3"><Button size="lg" className="rounded-sm" onClick={() => open("Medical Gas Pipeline System")}>Get MGPS Quote</Button><Button size="lg" variant="outline" className="rounded-sm" asChild><Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }}>View MGPS</Link></Button></div></div><img src={h.mgpsImage} alt={h.mgpsImageAlt} loading="lazy" width={1128} height={716} className="aspect-[4/3] w-full object-cover" /></div></section>

    <section className="py-20"><div className="site-wrap"><SectionHead eyebrow="Other Solutions" title="OT Equipment & Critical Care Solutions" intro="Pendants, surgical lights, hermetic doors, pass boxes and ICU/NICU fit-outs that complete your theatre and critical-care areas." /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{otherSolutions.map((p) => <ProductCard key={p.slug} p={p} />)}</div></div></section>

    <section className="border-y border-border bg-muted py-20"><div className="site-wrap"><SectionHead eyebrow="Why Unicare" title="Why Choose Unicare Medical Solutions?" /><div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">{why.map(({ icon: Icon, title, text }) => <article key={title} className="bg-background p-6"><Icon className="h-6 w-6 text-brand-blue" /><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section className="py-20"><div className="site-wrap"><SectionHead eyebrow="Who We Serve" title="Healthcare Facilities We Serve" intro="Infrastructure planned for hospitals, nursing homes, medical colleges and institutional healthcare projects." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{facilities.map(({ icon: Icon, title, text }) => <article key={title} className="border border-border bg-background p-5 transition hover:border-brand-blue hover:shadow-sm"><Icon className="h-6 w-6 text-brand-blue" /><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section className="py-20"><div className="site-wrap"><SectionHead eyebrow="Compliance" title="Standards Referenced in OT & MGPS Projects" intro="General overviews to help your team plan. We design to the standards your hospital or consultant specifies." /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{compliance.map((c) => <Link key={c.slug} to="/resources/compliance/$slug" params={{ slug: c.slug }} className="flex items-start gap-3 border border-border p-4 text-sm font-medium transition hover:border-brand-blue"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />{c.title.replace(/ – An Overview$/, "")}</Link>)}</div><div className="mt-8"><Link to="/resources" className="font-semibold text-brand-blue hover:underline">All resources →</Link></div></div></section>

    <section className="py-20"><div className="site-wrap"><SectionHead eyebrow="Applications" title="Where Our Systems Are Used" intro="Typical theatre and critical-care applications we plan for. Verified project case studies will be published here once approved by clients." /><div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{applications.map(([t, d]) => <article key={t} className="bg-background p-5"><h3 className="font-bold">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></article>)}</div></div></section>

    {testimonials.length > 0 && <section className="bg-muted py-20" aria-labelledby="testimonials-heading"><div className="site-wrap">
      <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Client Testimonials</p><h2 id="testimonials-heading" className="mt-2 text-3xl font-bold md:text-4xl">Trusted by Healthcare Professionals</h2><p className="mt-4 text-muted-foreground">Reliable medical infrastructure solutions designed around the operational and clinical requirements of modern healthcare facilities.</p></div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{testimonials.map((item) => <article key={item.id} className="flex h-full flex-col rounded-md border border-border bg-background p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="text-accent" aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(Math.max(1, Math.min(5, item.rating)))}</div>
        <blockquote className="mt-4 flex-1 leading-relaxed text-muted-foreground">“{item.testimonial}”</blockquote>
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary" aria-hidden="true">{item.client_name.replace(/^Dr\.?\s*/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("")}</div><div className="min-w-0"><h3 className="font-bold leading-tight">{item.client_name}</h3><p className="text-sm text-muted-foreground">{[item.designation, item.company, item.city].filter(Boolean).join(" · ")}</p></div></div>
      </article>)}</div>
      <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-md border border-border bg-background p-6 md:flex-row md:items-center md:p-8"><div><h3 className="text-xl font-bold">Planning a New Operation Theatre or Hospital Infrastructure Project?</h3><p className="mt-2 text-muted-foreground">Talk to our team about your project requirements, site conditions and installation needs.</p></div><div className="flex shrink-0 flex-wrap gap-3"><Button className="rounded-sm" onClick={() => open("Modular Operation Theatre")}>Get a Quote</Button><Button variant="outline" className="rounded-sm" asChild><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Us</a></Button></div></div>
    </div></section>}

    <section className="border-y border-border bg-muted py-20"><div className="site-wrap"><SectionHead eyebrow="Cities" title="Modular OT Manufacturer – Priority Cities" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{cities.map((c) => <a key={c.slug} href={cityPath(c)} className="flex items-center justify-between border border-border bg-background p-4 font-medium transition hover:border-brand-blue">Modular OT in {c.name}<ArrowRight className="h-4 w-4 text-brand-blue" /></a>)}</div><div className="mt-8"><Link to="/locations" className="font-semibold text-brand-blue hover:underline">All service locations →</Link></div></div></section>

    <section className="py-20"><div className="site-wrap grid gap-10 lg:grid-cols-12"><div className="lg:col-span-5"><p className="eyebrow">Pricing Guide</p><h2 className="mt-2 text-3xl font-bold md:text-4xl">Indicative Modular OT Cost in India</h2><p className="mt-4 text-muted-foreground">Indicative ranges only — not a quotation. Your final price is confirmed after reviewing drawings, specifications and site.</p><Button size="lg" className="mt-6 rounded-sm" asChild><Link to="/modular-ot-cost-india">View Full Pricing Guide</Link></Button></div><div className="overflow-x-auto border border-border lg:col-span-7"><table className="w-full text-left text-sm"><tbody>{pricing.map((r) => <tr key={r.item} className="border-b border-border last:border-0"><td className="p-3 font-medium">{r.item}</td><td className="p-3 font-semibold text-brand-blue">{r.range}</td><td className="p-3 text-muted-foreground">{r.unit}</td></tr>)}</tbody></table></div></div></section>

    <section className="border-t border-border bg-muted py-20"><div className="site-wrap max-w-4xl"><SectionHead eyebrow="FAQs" title="Frequently Asked Questions" /><Faqs faqs={homeFaqs} /><div className="mt-6"><Link to="/faqs" className="font-semibold text-brand-blue hover:underline">View all FAQs →</Link></div></div></section>

    <section className="bg-navy py-20 text-navy-foreground"><div className="site-wrap grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><p className="eyebrow text-navy-foreground/70">Project Enquiry</p><h2 className="mt-2 text-3xl font-bold md:text-4xl">Discuss Your Hospital Infrastructure Project</h2><p className="mt-4 text-navy-foreground/80">Tell us about your requirement and our team will get in touch with you.</p><div className="mt-6 flex gap-3"><Button variant="outline" className="rounded-sm border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" asChild><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Us</a></Button><Button variant="outline" className="rounded-sm border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" asChild><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-4 w-4" />WhatsApp Us</a></Button></div></div><div className="bg-background p-6 text-foreground md:p-8 lg:col-span-7"><EnquiryForm source="homepage" variant="lead" submitLabel="Send Enquiry" /></div></div></section>

    <CtaBand />
  </>;
}