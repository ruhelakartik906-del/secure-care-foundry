import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/site/common";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => seo("Projects | Unicare Medical Solutions", "Modular operation theatre and hospital infrastructure projects by Unicare Medical Solutions. Contact us to request project references.", "/projects", { index: false }),
  component: Projects,
});

function Projects() {
  return <>
    <PageHero title="Our Projects" intro="Modular operation theatre and hospital infrastructure work for healthcare facilities." crumbs={[{ label: "Projects" }]} />
    <section className="site-wrap py-14">
      <div className="max-w-2xl border border-border bg-muted p-6">
        <h2 className="text-xl font-bold">Project portfolio being updated</h2>
        <p className="mt-2 text-sm text-muted-foreground">We are preparing detailed case studies with photographs. To see references relevant to your hospital, contact our team and we will share suitable project details.</p>
      </div>
    </section>
    <CtaBand />
  </>;
}
