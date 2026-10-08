import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { priceLabel, type Product } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "./EnquiryDialog";

export function ProductCard({ p }: { p: Product }) {
  const { open } = useEnquiry();
  return (
    <article className={`group flex flex-col border bg-card ${p.slug === "modular-operation-theatre" ? "border-brand-blue shadow-sm" : "border-border"}`}>
      <Link to="/products/$slug" params={{ slug: p.slug }} className="block aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{p.category}</p>
        <h3 className="mt-1.5 text-lg font-bold text-foreground">
          <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-brand-blue">{p.name}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
        <p className="mt-4 border-t border-border pt-3 text-sm font-semibold text-foreground">Price: {p.slug === "modular-operation-theatre" ? "Get Project Quote" : priceLabel(p.price)}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button asChild variant="outline" className="rounded-sm"><Link to="/products/$slug" params={{ slug: p.slug }}>View Details</Link></Button>
          <Button className="rounded-sm" onClick={() => open(p.name)}>{p.slug === "modular-operation-theatre" ? "Get Project Quote" : "Get a Quote"}</Button>
        </div>
      </div>
    </article>
  );
}

export function SectionHead({ eyebrow, title, intro, center }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold leading-tight text-foreground md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function Crumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-navy-foreground/70">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="hover:text-navy-foreground">Home</Link></li>
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-1.5">
            <span>/</span>
            {i.to ? <a href={i.to} className="hover:text-navy-foreground">{i.label}</a> : <span className="text-navy-foreground">{i.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ title, intro, crumbs }: { title: string; intro?: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="site-wrap py-12 md:py-16">
        <Crumbs items={crumbs} />
        <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-foreground/80">{intro}</p>}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Discuss Your Hospital Project", text = "Tell us about your facility and requirement. Our team will help you plan the right solution." }: { title?: string; text?: string }) {
  const { open } = useEnquiry();
  return (
    <section className="border-t border-border bg-muted">
      <div className="site-wrap flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="rounded-sm" onClick={() => open()}>Get a Quote</Button>
          <Button size="lg" variant="outline" className="rounded-sm" asChild>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FloatingActions() {
  return (
    <>
      <Button size="icon" className="fixed bottom-[86px] right-[18px] z-50 hidden h-12 w-12 md:inline-flex rounded-full shadow-lg md:bottom-[90px] md:right-[26px] md:h-11 md:w-11" asChild>
        <a href={site.phoneHref} aria-label={`Call Unicare at ${site.phone}`} title="Call Unicare"><Phone className="h-5 w-5" /></a>
      </Button>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-fab group fixed bottom-5 right-4 z-50 hidden md:flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-3.5 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl md:bottom-6 md:right-6"
      >
        <span className="whatsapp-fab-ring" aria-hidden="true" />
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="hidden text-sm font-semibold leading-none lg:inline">Chat on WhatsApp</span>
      </a>
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-background text-sm font-semibold md:hidden">
        <a href={site.phoneHref} className="flex min-h-12 items-center justify-center gap-1.5"><Phone className="h-4 w-4" />Call</a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center border-x border-border">WhatsApp</a>
        <a href="/get-a-quote" className="flex min-h-12 items-center justify-center bg-primary text-primary-foreground">Get Quote</a>
      </div>
    </>
  );
}

export function Faqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((f) => (
        <details key={f.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
            {f.q}<span className="text-xl text-brand-blue group-open:rotate-45 transition">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  type: "application/ld+json",
  children: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }),
});
