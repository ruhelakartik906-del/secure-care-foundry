import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "./EnquiryDialog";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const { open } = useEnquiry();
  const [mobile, setMobile] = useState(false);
  const [mProducts, setMProducts] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-navy text-navy-foreground md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span>Modular Operation Theatres · Medical Gas Pipeline · Hospital Infrastructure</span>
          <a href={site.phoneHref} className="flex items-center gap-1.5 hover:underline"><Phone className="h-3 w-3" />{site.phone}</a>
        </div>
      </div>
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="shrink-0" aria-label="Unicare Medical Solutions home">
          <img src={logo.url} alt="Unicare Medical Solutions" width={180} height={60} className="h-11 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-brand-blue" activeOptions={{ exact: true }} activeProps={{ className: "text-brand-blue" }}>Home</Link>
          <div className="group relative">
            <Link to="/products" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-brand-blue" activeProps={{ className: "text-brand-blue" }}>
              Products <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid grid-cols-2 border border-border bg-popover p-3 shadow-lg">
                {products.map((p) => (
                  <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="border-l-2 border-transparent px-3 py-2.5 text-sm text-foreground hover:border-accent hover:bg-muted">
                    {p.name}
                  </Link>
                ))}
                <Link to="/products" className="col-span-2 mt-2 border-t border-border px-3 pt-3 text-xs font-semibold uppercase tracking-wider text-brand-blue">View all products →</Link>
              </div>
            </div>
          </div>
          {nav.slice(1).map((n) => (
            <Link key={n.to} to={n.to} className="px-3 py-2 text-sm font-medium text-foreground hover:text-brand-blue" activeProps={{ className: "text-brand-blue" }}>{n.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/search" aria-label="Search" className="p-2 text-foreground hover:text-brand-blue"><Search className="h-5 w-5" /></Link>
          <Button onClick={() => open()} className="hidden rounded-sm sm:inline-flex">Get a Quote</Button>
          <button className="p-2 lg:hidden" aria-label="Open menu" onClick={() => setMobile(true)}><Menu className="h-6 w-6" /></button>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background lg:hidden">
          <div className="container-x flex h-16 items-center justify-between border-b border-border">
            <img src={logo.url} alt="Unicare Medical Solutions" className="h-10 w-auto" />
            <button aria-label="Close menu" onClick={() => setMobile(false)} className="p-2"><X className="h-6 w-6" /></button>
          </div>
          <nav className="container-x flex flex-col py-4" aria-label="Mobile">
            <Link to="/" onClick={() => setMobile(false)} className="border-b border-border py-3 font-medium">Home</Link>
            <button onClick={() => setMProducts((v) => !v)} className="flex items-center justify-between border-b border-border py-3 text-left font-medium" aria-expanded={mProducts}>
              Products <ChevronDown className={`h-4 w-4 transition ${mProducts ? "rotate-180" : ""}`} />
            </button>
            {mProducts && (
              <div className="flex flex-col border-b border-border bg-muted py-1">
                <Link to="/products" onClick={() => setMobile(false)} className="px-4 py-2.5 text-sm font-semibold text-brand-blue">All products</Link>
                {products.map((p) => (
                  <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} onClick={() => setMobile(false)} className="px-4 py-2.5 text-sm">{p.name}</Link>
                ))}
              </div>
            )}
            {nav.slice(1).map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMobile(false)} className="border-b border-border py-3 font-medium">{n.label}</Link>
            ))}
            <Button className="mt-6 rounded-sm" size="lg" onClick={() => { setMobile(false); open(); }}>Get a Quote</Button>
            <a href={site.phoneHref} className="mt-3 border border-border py-3 text-center text-sm font-medium">Call {site.phone}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
