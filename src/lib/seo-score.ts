export type CheckStatus = "good" | "warn" | "bad";
export type SeoCheck = { id: string; label: string; status: CheckStatus; critical?: boolean };

export type SeoInput = {
  title: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  focusKeyword: string;
  html: string;
  canonical: string;
  featuredImage: string;
  featuredAlt: string;
  schemaType: string;
  otherTitles?: string[];
  otherDescriptions?: string[];
};

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

export function analyzeSeo(i: SeoInput): { score: number; checks: SeoCheck[] } {
  const kw = norm(i.focusKeyword);
  const has = (s: string) => !!kw && norm(s).includes(kw);
  const body = text(i.html);
  const words = body ? body.split(" ").length : 0;
  const firstPara = text((i.html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]) ?? "");
  const headings = [...i.html.matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi)].map((m) => text(m[1] ?? ""));
  const imgs = [...i.html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const imgsNoAlt = imgs.filter((t) => !/\balt\s*=\s*"[^"]+"/i.test(t)).length;
  const links = [...i.html.matchAll(/href\s*=\s*"([^"]+)"/gi)].map((m) => m[1] ?? "");
  const internal = links.filter((h) => h.startsWith("/") || h.includes("unicaremedicalsolutions.com")).length;
  const external = links.length - internal;
  const t = i.seoTitle || i.title;
  const sentences = body.split(/[.!?]+\s/).filter(Boolean);
  const avgSentence = sentences.length ? words / sentences.length : 0;
  const slugKw = kw.replace(/[^a-z0-9]+/g, "-");

  const c = (id: string, label: string, ok: boolean, partial = false, critical = false): SeoCheck => ({ id, label, status: ok ? "good" : partial ? "warn" : "bad", critical: !ok && !partial && critical });
  const checks: SeoCheck[] = [
    c("kw", "Focus keyword is set", !!kw),
    c("kw-title", "Focus keyword in SEO title", has(t)),
    c("kw-desc", "Focus keyword in meta description", has(i.metaDescription)),
    c("kw-slug", "Focus keyword in URL slug", !!kw && i.slug.includes(slugKw), !!kw && slugKw.split("-").some((w) => w.length > 3 && i.slug.includes(w))),
    c("kw-h1", "Focus keyword in H1 (blog title)", has(i.title)),
    c("kw-intro", "Focus keyword in first paragraph", has(firstPara)),
    c("kw-headings", "Keyword used in a subheading", headings.some(has), headings.length > 0),
    c("length", `Content length (${words} words)`, words >= 600, words >= 300),
    c("title-len", `SEO title length (${t.length}/60)`, t.length >= 30 && t.length <= 60, t.length > 0 && t.length <= 70, t.length === 0),
    c("desc-len", `Meta description length (${i.metaDescription.length}/160)`, i.metaDescription.length >= 120 && i.metaDescription.length <= 160, i.metaDescription.length >= 50 && i.metaDescription.length <= 180),
    c("img-alt", imgs.length ? `Images with alt text (${imgs.length - imgsNoAlt}/${imgs.length})` : "Inline images have alt text", imgsNoAlt === 0),
    c("internal", `Internal links (${internal})`, internal >= 2, internal === 1),
    c("external", `External links (${external})`, external >= 1, true),
    c("canonical", "Canonical URL", true),
    c("featured", "Featured image", !!i.featuredImage),
    c("featured-alt", "Featured image alt text", !!i.featuredAlt && !/\.(jpe?g|png|webp)$/i.test(i.featuredAlt), !!i.featuredAlt),
    c("schema", "Structured data type", !!i.schemaType),
    c("readability", `Readability (avg ${Math.round(avgSentence)} words/sentence)`, avgSentence > 0 && avgSentence <= 22, avgSentence <= 30),
    c("dup-title", "SEO title is unique", !(i.otherTitles ?? []).map(norm).includes(norm(t))),
    c("dup-desc", "Meta description is unique", !i.metaDescription || !(i.otherDescriptions ?? []).map(norm).includes(norm(i.metaDescription))),
  ];
  const pts = checks.reduce((s, x) => s + (x.status === "good" ? 1 : x.status === "warn" ? 0.5 : 0), 0);
  return { score: Math.round((pts / checks.length) * 100), checks };
}

export const slugify = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s-]/g, "").trim().replace(/[\s-]+/g, "-").slice(0, 90);
