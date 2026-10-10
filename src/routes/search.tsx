import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { modularOtOptions, products } from "@/data/products";
import { locations } from "@/data/locations";
import { PageHero } from "@/components/site/common";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  head: () => seo("Search | Unicare Medical Solutions", "Search products, articles and service locations.", "/search", "website", undefined, { index: false }),
  component: Search,
});

const norm = (s: string) => s.toLowerCase().replace(/\bot\b/g, "operation theatre");

function Search() {
  const [q, setQ] = useState("");
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  const hit = (txt: string) => terms.length > 0 && terms.every((t) => norm(txt).includes(t) || (t === "price" || t === "cost"));
  const ps = products.filter((p) => hit(`${p.name} ${p.shortName} ${p.short} ${p.category} price cost`));
  const variants = modularOtOptions.filter((p) => hit(`${p.name} ${p.description} modular operation theatre price cost`));
  const ls = terms.length ? locations.filter((l) => hit(`${l.name} ${l.cities.join(" ")} modular operation theatre manufacturer`)) : [];
  return (
    <>
      <PageHero title="Search" crumbs={[{ label: "Search" }]} />
      <section className="site-wrap max-w-3xl py-12">
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “modular OT price” or “gas pipeline Delhi”" className="w-full border border-input px-4 py-3 text-base outline-none focus:border-brand-blue" aria-label="Search" />
        {terms.length > 0 && (
          <div className="mt-8 space-y-8">
            <Group title="Products">{ps.map((p) => <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="block border-b border-border py-3 hover:text-brand-blue">{p.name}</Link>)}</Group>
            <Group title="Modular OT Types">{variants.map((p) => <Link key={p.slug} to="/products/modular-operation-theatre/$variant" params={{ variant: p.slug }} className="block border-b border-border py-3 hover:text-brand-blue">{p.name}</Link>)}</Group>
            <Group title="Locations">{ls.slice(0, 12).map((l) => <Link key={l.slug} to="/modular-operation-theatre-manufacturers-in/$state" params={{ state: l.slug }} className="block border-b border-border py-3 hover:text-brand-blue">Modular OT Manufacturers in {l.name}</Link>)}</Group>
            {!ps.length && !variants.length && !bs.length && !ls.length && <p className="text-muted-foreground">No results. Try a different word, or contact us directly.</p>}
          </div>
        )}
      </section>
    </>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode[] }) {
  if (!children.length) return null;
  return <div><h2 className="eyebrow mb-2">{title}</h2>{children}</div>;
}
