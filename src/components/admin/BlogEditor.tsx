import { useEffect, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import Youtube from "@tiptap/extension-youtube";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { analyzeSeo, slugify } from "@/lib/seo-score";
import { cleanHtml } from "@/lib/html";
import { field, MediaUpload, SerpPreview, statusDot, linkTargets, uploadMedia, type LinkTarget } from "./shared";

type Row = Database["public"]["Tables"]["cms_blog_posts"]["Row"];
type Insert = Database["public"]["Tables"]["cms_blog_posts"]["Insert"];

const empty = {
  id: "", title: "", slug: "", category: "Modular Operation Theatre", author: "Unicare Medical Solutions", excerpt: "", tags: "",
  featured_image_url: "", featured_image_alt: "", featured_image_title: "", featured_image_caption: "", featured_image_description: "",
  meta_title: "", meta_description: "", focus_keyword: "", secondary: "", canonical_url: "", og_title: "", og_description: "", og_image: "",
  twitter_title: "", twitter_description: "", twitter_image: "", robots_index: true, robots_follow: true, schema_type: "BlogPosting",
  status: "draft", published_at: "", related: "", faqs: "",
};
type Form = typeof empty;

const legacyHtml = (content: unknown) => Array.isArray(content) ? content.map((p) => typeof p === "object" && p ? `${"heading" in p && p.heading ? `<h2>${String(p.heading)}</h2>` : ""}<p>${String("text" in p ? p.text : "")}</p>` : `<p>${String(p)}</p>`).join("") : "";

export function BlogManager() {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null | "new">(null);
  const [filter, setFilter] = useState("");
  const load = () => supabase.from("cms_blog_posts").select("*").order("updated_at", { ascending: false }).then(({ data }) => setRows(data ?? []));
  useEffect(() => { load(); }, []);
  if (editing) return <BlogEditor row={editing === "new" ? null : editing} all={rows} onDone={() => { setEditing(null); load(); }} />;
  const list = rows.filter((r) => !filter || r.status === filter);
  return <div>
    <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold">Blog Posts</h1><div className="flex gap-2"><select className={`${field} w-40`} value={filter} onChange={(e) => setFilter(e.target.value)}><option value="">All</option><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select><Button onClick={() => setEditing("new")}>+ Create Blog</Button></div></div>
    <div className="mt-5 space-y-2">{list.map((r) => <article key={r.id} className="flex items-center justify-between gap-4 border border-border bg-background p-4"><div><h2 className="font-bold">{r.title}</h2><p className="text-xs text-muted-foreground">{r.status}{r.published_at && new Date(r.published_at) > new Date() ? " · scheduled " + new Date(r.published_at).toLocaleString("en-IN") : ""} · /blog/{r.slug} · {r.category}</p></div><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setEditing(r)}>Edit</Button><Button size="sm" variant="ghost" onClick={async () => { const { id: _i, created_at: _c, updated_at: _u, ...rest } = r; const { error } = await supabase.from("cms_blog_posts").insert({ ...rest, title: `${r.title} (copy)`, slug: `${r.slug}-copy-${Date.now().toString(36)}`, status: "draft", published_at: null }); if (error) alert(error.message); load(); }}>Duplicate</Button><Button size="sm" variant="ghost" onClick={async () => { if (!confirm(`Delete “${r.title}” permanently?`)) return; await supabase.from("cms_blog_posts").delete().eq("id", r.id); load(); }}>Delete</Button>{r.status === "published" && <Button size="sm" variant="ghost" asChild><a href={`/blog/${r.slug}`} target="_blank" rel="noreferrer">View</a></Button>}</div></article>)}{!list.length && <p className="text-sm text-muted-foreground">No blog posts yet.</p>}</div>
  </div>;
}

function toForm(r: Row | null): Form {
  if (!r) return { ...empty };
  return {
    id: r.id, title: r.title, slug: r.slug, category: r.category, author: r.author, excerpt: r.excerpt, tags: r.tags.join(", "),
    featured_image_url: r.featured_image_url ?? "", featured_image_alt: r.featured_image_alt ?? "", featured_image_title: r.featured_image_title ?? "", featured_image_caption: r.featured_image_caption ?? "", featured_image_description: r.featured_image_description ?? "",
    meta_title: r.meta_title ?? "", meta_description: r.meta_description ?? "", focus_keyword: r.focus_keyword ?? "", secondary: r.focus_keywords.join(", "), canonical_url: r.canonical_url ?? "",
    og_title: r.og_title ?? "", og_description: r.og_description ?? "", og_image: r.og_image ?? "", twitter_title: r.twitter_title ?? "", twitter_description: r.twitter_description ?? "", twitter_image: r.twitter_image ?? "",
    robots_index: r.robots_index, robots_follow: r.robots_follow, schema_type: r.schema_type, status: r.status, published_at: r.published_at ? r.published_at.slice(0, 16) : "", related: r.related_product_slugs.join(", "),
    faqs: (Array.isArray(r.faqs) ? r.faqs : []).map((x) => { const o = x as { q?: string; a?: string }; return `${o.q ?? ""} | ${o.a ?? ""}`; }).join("\n"),
  };
}

function BlogEditor({ row, all, onDone }: { row: Row | null; all: Row[]; onDone: () => void }) {
  const [f, setF] = useState<Form>(toForm(row));
  const [slugTouched, setSlugTouched] = useState(!!row);
  const [html, setHtml] = useState(row?.content_html ?? legacyHtml(row?.content));
  const [cats, setCats] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState(false);
  const [linkPicker, setLinkPicker] = useState(false);
  const draftKey = `unicare_blog_draft_${row?.id ?? "new"}`;
  const [autosave, setAutosave] = useState("");
  const restored = useRef(false);
  const editorRef = useRef<Editor | null>(null);
  const restoreLocal = () => {
    if (restored.current) return; restored.current = true;
    const saved = localStorage.getItem(draftKey);
    if (!saved) return;
    try { const d = JSON.parse(saved) as { f: Form; html: string; at: string }; if (d.at > (row?.updated_at ?? "") && confirm("An unsaved local copy of this post was found. Restore it?")) { setF(d.f); setHtml(d.html); editorRef.current?.commands.setContent(d.html); } else localStorage.removeItem(draftKey); } catch { localStorage.removeItem(draftKey); }
  };
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((x) => ({ ...x, [k]: v }));
  useEffect(() => { supabase.from("blog_categories").select("name").order("sort_order").then(({ data }) => setCats((data ?? []).map((c) => c.name))); }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false, autolink: true } }), Image, Table.configure({ resizable: false }), TableRow, TableHeader, TableCell, Youtube.configure({ nocookie: true })],
    content: html,
    onUpdate: ({ editor: e }) => setHtml(e.getHTML()),
    editorProps: { attributes: { class: "prose-unicare min-h-[420px] max-w-none p-4 focus:outline-none" } },
  });

  editorRef.current = editor;
  useEffect(() => { if (editor) restoreLocal(); }, [editor]); // eslint-disable-line react-hooks/exhaustive-deps
  const dirty = useMemo(() => JSON.stringify(f) !== JSON.stringify(toForm(row)) || html !== (row?.content_html ?? legacyHtml(row?.content)), [f, html, row]);
  useEffect(() => {
    if (!dirty) return;
    setAutosave("Saving…");
    const t = setTimeout(() => { localStorage.setItem(draftKey, JSON.stringify({ f, html, at: new Date().toISOString() })); setAutosave("Saved locally " + new Date().toLocaleTimeString("en-IN")); }, 1500);
    return () => clearTimeout(t);
  }, [f, html, dirty, draftKey]);
  useEffect(() => { const h = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); }; window.addEventListener("beforeunload", h); return () => window.removeEventListener("beforeunload", h); }, [dirty]);
  const others = all.filter((r) => r.id !== f.id);
  const analysis = useMemo(() => analyzeSeo({ title: f.title, seoTitle: f.meta_title, metaDescription: f.meta_description, slug: f.slug, focusKeyword: f.focus_keyword, html, canonical: f.canonical_url, featuredImage: f.featured_image_url, featuredAlt: f.featured_image_alt, schemaType: f.schema_type, otherTitles: others.map((o) => o.meta_title || o.title), otherDescriptions: others.map((o) => o.meta_description ?? "").filter(Boolean) }), [f, html, others]);
  const dupSlug = others.some((o) => o.slug === f.slug);
  const warnings = [
    !f.meta_title && "Missing SEO title (blog title will be used)", !f.meta_description && "Missing meta description", !f.featured_image_url && "Missing featured image",
    f.featured_image_url && !f.featured_image_alt && "Featured image has no alt text", !f.focus_keyword && "Missing focus keyword",
    analysis.checks.find((c) => c.id === "length")?.status === "bad" && "Very short content", analysis.checks.find((c) => c.id === "dup-title")?.status === "bad" && "Duplicate SEO title", analysis.checks.find((c) => c.id === "dup-desc")?.status === "bad" && "Duplicate meta description",
  ].filter(Boolean) as string[];
  const critical = [!f.title.trim() && "Title (H1) is required", !f.slug.trim() && "Slug is required", dupSlug && "Another post already uses this slug", !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(f.slug) && f.slug && "Slug may only contain lowercase letters, numbers and hyphens"].filter(Boolean) as string[];

  async function save(status: string) {
    if (critical.length) { setMsg(critical.join(". ")); return; }
    if (status === "published" && !f.robots_index && !confirm("This post is set to NOINDEX. Publish it hidden from search engines?")) return;
    setMsg("Saving…");
    const payload: Insert = {
      ...(f.id ? { id: f.id } : {}), title: f.title.trim(), slug: f.slug, category: f.category, author: f.author, excerpt: f.excerpt, tags: f.tags.split(",").map((x) => x.trim()).filter(Boolean),
      content_html: cleanHtml(html), content: [], featured_image_url: f.featured_image_url || null, featured_image_alt: f.featured_image_alt || null, featured_image_title: f.featured_image_title || null, featured_image_caption: f.featured_image_caption || null, featured_image_description: f.featured_image_description || null,
      meta_title: f.meta_title || null, meta_description: f.meta_description || null, focus_keyword: f.focus_keyword || null, focus_keywords: f.secondary.split(",").map((x) => x.trim()).filter(Boolean), canonical_url: f.canonical_url || null,
      og_title: f.og_title || null, og_description: f.og_description || null, og_image: f.og_image || null, twitter_title: f.twitter_title || null, twitter_description: f.twitter_description || null, twitter_image: f.twitter_image || null,
      robots_index: f.robots_index, robots_follow: f.robots_follow, schema_type: f.schema_type, status,
      published_at: status === "published" ? (f.published_at ? new Date(f.published_at).toISOString() : (row?.published_at ?? new Date().toISOString())) : (f.published_at ? new Date(f.published_at).toISOString() : null),
      related_product_slugs: f.related.split(",").map((x) => x.trim()).filter(Boolean),
      faqs: f.faqs.split("\n").map((l) => l.split("|")).filter((p) => p.length > 1 && p[0]!.trim() && p.slice(1).join("|").trim()).map((p) => ({ q: p[0]!.trim(), a: p.slice(1).join("|").trim() })),
    };
    const { data, error } = await supabase.from("cms_blog_posts").upsert(payload).select().single();
    if (error) { setMsg(error.message); return; }
    localStorage.removeItem(draftKey); setAutosave(""); setF(toForm(data)); setMsg(status === "published" ? "Published. It is now live, in the sitemap and in Latest Blogs." : status === "archived" ? "Archived — removed from the site." : "Draft saved.");
  }
  async function remove() { if (!f.id || !confirm("Delete this post permanently?")) return; await supabase.from("cms_blog_posts").delete().eq("id", f.id); onDone(); }

  const inp = (k: keyof Form, label: string, props: { area?: boolean; hint?: string } = {}) => <label className="block text-xs font-semibold">{label}{props.area ? <textarea value={String(f[k])} onChange={(e) => set(k, e.target.value as never)} className={`${field} mt-1 min-h-20`} /> : <input value={String(f[k])} onChange={(e) => set(k, e.target.value as never)} className={`${field} mt-1`} />}{props.hint && <span className="mt-1 block font-normal text-muted-foreground">{props.hint}</span>}</label>;

  return <div>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3"><button className="text-sm underline" onClick={() => { if (!dirty || confirm("Leave without saving? A local copy is kept.")) onDone(); }}>← All posts</button>{autosave && <span className="text-xs text-muted-foreground">{autosave}</span>}</div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => setPreview(true)}>Preview</Button>
        <Button variant="outline" onClick={() => save("draft")}>{f.status === "published" ? "Unpublish (draft)" : "Save draft"}</Button>
        <Button onClick={() => save("published")}>{f.published_at && new Date(f.published_at) > new Date() ? "Schedule" : f.status === "published" ? "Update" : "Publish"}</Button>
        {f.id && <Button variant="ghost" onClick={() => save("archived")}>Archive</Button>}
        {f.id && <Button variant="destructive" onClick={remove}>Delete</Button>}
      </div>
    </div>
    {msg && <p className="mt-3 border border-border bg-background p-3 text-sm">{msg}</p>}
    <div className="mt-5 grid gap-6 xl:grid-cols-3">
      <div className="space-y-4 xl:col-span-2">
        <div className="space-y-3 border border-border bg-background p-5">
          <label className="block text-xs font-semibold">Title (page H1)<input value={f.title} onChange={(e) => { set("title", e.target.value); if (!slugTouched) set("slug", slugify(e.target.value)); }} className={`${field} mt-1 text-lg font-bold`} /></label>
          <label className="block text-xs font-semibold">URL slug<div className="mt-1 flex items-center"><span className="border border-r-0 border-input bg-muted px-2 py-2 text-xs">/blog/</span><input value={f.slug} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} className={field} /></div>{row?.status === "published" && f.slug !== row.slug && <span className="mt-1 block font-normal text-amber-700">Changing a published slug automatically creates a 301 redirect from the old URL.</span>}</label>
          {inp("excerpt", "Excerpt", { area: true })}
        </div>
        <div className="border border-border bg-background">
          {editor && <Toolbar editor={editor} onInternalLink={() => setLinkPicker(true)} />}
          <EditorContent editor={editor} />
          <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">The title above is the only H1. The editor offers H2–H4 for sections.</p>
        </div>
        <div className="grid gap-3 border border-border bg-background p-5 md:grid-cols-2">
          <h2 className="font-bold md:col-span-2">Featured image</h2>
          <label className="block text-xs font-semibold md:col-span-2">Image URL<input value={f.featured_image_url} onChange={(e) => set("featured_image_url", e.target.value)} className={`${field} mt-1`} /><MediaUpload onUploaded={(u) => set("featured_image_url", u)} /></label>
          {inp("featured_image_alt", "Alt text (required)", { hint: "Describe the image, e.g. “Modular operation theatre installation by Unicare Medical Solutions”." })}
          {inp("featured_image_title", "Image title")}
          {inp("featured_image_caption", "Caption")}
          {inp("featured_image_description", "Description")}
        </div>
      </div>
      <div className="space-y-4">
        <SeoScore score={analysis.score} checks={analysis.checks} />
        {!!(warnings.length || critical.length) && <div className="border border-border bg-background p-4 text-sm"><h2 className="font-bold">Before publishing</h2><ul className="mt-2 space-y-1">{critical.map((w) => <li key={w} className="text-destructive">✕ {w}</li>)}{warnings.map((w) => <li key={w} className="text-amber-700">! {w}</li>)}</ul></div>}
        <SerpPreview title={f.meta_title || f.title} path={`/blog/${f.slug}`} description={f.meta_description || f.excerpt} />
        <div className="space-y-3 border border-border bg-background p-4">
          <h2 className="font-bold">Publishing</h2>
          <label className="block text-xs font-semibold">Category<select value={f.category} onChange={(e) => set("category", e.target.value)} className={`${field} mt-1`}>{[...new Set([...cats, f.category])].map((c) => <option key={c}>{c}</option>)}</select></label>
          {inp("author", "Author")}
          {inp("tags", "Tags (comma separated)", { hint: "Tag pages are not indexed by default." })}
          {inp("faqs", "FAQs (one per line: Question | Answer)", { area: true, hint: "Shown at the end of the post with FAQ schema." })}
          {inp("related", "Related product slugs (comma separated)")}
          <label className="block text-xs font-semibold">Publish date (future = scheduled)<input type="datetime-local" value={f.published_at} onChange={(e) => set("published_at", e.target.value)} className={`${field} mt-1`} /></label>
        </div>
        <div className="space-y-3 border border-border bg-background p-4">
          <h2 className="font-bold">SEO</h2>
          {inp("meta_title", "SEO title")}
          {inp("meta_description", "Meta description", { area: true })}
          {inp("focus_keyword", "Focus keyword")}
          {inp("secondary", "Secondary keywords (comma separated)")}
          {inp("canonical_url", "Canonical URL", { hint: "Leave empty to use this post's own URL." })}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.robots_index} onChange={(e) => set("robots_index", e.target.checked)} />Index</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.robots_follow} onChange={(e) => set("robots_follow", e.target.checked)} />Follow</label>
          </div>
          <label className="block text-xs font-semibold">Schema type<select value={f.schema_type} onChange={(e) => set("schema_type", e.target.value)} className={`${field} mt-1`}><option>BlogPosting</option><option>Article</option><option>NewsArticle</option><option>TechArticle</option></select></label>
          {inp("og_title", "OG title")}{inp("og_description", "OG description", { area: true })}
          <label className="block text-xs font-semibold">OG image<input value={f.og_image} onChange={(e) => set("og_image", e.target.value)} className={`${field} mt-1`} /><MediaUpload onUploaded={(u) => set("og_image", u)} /></label>
          {inp("twitter_title", "X/Twitter title")}{inp("twitter_description", "X/Twitter description", { area: true })}{inp("twitter_image", "X/Twitter image URL")}
        </div>
      </div>
    </div>
    {linkPicker && editor && <InternalLinkPicker onClose={() => setLinkPicker(false)} onPick={(t) => { const { empty: noSel } = editor.state.selection; if (noSel) editor.chain().focus().insertContent(`<a href="${t.path}">${t.label}</a> `).run(); else editor.chain().focus().extendMarkRange("link").setLink({ href: t.path }).run(); setLinkPicker(false); }} />}
    {preview && <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/50 p-4" onClick={() => setPreview(false)}><article className="prose-unicare mx-auto max-w-3xl bg-background p-8" onClick={(e) => e.stopPropagation()}><p className="!text-xs uppercase">Preview · not indexed</p><h1>{f.title}</h1>{f.featured_image_url && <img src={f.featured_image_url} alt={f.featured_image_alt} />}<div dangerouslySetInnerHTML={{ __html: cleanHtml(html) }} /><Button onClick={() => setPreview(false)}>Close preview</Button></article></div>}
  </div>;
}

function SeoScore({ score, checks }: { score: number; checks: ReturnType<typeof analyzeSeo>["checks"] }) {
  const tone = score >= 75 ? "text-emerald-700" : score >= 50 ? "text-amber-600" : "text-destructive";
  return <div className="border border-border bg-background p-4">
    <div className="flex items-baseline justify-between"><h2 className="font-bold">SEO checklist</h2><p className={`text-2xl font-bold ${tone}`}>{score}<span className="text-sm">/100</span></p></div>
    <p className="mt-1 text-xs text-muted-foreground">An optimisation guide only. A high score does not guarantee Google rankings.</p>
    <ul className="mt-3 space-y-1.5 text-xs">{checks.map((c) => <li key={c.id} className="flex items-center gap-2"><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusDot[c.status]}`} />{c.label}</li>)}</ul>
  </div>;
}

function Toolbar({ editor, onInternalLink }: { editor: Editor; onInternalLink: () => void }) {
  const b = (label: string, run: () => void, active = false) => <button type="button" onMouseDown={(e) => { e.preventDefault(); run(); }} className={`border border-border px-2 py-1 text-xs font-semibold ${active ? "bg-primary text-primary-foreground" : "bg-background"}`}>{label}</button>;
  const c = () => editor.chain().focus();
  return <div className="sticky top-0 z-10 flex flex-wrap gap-1 border-b border-border bg-muted p-2">
    {b("P", () => c().setParagraph().run(), editor.isActive("paragraph"))}
    {([2, 3, 4] as const).map((l) => <span key={l}>{b(`H${l}`, () => c().toggleHeading({ level: l }).run(), editor.isActive("heading", { level: l }))}</span>)}
    {b("B", () => c().toggleBold().run(), editor.isActive("bold"))}
    {b("I", () => c().toggleItalic().run(), editor.isActive("italic"))}
    {b("• List", () => c().toggleBulletList().run(), editor.isActive("bulletList"))}
    {b("1. List", () => c().toggleOrderedList().run(), editor.isActive("orderedList"))}
    {b("Quote", () => c().toggleBlockquote().run(), editor.isActive("blockquote"))}
    {b("Internal link", onInternalLink)}
    {b("External link", () => { const url = prompt("External URL (https://…)"); if (url && /^https?:\/\//.test(url)) c().extendMarkRange("link").setLink({ href: url, target: "_blank", rel: "noopener noreferrer" }).run(); })}
    {b("Unlink", () => c().unsetLink().run())}
    {b("Image URL", () => { const src = prompt("Image URL"); if (!src) return; const alt = prompt("Alt text (describe the image)") ?? ""; c().setImage({ src, alt }).run(); })}
    <label className="cursor-pointer border border-border bg-background px-2 py-1 text-xs font-semibold">Upload image<input type="file" accept="image/*" className="hidden" onChange={async (e) => { const file = e.target.files?.[0]; if (!file) return; const alt = prompt("Alt text (describe the image)") ?? ""; const src = await uploadMedia(file); c().setImage({ src, alt }).run(); }} /></label>
    {b("Table", () => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}
    {editor.isActive("table") && <>{b("+Row", () => c().addRowAfter().run())}{b("+Col", () => c().addColumnAfter().run())}{b("−Table", () => c().deleteTable().run())}</>}
    {b("YouTube", () => { const src = prompt("YouTube URL"); if (src) c().setYoutubeVideo({ src }).run(); })}
    {b("Undo", () => c().undo().run())}
  </div>;
}

function InternalLinkPicker({ onPick, onClose }: { onPick: (t: LinkTarget) => void; onClose: () => void }) {
  const [all, setAll] = useState<LinkTarget[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => { linkTargets().then(setAll); }, []);
  const list = all.filter((t) => !q || `${t.label} ${t.path}`.toLowerCase().includes(q.toLowerCase())).slice(0, 40);
  return <div className="fixed inset-0 z-50 flex items-start justify-center bg-navy/40 p-4 pt-24" onClick={onClose}><div className="w-full max-w-lg bg-background p-5" onClick={(e) => e.stopPropagation()}>
    <h2 className="font-bold">Insert internal link</h2><p className="text-xs text-muted-foreground">Select text in the editor first to link it, or pick a page to insert its name as a link.</p>
    <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, blogs, locations…" className={`${field} mt-3`} />
    <ul className="mt-3 max-h-80 overflow-y-auto">{list.map((t) => <li key={t.path}><button className="w-full border-b border-border px-2 py-2 text-left text-sm hover:bg-muted" onClick={() => onPick(t)}><span className="block font-medium">{t.label}</span><span className="text-xs text-muted-foreground">{t.group} · {t.path}</span></button></li>)}</ul>
  </div></div>;
}
