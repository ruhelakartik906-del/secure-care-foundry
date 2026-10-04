import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => seo("Privacy Policy | Unicare Medical Solutions", "How Unicare Medical Solutions collects and uses information submitted through this website.", "/privacy-policy"),
  component: () => (
    <LegalPage title="Privacy Policy" sections={[
      ["Information we collect", "When you submit an enquiry we collect the details you provide, such as your name, organisation, phone number, email, location and project requirement."],
      ["How we use it", "We use this information only to respond to your enquiry, prepare quotations and communicate about your project."],
      ["Sharing", "We do not sell your information. It may be shared with team members or partners only as needed to respond to your requirement."],
      ["Contact", "For any privacy question, please contact us using the details on our Contact page."],
    ]} />
  ),
});
