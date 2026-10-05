import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { blogs } from "@/data/blogs";
import { locations } from "@/data/locations";
import { PageHero } from "@/components/site/common";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () => seo("Sitemap | Unicare Medical Solutions", "All pages on the Unicare Medical Solutions website.", "/sitemap"),
  component: () => (
    <>
      <PageHero title="Sitemap" crumbs={[{ label: "Sitemap" }]} />
      <section className="site-wrap grid gap-10 py-14 text-sm md:grid-cols-2 lg:grid-cols-4">
        <div><h2 className="mb-3 font-bold">Pages</h2><ul className="space-y-2">
          {([["/", "Home"], ["/products", "Products"], ["/about", "About Us"], ["/blog", "Blog"], ["/contact", "Contact Us"], ["/locations", "Service Locations"], ["/privacy-policy", "Privacy Policy"], ["/disclaimer", "Disclaimer"], ["/terms-and-conditions", "Terms & Conditions"]] as const).map(([to, l]) => <li key={to}><Link to={to} className="hover:text-brand-blue">{l}</Link></li>)}
        </ul></div>
        <div><h2 className="mb-3 font-bold">Products</h2><ul className="space-y-2">{products.map((p) => <li key={p.slug}><Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-brand-blue">{p.name}</Link></li>)}</ul></div>
        <div><h2 className="mb-3 font-bold">Blog</h2><ul className="space-y-2">{blogs.map((b) => <li key={b.slug}><Link to="/blog/$slug" params={{ slug: b.slug }} className="hover:text-brand-blue">{b.title}</Link></li>)}</ul></div>
        <div><h2 className="mb-3 font-bold">Locations</h2><ul className="space-y-2">
          {locations.map((l) => <li key={l.slug}><Link to="/modular-operation-theatre-manufacturer/$state" params={{ state: l.slug }} className="hover:text-brand-blue">Modular OT — {l.name}</Link></li>)}
          {locations.map((l) => <li key={`g-${l.slug}`}><Link to="/medical-gas-pipeline-manufacturer/$state" params={{ state: l.slug }} className="hover:text-brand-blue">Medical Gas Pipeline — {l.name}</Link></li>)}
        </ul></div>
      </section>
    </>
  ),
});
