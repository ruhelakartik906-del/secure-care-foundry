import { createFileRoute } from "@tanstack/react-router";
import cssd from "@/assets/cssd.webp";
import { PageHero, CtaBand } from "@/components/site/common";
import { seo } from "@/lib/seo";

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
      <section className="site-wrap grid gap-12 py-16 lg:grid-cols-2">
        <img src={cssd} alt="Hospital sterile services department" loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full object-cover" />
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
