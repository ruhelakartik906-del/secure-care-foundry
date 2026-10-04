import { createFileRoute } from "@tanstack/react-router";
import cssd from "@/assets/cssd.jpg";
import { PageHero, CtaBand } from "@/components/site/common";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us | Unicare Medical Solutions", "Unicare Medical Solutions designs, manufactures and installs hospital infrastructure including modular OTs and medical gas pipeline systems.", "/about"),
  component: About,
});

const blocks = [
  ["Who We Are", "Unicare Medical Solutions is a hospital infrastructure company focused on operation theatres, medical gas systems, critical care and sterile services."],
  ["Our Mission", "To help healthcare facilities build safe, functional clinical environments through well-planned, well-executed infrastructure projects."],
  ["Our Vision", "To be a dependable infrastructure partner for hospitals and healthcare projects across India."],
  ["What We Do", "Modular operation theatres, medical gas pipeline systems, AGSS, laminar air flow, CSSD, scrub stations, bed head panels, ICU curtain systems and hospital furniture."],
  ["Manufacturing", "Panels, systems and fittings are fabricated for each project before delivery to site."],
  ["Installation", "Our site teams install, test and commission systems in coordination with your contractors."],
  ["Project Support", "From requirement and drawings through handover, one team coordinates your project."],
  ["Quality Commitment", "We follow defined checks at manufacturing, installation and testing stages."],
];

function About() {
  return (
    <>
      <PageHero title="About Unicare Medical Solutions" intro="Hospital infrastructure, planned and delivered as one project." crumbs={[{ label: "About Us" }]} />
      <section className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <img src={cssd} alt="Hospital sterile services department" loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full object-cover" />
        <div className="grid gap-px self-start border border-border bg-border sm:grid-cols-2">
          {blocks.map(([t, d]) => (
            <div key={t} className="bg-background p-6"><h2 className="text-lg font-bold">{t}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-muted py-16">
        <div className="container-x max-w-3xl">
          <h2 className="text-3xl font-bold">Why Hospitals Trust Us</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">Hospitals work with us because we take responsibility for the full scope — planning, manufacturing, installation and support. Certifications, years of experience and project references will be listed here once provided.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
