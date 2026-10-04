import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Us | Unicare Medical Solutions", "Contact Unicare Medical Solutions for modular OT, medical gas pipeline and hospital infrastructure quotations.", "/contact"),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero title="Contact Us" intro="Tell us about your project. Our team will respond with the right next step." crumbs={[{ label: "Contact Us" }]} />
      <section className="container-x grid gap-12 py-14 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <dl className="divide-y divide-border border-y border-border text-sm">
            {[["Address", site.address], ["Phone", site.phone], ["Email", site.email], ["Business hours", site.hours]].map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 py-4"><dt className="font-semibold">{k}</dt><dd className="col-span-2 break-words text-muted-foreground">{v}</dd></div>
            ))}
          </dl>
          <div className="grid grid-cols-2 gap-3">
            <Button size="lg" className="rounded-sm" asChild><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Now</a></Button>
            <Button size="lg" variant="outline" className="rounded-sm" asChild><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-border bg-muted text-sm text-muted-foreground">Map will appear once the office address is added</div>
        </div>
        <div className="border border-border p-6 md:p-8 lg:col-span-7">
          <h2 className="mb-6 text-2xl font-bold">Send an Enquiry</h2>
          <EnquiryForm source="contact" variant="contact" submitLabel="Send Enquiry" />
        </div>
      </section>
    </>
  );
}
