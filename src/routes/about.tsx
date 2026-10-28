import { createFileRoute, Link } from "@tanstack/react-router";
const cssd = "/images/cssd-systems.webp";
import { PageHero, CtaBand } from "@/components/site/common";
import { seo } from "@/lib/seo";
import { site } from "@/data/site";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us | Unicare Medical Solutions", "Unicare Medical Solutions designs, manufactures and installs hospital infrastructure including modular OTs and medical gas pipeline systems.", "/about"),
  component: About,
});

const blocks = [
  ["Who We Are", "Unicare Medical Solutions is a medical engineering and hospital infrastructure company focused on operation theatres, medical gas systems, critical care and sterile services."],
  ["What We Do", "Modular operation theatres, medical gas pipeline systems, AGSS, laminar air flow, CSSD, scrub stations, bed head panels, ICU curtain systems and hospital furniture."],
  ["Our Expertise", "Coordinating specialised systems for surgical, sterile, ward and critical-care environments."],
  ["Manufacturing Capability", "Panels, systems and fittings are fabricated for each project before delivery to site."],
  ["Installation & Project Support", "Our site teams coordinate installation, testing and commissioning with hospital, civil and MEP teams."],
  ["Healthcare Facilities We Serve", "Hospitals, nursing homes, clinics, diagnostic centres, medical colleges and public healthcare projects."],
  ["Why Choose Us", "One accountable team for requirement review, technical planning, manufacturing, site execution and handover."],
];

function About() {
  return (
    <>
      <PageHero title="About Unicare Medical Solutions" intro="Hospital infrastructure, planned and delivered as one project." crumbs={[{ label: "About Us" }]} />
      <section className="site-wrap py-14">
        <div className="prose-unicare max-w-3xl">
          <h2>What Unicare does</h2>
          <p>Unicare Medical Solutions plans, supplies and installs modular operation theatres, medical gas pipeline systems, ICUs (planned to ISCCM guidelines), CSSD and medical furniture for hospitals across India. Alongside projects, we offer <Link to="/services/hospital-project-consulting">hospital project consulting</Link>, healthcare marketing consulting, and refurbishing and retrofitting of existing theatres and critical-care areas.</p>
          <p>Turnkey projects come with an 18 to 24 month warranty and 5 to 7 years of AMC support after the warranty.</p>
          <p>Talk to our team — North India: <a href={site.phoneHref}>{site.phone}</a> · South India sales and service: <a href={site.secondaryPhoneHref}>{site.secondaryPhone}</a>.</p>
        </div>
      </section>
      <section className="site-wrap grid gap-12 pb-16 lg:grid-cols-2">
        <ResponsiveImage src={cssd} alt="Hospital sterile services department" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
        <div className="grid gap-px self-start border border-border bg-border sm:grid-cols-2">
          {blocks.map(([t, d]) => (
            <div key={t} className="bg-background p-6"><h2 className="text-lg font-bold">{t}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-muted py-16">
        <div className="site-wrap max-w-3xl">
          <h2 className="text-3xl font-bold">Hospital Infrastructure, Coordinated as One Project</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">We work with hospital owners, doctors, architects, consultants and contractors to translate clinical requirements into a practical manufacturing and installation scope.</p>
        </div>
      </section>
      <CtaBand title="Discuss Your Project" />
    </>
  );
}
