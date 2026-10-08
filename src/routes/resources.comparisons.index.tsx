import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/site/common";
import { ResourceList } from "@/components/site/ResourcePage";
import { comparisons } from "@/data/resources";
import { seo, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/resources/comparisons/")({
  head: () => {
    const s = seo("Modular OT Comparisons – Panels, LAF, Pendants, Lights | Unicare", "Compare modular vs conventional OT, PUF vs HPL panels, LAF vs conventional HVAC, single vs double arm pendants and surgical light options.", "/resources/comparisons");
    return { ...s, scripts: [breadcrumbSchema([{ name: "Resources", path: "/resources" }, { name: "Comparisons", path: "/resources/comparisons" }])] };
  },
  component: () => <>
    <PageHero title="Operation Theatre Comparisons" intro="Side-by-side comparisons to help hospital teams choose the right theatre systems for their project." crumbs={[{ label: "Resources", to: "/resources" }, { label: "Comparisons" }]} />
    <section className="site-wrap py-12"><ResourceList items={comparisons} base="comparisons" /></section>
    <CtaBand />
  </>,
});
