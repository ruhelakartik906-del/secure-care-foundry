import { createFileRoute } from "@tanstack/react-router";
import { Clock, Factory, Mail, MapPin, Navigation, Phone } from "lucide-react";
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
  const mapQuery = encodeURIComponent("357 Malkhan Singh Complex Opp Ambedkar Bhawan Dasna Road Ghaziabad 201001 Uttar Pradesh India");
  return (
    <>
      <PageHero title="Contact Unicare Medical Solutions" intro="Tell us about your hospital, OT or medical infrastructure requirement. Our team can discuss the project scope, technical requirements, product options and estimated project requirements." crumbs={[{ label: "Contact Us" }]} />
      <section className="site-wrap grid gap-12 py-14 lg:grid-cols-12">
        <div className="border border-border p-6 md:p-8 lg:col-span-7">
          <p className="eyebrow">Project Enquiry</p><h2 className="mb-2 mt-2 text-3xl font-bold">Get In Touch</h2><p className="mb-6 text-muted-foreground">Share your hospital, Modular OT or medical infrastructure requirement.</p>
          <EnquiryForm source="contact" variant="contact" submitLabel="Send Enquiry" />
        </div>
        <div className="space-y-6 lg:col-span-5">
          <div><p className="eyebrow">Contact Details</p><h2 className="mt-2 text-3xl font-bold">Unicare Medical Solutions</h2></div>
          <div className="divide-y divide-border border-y border-border text-sm">
            <div className="flex gap-4 py-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" /><div><h3 className="font-bold">Office Address</h3><p className="mt-1 text-muted-foreground">{site.officeAddress}</p></div></div>
            <div className="flex gap-4 py-4"><Factory className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" /><div><h3 className="font-bold">Works Address</h3><p className="mt-1 text-muted-foreground">{site.worksAddress}</p></div></div>
            <div className="flex gap-4 py-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" /><div><h3 className="font-bold">Phone</h3><p className="mt-1 text-sm text-muted-foreground">Primary Contact &amp; WhatsApp: <a href={site.phoneHref} className="font-semibold text-foreground hover:text-brand-blue">{site.phone}</a></p><p className="text-sm text-muted-foreground">Alternate Contact: <a href={site.secondaryPhoneHref} className="hover:text-brand-blue">{site.secondaryPhone}</a></p></div></div>
            <div className="flex gap-4 py-4"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" /><div><h3 className="font-bold">Email</h3><a href={`mailto:${site.email}`} className="mt-1 block break-all text-muted-foreground hover:text-brand-blue">{site.email}</a></div></div>
            <div className="flex gap-4 py-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" /><div><h3 className="font-bold">Working Hours</h3><p className="mt-1 text-muted-foreground">{site.hours}</p></div></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <Button className="rounded-sm" asChild><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Now</a></Button>
            <Button variant="outline" className="rounded-sm" asChild><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a></Button>
            <Button variant="outline" className="rounded-sm" asChild><a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer"><Navigation className="h-4 w-4" />Directions</a></Button>
          </div>
          <iframe title="Unicare Medical Solutions office map" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/3] w-full border border-border" />
        </div>
      </section>
    </>
  );
}
