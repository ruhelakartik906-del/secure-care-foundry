import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { systemPages } from "@/data/systems";
import { CtaBand, PageHero, SectionHead } from "@/components/site/common";
import { breadcrumbSchema, seo } from "@/lib/seo";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    ...seo("Modular OT & Hospital Infrastructure Solutions | Unicare", "Explore Unicare's modular operation theatre systems, OT HVAC, HEPA, ceilings, doors, electrical and hospital infrastructure solutions for healthcare projects.", "/solutions"),
    scripts: [breadcrumbSchema([{ name: "Solutions", path: "/solutions" }])],
  }),
  component: Solutions,
});

function Solutions() {
  return (
    <>
      <PageHero title="Solutions" intro="Modular operation theatre systems and hospital infrastructure, planned and delivered as one coordinated project." crumbs={[{ label: "Solutions" }]} />
      <section className="site-wrap py-14">
        <SectionHead eyebrow="Modular OT Systems" title="Operation Theatre Building Blocks" intro="Each system is designed together with the rest of the theatre so walls, ceiling, air, power and gases fit as one room." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {systemPages.map((p) => (
            <Link key={p.path} to={p.path} className="border border-border p-6 transition hover:border-brand-blue">
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.intro}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="site-wrap pb-14">
        <SectionHead eyebrow="Products" title="Hospital Infrastructure Products" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="border border-border p-6 transition hover:border-brand-blue">
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
