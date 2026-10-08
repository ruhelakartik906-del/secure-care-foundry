import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/unicare-logo.webp";
import { priorityCityPaths } from "@/lib/routes";
import { products } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export function Footer() {
  const footerProducts = products.filter((p) => ["modular-operation-theatre", "medical-gas-pipeline-system", "laminar-air-flow", "ot-pendant", "led-surgical-light", "modular-icu-nicu"].includes(p.slug));
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="site-wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="inline-block bg-background p-2"><img src={logo} alt="Unicare Medical Solutions" className="h-12 w-auto" loading="lazy" /></div>
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/75">
            Design, manufacturing and installation of modular operation theatres, medical gas pipeline systems and hospital infrastructure solutions.
          </p>
        </div>
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Products</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            {footerProducts.map((p) => <li key={p.slug}><Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-navy-foreground">{p.shortName}</Link></li>)}
            <li><Link to="/products" className="font-semibold hover:text-navy-foreground">All Products →</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Locations</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            {priorityCityPaths.map((c) => <li key={c.url}><a href={c.url} className="hover:text-navy-foreground">Modular OT {c.name}</a></li>)}
            <li><Link to="/locations" className="font-semibold hover:text-navy-foreground">All Locations →</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Resources</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            <li><Link to="/modular-ot-cost-india" className="hover:text-navy-foreground">Pricing Guide</Link></li>
            <li><Link to="/resources/compliance" className="hover:text-navy-foreground">Compliance</Link></li>
            <li><Link to="/resources/comparisons" className="hover:text-navy-foreground">Comparisons</Link></li>
            <li><Link to="/faqs" className="hover:text-navy-foreground">FAQs</Link></li>
            <li><Link to="/blog" className="hover:text-navy-foreground">Blog</Link></li>
            <li><Link to="/about" className="hover:text-navy-foreground">About Us</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h3>
          <ul className="space-y-3 text-sm text-navy-foreground/75">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /><span><strong className="text-navy-foreground">Office:</strong> {site.officeAddress}</span></li>
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /><span><strong className="text-navy-foreground">Works:</strong> {site.worksAddress}</span></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0" /><span><strong className="text-navy-foreground">Primary:</strong> <a href={site.phoneHref} className="font-semibold text-navy-foreground hover:underline">{site.phone}</a><br /><span className="text-xs">Alternate:</span> <a href={site.secondaryPhoneHref} className="text-xs hover:text-navy-foreground">{site.secondaryPhone}</a></span></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0" /><a href={`mailto:${site.email}`} className="break-all hover:text-navy-foreground">{site.email}</a></li>
            <li><strong className="text-navy-foreground">Hours:</strong> {site.hours}</li>
          </ul>
          <div className="mt-4 flex gap-4 text-sm font-semibold"><a href={site.phoneHref} className="hover:underline">Call Us</a><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline"><WhatsAppIcon className="h-4 w-4" />WhatsApp Us</a></div>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15">
        <div className="site-wrap flex flex-col gap-3 py-5 text-xs text-navy-foreground/70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Unicare Medical Solutions. All Rights Reserved.</p>
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
