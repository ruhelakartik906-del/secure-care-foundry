import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { getModularOtOption, modularOtOptions } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { CtaBand, Faqs, PageHero } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { breadcrumbSchema, seo } from "@/lib/seo";

export const Route = createFileRoute("/products/modular-operation-theatre/$variant")({
  loader: ({ params }) => {
    const option = getModularOtOption(params.variant);
    if (!option) throw notFound();
    return { variant: option.slug };
  },
  head: ({ loaderData }) => {
    const option = loaderData && getModularOtOption(loaderData.variant);
    if (!option) return { meta: [{ title: "Modular OT option not found" }, { name: "robots", content: "noindex" }] };
    const path = `/products/modular-operation-theatre/${option.slug}`;
    return {
      ...seo(`${option.name} Manufacturer & Installation | Unicare`, `${option.description} Request project-specific design, installation and pricing from Unicare Medical Solutions.`, path, "product"),
      scripts: [breadcrumbSchema([{ name: "Products", path: "/products" }, { name: "Modular Operation Theatre", path: "/products/modular-operation-theatre" }, { name: option.name, path }])],
    };
  },
  component: ModularOtVariantPage,
});

function ModularOtVariantPage() {
  const { variant } = Route.useLoaderData();
  const option = getModularOtOption(variant);
  if (!option) return null;
  const faqs = [
    { q: `What does a ${option.menuName} project include?`, a: "The final scope is prepared around room dimensions, selected panel system, airflow, doors, controls, medical gases and installation requirements." },
    { q: `How is ${option.menuName} pricing calculated?`, a: "Pricing depends on room size, material selection, equipment integration and site scope. We provide a project-specific quotation after reviewing your requirement." },
  ];
  return (
    <>
      <PageHero title={option.name} intro={option.description} crumbs={[{ label: "Products", to: "/products" }, { label: "Modular Operation Theatre", to: "/products/modular-operation-theatre" }, { label: option.menuName }]} />
      <section className="site-wrap grid gap-12 py-14 lg:grid-cols-12">
        <article className="prose-unicare lg:col-span-8">
          <img src={option.image} alt={`${option.name} installation solution`} width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
          <h2>Overview</h2><p>{option.description} Unicare coordinates planning, manufacturing and installation as one project for hospitals, architects and healthcare contractors.</p>
          <h2>Project features</h2><ul><li>Room-specific planning and panel layout</li><li>Integration with laminar air flow, medical gases, electrical and control systems</li><li>Coordinated installation, testing and handover</li><li>Material and finish selection based on the approved project brief</li></ul>
          <h2>Applications</h2><ul><li>New hospital operation theatres</li><li>Existing OT renovation and upgrades</li><li>Multispecialty and specialist surgical facilities</li></ul>
          <h2>Installation approach</h2><p>Installation begins after a review of room dimensions, drawings and site readiness. The final technical scope and schedule are confirmed before manufacturing and on-site execution.</p>
          <h2>Frequently Asked Questions</h2><Faqs faqs={faqs} />
          <div className="not-prose mt-8 flex flex-wrap gap-3"><Button asChild><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Now</a></Button><Button asChild variant="outline"><a href={whatsappLink(`Hello Unicare Medical Solutions, I am interested in ${option.name}. Please share more details.`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a></Button></div>
          <h2>Other Modular OT Types</h2><div className="not-prose grid gap-2 sm:grid-cols-2">{modularOtOptions.filter((item) => item.slug !== option.slug).map((item) => <Link key={item.slug} to="/products/modular-operation-theatre/$variant" params={{ variant: item.slug }} className="border border-border p-3 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue">{item.menuName}</Link>)}</div>
        </article>
        <aside className="lg:col-span-4"><div className="sticky top-28 border border-border p-6"><h2 className="text-xl font-bold">Request Pricing</h2><p className="mb-5 mt-2 text-sm text-muted-foreground">Tell us about your OT project for a tailored quotation.</p><EnquiryForm source={`variant-${option.slug}`} variant="contact" defaultProduct={option.name} submitLabel="Send Enquiry" /></div></aside>
      </section>
      <CtaBand title={`Discuss Your ${option.menuName} Project`} />
    </>
  );
}