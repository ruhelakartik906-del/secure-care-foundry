import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/get-a-quote")({
  head: () => seo("Get a Quote for Modular OT & Hospital Projects | Unicare", "Request a project-specific quotation for a modular operation theatre, medical gas pipeline or hospital infrastructure work. Share your requirement with Unicare.", "/get-a-quote"),
  component: Quote,
});

function Quote() {
  return (
    <>
      <PageHero title="Get a Quote" intro="Share your project requirement. We review it and respond with the next step, a site visit or a quotation." crumbs={[{ label: "Get a Quote" }]} />
      <section className="site-wrap grid gap-12 py-14 lg:grid-cols-12">
        <div className="border border-border p-6 md:p-8 lg:col-span-8">
          <h2 className="mb-6 text-2xl font-bold">Project Requirement</h2>
          <EnquiryForm source="get-a-quote" variant="full" submitLabel="Request Quote" />
        </div>
        <aside className="space-y-5 lg:col-span-4">
          <h2 className="text-xl font-bold">What helps us quote faster</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Hospital name and city</li><li>Number of theatres or rooms</li><li>Room size or drawings, if available</li><li>New build or renovation</li><li>Expected timeline</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button asChild><a href={site.phoneHref}><Phone className="h-4 w-4" />Call</a></Button>
            <Button asChild variant="outline"><a href={whatsappLink("Hello Unicare Medical Solutions, I would like a quotation for my project.")} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
          </div>
        </aside>
      </section>
    </>
  );
}
