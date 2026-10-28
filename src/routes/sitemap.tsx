import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/common";
import { seo } from "@/lib/seo";
import { htmlSitemap } from "@/lib/html-sitemap";

export const Route = createFileRoute("/sitemap")({
  head: () => seo("Sitemap | Unicare Medical Solutions", "All pages on the Unicare Medical Solutions website.", "/sitemap"),
  component: SitemapPage,
});

function SitemapPage() {
  const groups = htmlSitemap();
  return (
    <>
      <PageHero title="Sitemap" crumbs={[{ label: "Sitemap" }]} />
      <section className="site-wrap grid gap-10 py-14 text-sm md:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ group, links }) => (
          <div key={group} className="min-w-0">
            <h2 className="mb-3 font-bold">{group}</h2>
            <ul className="space-y-2">
              {links.map((l) => <li key={l.path}><a href={l.path} className="hover:text-brand-blue">{l.label}</a></li>)}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
