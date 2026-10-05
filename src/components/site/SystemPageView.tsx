import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { systemPages, type SystemPage } from "@/data/systems";
import { Button } from "@/components/ui/button";
import { CtaBand, Faqs, PageHero, faqSchema } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { breadcrumbSchema, seo } from "@/lib/seo";

export const systemHead = (page: SystemPage) => {
  const base = seo(page.title, page.description, page.path, "website");
  return {
    ...base,
    scripts: [
      ...((base as { scripts?: unknown[] }).scripts ?? []),
      breadcrumbSchema([{ name: "Solutions", path: "/solutions" }, { name: page.name, path: page.path }]),
      faqSchema(page.faqs),
    ],
  };
};

export function SystemPageView({ page }: { page: SystemPage }) {
  return (
    <>
      <PageHero title={page.name} intro={page.intro} crumbs={[{ label: "Solutions", to: "/solutions" }, { label: page.name }]} />
      <section className="site-wrap grid gap-12 py-14 lg:grid-cols-12">
        <article className="prose-unicare lg:col-span-8">
          <h2>Overview</h2>
          {page.overview.map((p) => <p key={p}>{p}</p>)}
          <h2>What the scope can include</h2>
          <ul>{page.scope.map((s) => <li key={s}>{s}</li>)}</ul>
          <h2>What we review before design</h2>
          <ul>{page.considerations.map((s) => <li key={s}>{s}</li>)}</ul>
          <h2>Part of a complete modular OT</h2>
          <p>This system is usually delivered as part of a full <Link to="/products/$slug" params={{ slug: "modular-operation-theatre" }}>modular operation theatre</Link> project, alongside <Link to="/products/$slug" params={{ slug: "laminar-air-flow" }}>laminar air flow</Link> and the <Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }}>medical gas pipeline system</Link>. Pricing is shared after we review your drawings and site.</p>
          <h2>Frequently Asked Questions</h2>
          <Faqs faqs={page.faqs} />
          <div className="not-prose mt-8 flex flex-wrap gap-3">
            <Button asChild><a href={site.phoneHref}><Phone className="h-4 w-4" />Call Now</a></Button>
            <Button asChild variant="outline"><a href={whatsappLink(`Hello Unicare Medical Solutions, I am interested in ${page.name}. Please share more details.`)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
          </div>
          <h2>Related OT Systems</h2>
          <div className="not-prose grid gap-2 sm:grid-cols-2">
            {systemPages.filter((p) => p.path !== page.path).map((p) => <Link key={p.path} to={p.path} className="border border-border p-3 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue">{p.name}</Link>)}
          </div>
        </article>
        <aside className="lg:col-span-4"><div className="sticky top-28 border border-border p-6"><h2 className="text-xl font-bold">Request a Quote</h2><p className="mb-5 mt-2 text-sm text-muted-foreground">Share your project details for a tailored quotation.</p><EnquiryForm source={`system${page.path}`} variant="contact" defaultProduct="Modular Operation Theatre" submitLabel="Send Enquiry" /></div></aside>
      </section>
      <CtaBand title={`Discuss Your ${page.name} Requirement`} />
    </>
  );
}
