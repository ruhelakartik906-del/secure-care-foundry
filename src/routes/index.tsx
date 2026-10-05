import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, ArrowRight, Building2, Check, ClipboardCheck, Cross, Factory, GraduationCap, HeartPulse, Hospital, Layers, MessageCircle, Microscope, Phone, ScanLine, ShieldCheck, Stethoscope, Wrench } from "lucide-react";
import hero from "@/assets/modular-ot.jpg";
import { modularOtOptions, products } from "@/data/products";
import { blogs } from "@/data/blogs";
import { site, whatsappLink } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProductCard, SectionHead, CtaBand } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { BlogCard } from "@/components/site/BlogCard";
import { useEnquiry } from "@/components/site/EnquiryDialog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Modular Operation Theatre Manufacturers | Unicare Medical Solutions", "Modular operation theatre manufacturers providing design, manufacturing, installation, medical gas pipeline systems and hospital infrastructure solutions across India.", "/"),
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

function Home() {
  const { open } = useEnquiry();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => { supabase.from("cms_testimonials").select("id,client_name,designation,company,city,testimonial,rating").eq("published", true).order("sort_order").limit(6).then(({ data }) => setTestimonials(data ?? [])); }, []);
  return <>
    <section className="bg-navy text-navy-foreground">
      <div className="site-wrap grid min-h-[560px] items-stretch lg:grid-cols-2">
        <div className="flex flex-col justify-center py-16 lg:pr-12">
          <p className="eyebrow text-navy-foreground/75">Medical Engineering · Manufacturing · Installation</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] md:text-5xl">Modular Operation Theatre Manufacturers &amp; Hospital Infrastructure Solutions</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/80">Design, manufacturing and installation of modular operation theatres, medical gas pipeline systems and critical hospital infrastructure for hospitals, healthcare facilities and medical projects across India.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => open("Modular Operation Theatre")}>Request a Quote</Button><Button size="lg" variant="outline" className="rounded-sm border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" asChild><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Now</a></Button></div>
          <div className="mt-8 grid gap-2 text-sm sm:grid-cols-2">{trust.map((item) => <span key={item.title} className="flex items-center gap-2 text-navy-foreground/85"><Check className="h-4 w-4 text-accent" />{item.title}</span>)}</div>
        </div>
        <div className="relative min-h-[320px] lg:min-h-full"><img src={hero} alt="Professional modular operation theatre by Unicare Medical Solutions" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-navy to-transparent lg:block" /></div>
      </div>
    </section>

    <section className="border-b border-border bg-background"><div className="site-wrap grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">{trust.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 bg-background px-5 py-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/5"><Icon className="h-5 w-5 text-accent" /></div><div><h2 className="text-sm font-bold uppercase">{title}</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p></div></div>)}</div></section>

    <section className="bg-muted py-20"><div className="site-wrap"><SectionHead eyebrow="Our Products" title="Complete Hospital Infrastructure & Medical Engineering Solutions" intro="Project-ready systems for operation theatres, medical gases, critical care, sterilisation and hospital wards." /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.slug} p={p} />)}</div></div></section>

    <section className="py-20"><div className="site-wrap"><div className="grid items-center gap-12 lg:grid-cols-2"><img src={hero} alt="Modular operation theatre design and installation" loading="lazy" width={1600} height={1008} className="aspect-[4/3] w-full object-cover" /><div><p className="eyebrow">Primary Solution</p><h2 className="mt-2 text-3xl font-bold md:text-4xl">Modular Operation Theatre Solutions</h2><p className="mt-5 leading-relaxed text-muted-foreground">Unicare provides coordinated Modular OT design, manufacturing and installation for new hospitals and theatre upgrades. Every proposal is prepared around room size, selected materials, airflow requirements and site scope.</p><div className="mt-6 grid gap-2 text-sm sm:grid-cols-2">{["Room-specific OT design", "Panel manufacturing", "Airflow and services integration", "Installation and commissioning"].map((x) => <span key={x} className="flex gap-2"><Check className="h-4 w-4 text-accent" />{x}</span>)}</div><Button size="lg" className="mt-8 rounded-sm" onClick={() => open("Modular Operation Theatre")}>Discuss Your Modular OT Project</Button></div></div><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{modularOtOptions.map((option) => <article key={option.slug} className="group border border-border bg-background"><Link to="/products/modular-operation-theatre/$variant" params={{ variant: option.slug }} className="block aspect-[16/9] overflow-hidden"><img src={option.image} alt={option.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" /></Link><div className="p-5"><h3 className="text-lg font-bold">{option.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.description}</p><Button variant="outline" className="mt-4 rounded-sm" onClick={() => open(option.name)}>Enquire Now</Button></div></article>)}</div></div></section>

    <section className="border-y border-border bg-muted py-20"><div className="site-wrap"><SectionHead eyebrow="Why Unicare" title="Why Choose Unicare Medical Solutions?" /><div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">{why.map(({ icon: Icon, title, text }) => <article key={title} className="bg-background p-6"><Icon className="h-6 w-6 text-brand-blue" /><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section className="py-20"><div className="site-wrap"><SectionHead eyebrow="Who We Serve" title="Solutions for Healthcare Facilities" intro="Healthcare infrastructure solutions designed for hospitals, medical facilities and specialized healthcare projects." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{facilities.map(({ icon: Icon, title, text }) => <article key={title} className="border border-border bg-background p-5 transition hover:border-brand-blue hover:shadow-sm"><Icon className="h-6 w-6 text-brand-blue" /><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section className="bg-navy py-20 text-navy-foreground"><div className="site-wrap grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><p className="eyebrow text-navy-foreground/70">Project Enquiry</p><h2 className="mt-2 text-3xl font-bold md:text-4xl">Discuss Your Hospital Infrastructure Project</h2><p className="mt-4 text-navy-foreground/80">Tell us about your requirement and our team will get in touch with you.</p><div className="mt-6 flex gap-3"><Button variant="outline" className="rounded-sm border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" asChild><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Us</a></Button><Button variant="outline" className="rounded-sm border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" asChild><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp Us</a></Button></div></div><div className="bg-background p-6 text-foreground md:p-8 lg:col-span-7"><EnquiryForm source="homepage" variant="lead" submitLabel="Send Enquiry" /></div></div></section>

    <section className="bg-muted py-20"><div className="site-wrap"><SectionHead eyebrow="Client Testimonials" title="What Our Clients Say" />{testimonials.length ? <div className="grid gap-6 md:grid-cols-3">{testimonials.map((item) => <article key={item.id} className="border border-border bg-background p-6"><div className="text-accent" aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(item.rating)}</div><blockquote className="mt-4 leading-relaxed text-muted-foreground">“{item.testimonial}”</blockquote><p className="mt-5 font-bold">{item.client_name}</p><p className="text-sm text-muted-foreground">{[item.designation, item.company, item.city].filter(Boolean).join(" · ")}</p></article>)}</div> : <div className="border border-dashed border-border bg-background p-10 text-center"><ShieldCheck className="mx-auto h-7 w-7 text-brand-blue" /><p className="mt-3 text-sm text-muted-foreground">Verified client testimonials will appear here after they are published.</p></div>}</div></section>

    <section className="py-20"><div className="site-wrap"><div className="flex items-end justify-between gap-4"><SectionHead eyebrow="Latest Insights" title="Hospital Infrastructure Insights" /><Link to="/blog" className="mb-10 hidden text-sm font-semibold text-brand-blue hover:underline md:block">All articles <ArrowRight className="inline h-4 w-4" /></Link></div><div className="grid gap-6 md:grid-cols-3">{blogs.slice(0, 3).map((b) => <BlogCard key={b.slug} b={b} />)}</div></div></section>
    <CtaBand />
  </>;
}