import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CtaBand, SectionHead } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { breadcrumbSchema, seo } from "@/lib/seo";

const path = "/services/hospital-project-consulting";

export const Route = createFileRoute("/services/hospital-project-consulting")({
  head: () => ({
    ...seo(
      "Hospital Project Consulting – OT, MGPS, ICU | Unicare",
      "Independent online consulting for hospital projects: OT, MGPS, CSSD, ICU and MEP planning, vendor selection, NABH compliance and commissioning checks.",
      path,
    ),
    scripts: [breadcrumbSchema([{ name: "Hospital Project Consulting", path }])],
  }),
  component: ConsultingPage,
});

function ConsultingPage() {
  return (
    <>
      <PageHero title="Hospital Project & Healthcare Consulting" intro="Independent consulting that keeps your hospital project on budget, on time and compliant." crumbs={[{ label: "Consulting" }]} />
      <section className="site-wrap grid gap-12 py-14 lg:grid-cols-12">
        <article className="prose-unicare lg:col-span-8">
          <h2>Online hospital infrastructure consulting</h2>
          <p>Building or expanding a hospital is a big investment. Promoters and doctors often face rising costs, delays, equipment that does not match the specification, and compliance problems when they depend only on general architects or on vendors.</p>
          <p>We work on your side of the table. With long experience in critical-care infrastructure (small and mid-size hospital projects, modular OTs, MGPS, CSSD, ICUs, pneumatic tube systems and MEP), we give independent online consulting that keeps your project on budget, on time and compliant.</p>
          <h3>What we help with</h3>
          <ul>
            <li>Space and infrastructure planning: layouts for OTs, MGPS, CSSD, ICUs, pneumatic tube systems and MEP that follow clinical workflow</li>
            <li>Specifications and vendor selection: clear RFP specifications for MEP and biomedical equipment, so bids are comparable and prices stay fair</li>
            <li>NABH and NABL compliance: designs and safety protocols that meet accreditation norms from the first drawing</li>
            <li>Supervision and commissioning: online progress reviews, test supervision and handover checks</li>
          </ul>
          <h3>Why hospitals choose us</h3>
          <ul>
            <li>We take no commission from vendors and work only for you</li>
            <li>Specialist experience in critical hospital areas</li>
            <li>Fewer layout changes, less scope creep and no overpriced contracts</li>
          </ul>
          <p>Get expert advice before you sign your next contract.</p>
          <div className="not-prose mt-6"><Button asChild size="lg" className="rounded-sm"><Link to="/get-a-quote">Get a Quote</Link></Button></div>
          <h2>Healthcare marketing consulting</h2>
          <p>A new OT, ICU or hospital wing only pays off when the right patients use it. We offer advisory-only marketing consulting for hospitals: we do not run campaigns or sell advertising, so our advice stays independent.</p>
          <ul>
            <li>Brand positioning: ethical, compliant messaging built around your specialities</li>
            <li>Service-line and catchment planning: which departments to promote first and how to map referral networks</li>
            <li>Digital and channel planning: how patients find you, how doctors are presented, and CME outreach</li>
            <li>Agency oversight: independent review of your marketing agencies against real outcomes, not likes</li>
          </ul>
          <p>The focus is on how well your service lines are used, not on social media numbers.</p>
        </article>
        <aside className="lg:col-span-4">
          <div className="sticky top-28 border border-border p-6">
            <h2 className="text-xl font-bold">Discuss Your Project</h2>
            <p className="mb-5 mt-2 text-sm text-muted-foreground">Share your hospital project details for independent consulting advice.</p>
            <EnquiryForm source="consulting" variant="contact" defaultProduct="Hospital Project Consulting" submitLabel="Send Enquiry" />
          </div>
        </aside>
      </section>
      <section className="border-t border-border bg-muted py-16">
        <div className="site-wrap">
          <SectionHead title="Related Solutions" />
          <div className="grid gap-2 sm:grid-cols-3">
            <Link to="/products/$slug" params={{ slug: "modular-operation-theatre" }} className="border border-border bg-background p-4 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue">Modular Operation Theatre</Link>
            <Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }} className="border border-border bg-background p-4 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue">Medical Gas Pipeline System</Link>
            <Link to="/products/$slug" params={{ slug: "modular-icu-nicu" }} className="border border-border bg-background p-4 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue">Modular ICU & NICU</Link>
          </div>
        </div>
      </section>
      <CtaBand title="Plan Your Hospital Project With Us" />
    </>
  );
}
