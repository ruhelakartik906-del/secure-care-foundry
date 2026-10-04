import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  head: () => seo("Disclaimer | Unicare Medical Solutions", "General disclaimer for information published on the Unicare Medical Solutions website.", "/disclaimer"),
  component: () => (
    <LegalPage title="Disclaimer" sections={[
      ["General information", "Content on this website is provided for general information about our products and services. Specifications, images and descriptions are indicative and may vary by project."],
      ["Pricing", "Prices are confirmed only through a written quotation based on your specific requirement."],
      ["Images", "Some images are representative and may not show an actual Unicare installation."],
    ]} />
  ),
});
