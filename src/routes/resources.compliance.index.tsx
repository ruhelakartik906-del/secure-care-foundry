import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/site/common";
import { ResourceList } from "@/components/site/ResourcePage";
import { compliance, complianceDisclaimer } from "@/data/resources";
import { seo, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/resources/compliance/")({
  head: () => {
    const s = seo("OT & MGPS Compliance Guides – NABH, HTM, NFPA, ISO | Unicare", "General overviews of NABH, HTM 02-01, NFPA 99, ISO 13485, CDSCO MDR 2017 and IEC 60601-2-41 as referenced in operation theatre projects.", "/resources/compliance");
    return { ...s, scripts: [breadcrumbSchema([{ name: "Resources", path: "/resources" }, { name: "Compliance", path: "/resources/compliance" }])] };
  },
  component: () => <>
    <PageHero title="Compliance Guides for Operation Theatres and MGPS" intro="Plain-language overviews of the standards and regulations commonly referenced in hospital infrastructure projects." crumbs={[{ label: "Resources", to: "/resources" }, { label: "Compliance" }]} />
    <section className="site-wrap py-12"><ResourceList items={compliance} base="compliance" /><p className="mt-8 border-l-4 border-accent bg-muted p-4 text-sm">{complianceDisclaimer}</p></section>
    <CtaBand />
  </>,
});
