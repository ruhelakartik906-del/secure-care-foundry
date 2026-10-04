import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import { products } from "@/data/products";
import { locations } from "@/data/locations";
import { site } from "@/data/site";

export function Footer() {
  const [allLoc, setAllLoc] = useState(false);
  const shown = allLoc ? locations : locations.slice(0, 8);
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="site-wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="inline-block bg-background p-2"><img src={logo.url} alt="Unicare Medical Solutions" className="h-12 w-auto" loading="lazy" /></div>
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/75">
            Design, manufacturing and installation of modular operation theatres, medical gas pipeline systems and hospital infrastructure.
          </p>
        </div>
        <div className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Products</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            {products.map((p) => <li key={p.slug}><Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-navy-foreground">{p.shortName}</Link></li>)}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            <li><Link to="/about" className="hover:text-navy-foreground">About Us</Link></li>
            <li><Link to="/products" className="hover:text-navy-foreground">All Products</Link></li>
            <li><Link to="/blog" className="hover:text-navy-foreground">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-navy-foreground">Contact Us</Link></li>
            <li><Link to="/search" className="hover:text-navy-foreground">Search</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            <li>{site.address}</li>
            <li><a href={site.phoneHref} className="hover:text-navy-foreground">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="break-all hover:text-navy-foreground">{site.email}</a></li>
            <li>{site.hours}</li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Service Locations</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            {shown.map((l) => (
              <li key={l.slug}><Link to="/modular-operation-theatre-manufacturer/$state" params={{ state: l.slug }} className="hover:text-navy-foreground">Modular OT in {l.name}</Link></li>
            ))}
          </ul>
          <button onClick={() => setAllLoc((v) => !v)} className="mt-3 text-xs font-semibold uppercase tracking-wider text-navy-foreground underline-offset-4 hover:underline">
            {allLoc ? "Show fewer" : `All ${locations.length} locations`}
          </button>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15">
        <div className="site-wrap flex flex-col gap-3 py-5 text-xs text-navy-foreground/70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Unicare Medical Solutions. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy-policy" className="hover:text-navy-foreground">Privacy Policy</Link>
            <Link to="/disclaimer" className="hover:text-navy-foreground">Disclaimer</Link>
            <Link to="/terms-and-conditions" className="hover:text-navy-foreground">Terms &amp; Conditions</Link>
            <Link to="/sitemap" className="hover:text-navy-foreground">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
