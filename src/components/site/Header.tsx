import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import logo from "@/assets/unicare-logo.webp";
import { site, whatsappLink } from "@/data/site";
import { cities, cityPath } from "@/data/cities";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "./EnquiryDialog";
import { isActiveItem, isSolutionPath, solutionGroups, type SolutionItem } from "./nav-data";

const after = [
  { to: "/modular-ot-cost-india", label: "Pricing Guide" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

const linkCls = "px-3 py-2 text-sm font-medium text-foreground hover:text-brand-blue border-b-2 border-transparent";
const activeCls = "text-brand-blue border-accent font-semibold";

function ItemLink({ item, className, onClick, children }: { item: SolutionItem; className: string; onClick: () => void; children: React.ReactNode }) {
  return item.productSlug
    ? <Link to="/products/$slug" params={{ slug: item.productSlug }} className={className} onClick={onClick}>{children}</Link>
    : <Link to={item.path as "/modular-ot-ceiling"} className={className} onClick={onClick}>{children}</Link>;
}

export function Header() {
  const { open } = useEnquiry();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mSol, setMSol] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  const show = () => { if (timer.current) clearTimeout(timer.current); setMega(true); };
  const hide = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setMega(false), 150); };
  const closeAll = () => { if (timer.current) clearTimeout(timer.current); setMega(false); setMobile(false); setMSol(false); };

  // reset every menu state on navigation
  useEffect(() => { closeAll(); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); setMobile(false); } };
    const onDown = (e: MouseEvent) => { if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMega(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, []);

  useEffect(() => {
    if (!mobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobile]);

  const solActive = isSolutionPath(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-navy text-navy-foreground md:block">
        <div className="site-wrap flex h-9 items-center justify-between text-xs">
          <span>Modular Operation Theatres · Medical Gas Pipeline · Hospital Infrastructure</span>
          <a href={site.phoneHref} className="flex items-center gap-1.5 hover:underline"><Phone className="h-3 w-3" />{site.phone}</a>
        </div>
      </div>
      <div className="site-wrap relative flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="shrink-0" aria-label="Unicare Medical Solutions home">
          <img src={logo} alt="Unicare Medical Solutions" width={180} height={60} className="h-11 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <Link to="/" onMouseEnter={() => setMega(false)} className={linkCls} activeOptions={{ exact: true }} activeProps={{ className: activeCls }}>Home</Link>
          <div ref={megaRef} onMouseEnter={show} onMouseLeave={hide} className="static">
            <button type="button" aria-expanded={mega} aria-haspopup="true" onClick={() => setMega((v) => !v)} className={`flex items-center gap-1 ${linkCls} ${solActive ? activeCls : ""}`}>
              Products <ChevronDown className={`h-3.5 w-3.5 transition ${mega ? "rotate-180" : ""}`} />
            </button>
            {mega && (
              <div className="absolute inset-x-0 top-full z-50 pt-0">
                <div className="mx-auto max-w-[1240px] border border-border bg-popover shadow-lg">
                  <div className="grid grid-cols-4 divide-x divide-border">
                    {solutionGroups.map((g) => (
                      <div key={g.title} className="p-5">
                        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-blue">{g.title}</p>
                        <ul className="space-y-1">
                          {g.items.map((it) => {
                            const Icon = it.icon; const act = isActiveItem(pathname, it.path);
                            return <li key={it.path}><ItemLink item={it} onClick={closeAll} className={`flex gap-3 border-l-2 px-3 py-2.5 hover:border-accent hover:bg-muted ${act ? "border-accent bg-muted" : "border-transparent"}`}>
                              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                              <span className="min-w-0"><span className={`block text-sm ${act ? "font-semibold text-brand-blue" : "font-medium"}`}>{it.label}</span><span className="block text-xs text-muted-foreground">{it.desc}</span></span>
                            </ItemLink></li>;
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between border-t border-border bg-muted/60 px-5 py-3 text-sm">
                    <Link to="/products" onClick={closeAll} className="font-semibold text-brand-blue hover:underline">View All Products →</Link>
                    <Link to="/solutions" onClick={closeAll} className="text-muted-foreground hover:text-brand-blue">OT systems overview</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="group relative" onMouseEnter={() => setMega(false)}>
            <button type="button" aria-haspopup="true" className={`flex items-center gap-1 ${linkCls} ${pathname.startsWith("/modular-ot-manufacturer-") ? activeCls : ""}`}>Modular OT Cities <ChevronDown className="h-3.5 w-3.5" /></button>
            <div className="invisible absolute left-0 top-full z-50 w-56 border border-border bg-popover py-2 shadow-lg opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {cities.map((c) => <a key={c.slug} href={cityPath(c)} className="block px-4 py-2 text-sm hover:bg-muted hover:text-brand-blue">{c.name}</a>)}
              <Link to="/locations" className="mt-1 block border-t border-border px-4 pt-2 text-sm font-semibold text-brand-blue">All locations →</Link>
            </div>
          </div>
          {after.map((n) => (
            <Link key={n.to} to={n.to} onMouseEnter={() => setMega(false)} className={linkCls} activeProps={{ className: activeCls }}>{n.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/search" aria-label="Search" className="p-2 text-foreground hover:text-brand-blue"><Search className="h-5 w-5" /></Link>
          <a href={site.phoneHref} className="hidden items-center gap-1.5 text-sm font-semibold text-brand-blue xl:flex"><Phone className="h-4 w-4" />Call Now</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 border border-border px-3 py-2 text-sm font-semibold xl:inline-flex"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a>
          <Button onClick={() => open("Modular Operation Theatre")} className="hidden rounded-sm sm:inline-flex">Get a Quote</Button>
          <button className="p-2 lg:hidden" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)}><Menu className="h-6 w-6" /></button>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setMobile(false)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-background shadow-xl">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <img src={logo} alt="Unicare Medical Solutions" className="h-10 w-auto" />
              <button aria-label="Close menu" onClick={() => setMobile(false)} className="grid h-11 w-11 place-items-center"><X className="h-6 w-6" /></button>
            </div>
            <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
              <Link to="/" onClick={closeAll} activeOptions={{ exact: true }} activeProps={{ className: "text-brand-blue font-semibold" }} className="flex min-h-12 items-center border-b border-border font-medium">Home</Link>
              <button onClick={() => setMSol((v) => !v)} aria-expanded={mSol} className={`flex min-h-12 items-center justify-between border-b border-border text-left font-medium ${solActive ? "text-brand-blue" : ""}`}>
                Products <ChevronDown className={`h-5 w-5 transition ${mSol ? "rotate-180" : ""}`} />
              </button>
              {mSol && (
                <div className="border-b border-border bg-muted py-1">
                  {solutionGroups.map((g) => <div key={g.title}>
                    <p className="px-3 pb-1 pt-3 text-xs font-bold uppercase tracking-wider text-brand-blue">{g.title}</p>
                    {g.items.map((it) => <ItemLink key={it.path} item={it} onClick={closeAll} className={`flex min-h-11 items-center px-3 text-sm ${isActiveItem(pathname, it.path) ? "font-semibold text-brand-blue" : ""}`}>{it.label}</ItemLink>)}
                  </div>)}
                  <Link to="/products" onClick={closeAll} className="mt-1 flex min-h-11 items-center px-3 text-sm font-semibold text-brand-blue">View All Products →</Link>
                </div>
              )}
              <p className="px-0 pb-1 pt-3 text-xs font-bold uppercase tracking-wider text-brand-blue">Modular OT Cities</p>
              <div className="grid grid-cols-2 border-b border-border pb-2">{cities.map((c) => <a key={c.slug} href={cityPath(c)} onClick={closeAll} className="flex min-h-10 items-center text-sm">{c.name}</a>)}</div>
              {after.map((n) => (
                <Link key={n.to} to={n.to} onClick={closeAll} activeProps={{ className: "text-brand-blue font-semibold" }} className="flex min-h-12 items-center border-b border-border font-medium">{n.label}</Link>
              ))}
              <Button className="mt-6 rounded-sm" size="lg" onClick={() => { closeAll(); open(); }}>Get a Quote</Button>
              <a href={site.phoneHref} className="mt-3 border border-border py-3 text-center text-sm font-medium">Call {site.phone}</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
