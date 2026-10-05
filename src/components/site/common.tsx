import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { priceLabel, type Product } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "./EnquiryDialog";

export function ProductCard({ p }: { p: Product }) {
  const { open } = useEnquiry();
  return (
    <article className="group flex flex-col border border-border bg-card">
      <Link to="/products/$slug" params={{ slug: p.slug }} className="block aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{p.category}</p>
        <h3 className="mt-1.5 text-lg font-bold text-foreground">
          <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-brand-blue">{p.name}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
        <p className="mt-4 border-t border-border pt-3 text-sm font-semibold text-foreground">{priceLabel(p.price)}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button asChild variant="outline" className="rounded-sm"><Link to="/products/$slug" params={{ slug: p.slug }}>View Details</Link></Button>
          <Button className="rounded-sm" onClick={() => open(p.name)}>Request a Quote</Button>
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
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FloatingActions() {
  return (
    <>
      <Button size="icon" className="fixed bottom-5 left-4 z-30 h-12 w-12 rounded-full shadow-lg md:bottom-6 md:left-6 md:h-11 md:w-11" asChild>
        <a href={site.phoneHref} aria-label={`Call Unicare at ${site.phone}`} title="Call Unicare"><Phone className="h-5 w-5" /></a>
      </Button>
      <Button size="icon" className="fixed bottom-5 right-4 z-30 h-12 w-12 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 md:bottom-6 md:right-6 md:h-11 md:w-11" asChild>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with Unicare on WhatsApp" title="WhatsApp Unicare"><MessageCircle className="h-5 w-5" /></a>
      </Button>
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
