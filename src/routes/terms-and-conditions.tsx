import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => seo("Terms & Conditions | Unicare Medical Solutions", "Terms for using the Unicare Medical Solutions website.", "/terms-and-conditions"),
  component: () => (
    <LegalPage title="Terms & Conditions" sections={[
      ["Use of this website", "By using this website you agree to use it for lawful purposes related to enquiring about our products and services."],
      ["Quotations and orders", "Commercial terms, delivery, installation and warranty are governed by the written quotation or agreement issued for each project."],
      ["Intellectual property", "Website content, logo and branding belong to Unicare Medical Solutions and may not be reused without permission."],
    ]} />
  ),
});
