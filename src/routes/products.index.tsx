import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { categories, products, type Category } from "@/data/products";
import { PageHero, ProductCard, CtaBand } from "@/components/site/common";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/products/")({
  head: () => seo("Hospital Infrastructure Products | Unicare Medical Solutions", "Modular OT, medical gas pipeline, laminar air flow, AGSS, CSSD, scrub stations, bed head panels, ICU curtain tracks and hospital furniture.", "/products"),
  component: Products,
});

function Products() {
  const [cat, setCat] = useState<Category | "All">("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);
  return (
    <>
      <PageHero title="Hospital Infrastructure Products" intro="Systems and equipment for operation theatres, critical care, sterile services and hospital wards." crumbs={[{ label: "Products" }]} />
      <section className="site-wrap py-12">
        <div className="mb-8 flex flex-wrap gap-2" role="tablist">
          {(["All", ...categories] as const).map((c) => (
            <button key={c} onClick={() => setCat(c)} role="tab" aria-selected={cat === c}
              className={`border px-4 py-2 text-sm font-medium ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
              {c}
            </button>
          ))}
        </div>
        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        ) : (
          <p className="text-muted-foreground">Products in this category will be added soon. Contact us for your requirement.</p>
        )}
      </section>
      <CtaBand />
    </>
  );
}
