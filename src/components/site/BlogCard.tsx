import { Link } from "@tanstack/react-router";
import type { Blog } from "@/data/blogs";

export function BlogCard({ b }: { b: Blog }) {
  return (
    <article className="flex flex-col border border-border">
      <Link to="/blog/$slug" params={{ slug: b.slug }} className="aspect-[16/10] overflow-hidden bg-muted">
        <img src={b.image} alt={b.title} loading="lazy" width={800} height={500} className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue">{b.category}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug"><Link to="/blog/$slug" params={{ slug: b.slug }} className="hover:text-brand-blue">{b.title}</Link></h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={b.date}>{new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</time>
          <Link to="/blog/$slug" params={{ slug: b.slug }} className="font-semibold text-brand-blue">Read More</Link>
        </div>
      </div>
    </article>
  );
}
