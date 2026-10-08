import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { BlogManager } from "@/components/admin/BlogEditor";
import { field, MediaUpload, SerpPreview } from "@/components/admin/shared";
import { slugify } from "@/lib/seo-score";
import { listStaff, grantStaffRole, claimInitialAdmin } from "@/lib/admin-users.functions";

type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
type Status = Database["public"]["Enums"]["enquiry_status"];
type Role = "admin" | "content_manager";
type CmsTable = "cms_products" | "cms_testimonials" | "cms_locations";
type Tab = "dashboard" | "enquiries" | "blogs" | CmsTable | "categories" | "tags" | "media" | "activity" | "redirects" | "settings" | "users";

const STATUSES: { v: Status; l: string }[] = [
  { v: "new", l: "New" }, { v: "contacted", l: "Contacted" }, { v: "qualified", l: "Qualified" },
  { v: "proposal_sent", l: "Proposal Sent" }, { v: "converted", l: "Converted" }, { v: "closed", l: "Closed" },
];

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin | Unicare Medical Solutions" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: Admin,
});

function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<Role | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  const claim = useServerFn(claimInitialAdmin);
  const [pw, setPw] = useState(false);
  useEffect(() => {
    if (!session) { setRole(undefined); return; }
    const read = () => supabase.from("user_roles").select("role").eq("user_id", session.user.id).then(({ data }) => {
      const roles = (data ?? []).map((r) => r.role as string);
      return roles.includes("admin") ? "admin" : roles.includes("content_manager") ? "content_manager" : null;
    });
    read().then(async (r) => {
      if (r === null) { const c = await claim().catch(() => ({ ok: false })); if (c.ok) { setRole(await read()); return; } }
      setRole(r as Role | null);
    });
  }, [session, claim]);

  if (!ready) return null;
  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-navy text-navy-foreground">
        <div className="site-wrap flex h-14 items-center justify-between">
          <Link to="/" className="font-display font-bold">Unicare Admin</Link>
          {session && <div className="flex items-center gap-4 text-sm"><span className="hidden opacity-80 sm:inline">{session.user.email} · {role === "admin" ? "Super Admin" : role === "content_manager" ? "Content Manager" : ""}</span><button className="underline" onClick={() => setPw(true)}>Change password</button><button className="underline" onClick={() => supabase.auth.signOut()}>Logout</button></div>}
        </div>
      </header>
      {pw && session && <ChangePassword email={session.user.email ?? ""} onClose={() => setPw(false)} />}
      <div className="site-wrap py-8">
        {!session ? <Login /> : role === null ? (
          <div className="max-w-lg border border-border bg-background p-6 text-sm">
            <p className="font-semibold">Your account does not have admin access yet.</p>
            <p className="mt-2 text-muted-foreground">Signed in as {session.user.email}. Ask a Super Admin to grant access to this account.</p>
          </div>
        ) : role ? <AdminApp role={role} /> : null}
      </div>
    </div>
  );
}

function AdminApp({ role }: { role: Role }) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const tabs: { key: Tab; label: string; admin?: boolean }[] = [
    { key: "dashboard", label: "Dashboard" }, { key: "enquiries", label: "Enquiries", admin: true }, { key: "blogs", label: "Blogs" }, { key: "cms_products", label: "Products" },
    { key: "cms_locations", label: "Locations" }, { key: "cms_testimonials", label: "Testimonials" }, { key: "categories", label: "Categories" }, { key: "tags", label: "Tags" }, { key: "media", label: "Media Library" },
    { key: "redirects", label: "Redirects", admin: true }, { key: "settings", label: "Site & SEO Settings", admin: true }, { key: "users", label: "Users", admin: true }, { key: "activity", label: "Activity Log", admin: true },
  ];
  const visible = tabs.filter((t) => !t.admin || role === "admin");
  return <div>
    <nav className="mb-7 flex gap-1 overflow-x-auto border-b border-border" aria-label="Admin sections">{visible.map((t) => <Button key={t.key} variant={tab === t.key ? "default" : "ghost"} className="shrink-0 rounded-none" onClick={() => setTab(t.key)}>{t.label}</Button>)}</nav>
    {tab === "dashboard" ? <Dashboard role={role} go={setTab} /> : tab === "enquiries" ? <Enquiries /> : tab === "blogs" ? <BlogManager /> : tab === "categories" ? <Categories /> : tab === "tags" ? <Tags /> : tab === "media" ? <MediaLibrary /> : tab === "activity" ? <Activity /> : tab === "redirects" ? <Redirects /> : tab === "settings" ? <SiteSettings /> : tab === "users" ? <Users /> : <CmsManager table={tab} />}
  </div>;
}

function Dashboard({ role, go }: { role: Role; go: (t: Tab) => void }) {
  const [s, setS] = useState<Record<string, number>>({});
  type Mini = { id: string; title: string; status: string; updated_at: string; created_at: string };
  const [recent, setRecent] = useState<Mini[]>([]); const [updated, setUpdated] = useState<Mini[]>([]);
  useEffect(() => {
    const count = async (key: string, q: PromiseLike<{ count: number | null }>) => { const { count: n } = await q; setS((x) => ({ ...x, [key]: n ?? 0 })); };
    const c = (t: "cms_products" | "cms_blog_posts" | "cms_locations") => supabase.from(t).select("id", { count: "exact", head: true });
    count("products", c("cms_products")); count("productsPub", c("cms_products").eq("status", "published")); count("productsDraft", c("cms_products").eq("status", "draft"));
    count("blogs", c("cms_blog_posts")); count("blogsPub", c("cms_blog_posts").eq("status", "published")); count("blogsDraft", c("cms_blog_posts").eq("status", "draft"));
    count("blogsSched", c("cms_blog_posts").eq("status", "published").gt("published_at", new Date().toISOString())); count("categories", supabase.from("blog_categories").select("id", { count: "exact", head: true }));
    supabase.from("cms_blog_posts").select("id,title,status,updated_at,created_at,tags").then(({ data }) => { const d = data ?? []; setS((x) => ({ ...x, tags: new Set(d.flatMap((r) => r.tags)).size })); setRecent([...d].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5)); setUpdated([...d].sort((a, b) => b.updated_at.localeCompare(a.updated_at)).slice(0, 5)); });
    count("locations", c("cms_locations")); count("locationsPub", c("cms_locations").eq("status", "published"));
    if (role === "admin") (["new", "contacted", "converted"] as const).forEach((st) => count(`enq_${st}`, supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", st)));
  }, [role]);
  const cards: [string, string][] = [["Total Products", "products"], ["Published Products", "productsPub"], ["Draft Products", "productsDraft"], ["Total Blogs", "blogs"], ["Published Blogs", "blogsPub"], ["Draft Blogs", "blogsDraft"], ["Scheduled Blogs", "blogsSched"], ["Blog Categories", "categories"], ["Blog Tags", "tags"], ["Location Pages", "locations"], ["Published Locations", "locationsPub"], ...(role === "admin" ? [["New Enquiries", "enq_new"], ["Contacted Enquiries", "enq_contacted"], ["Converted Enquiries", "enq_converted"]] as [string, string][] : [])];
  const actions: [string, Tab, boolean?][] = [["+ Create Blog", "blogs"], ["+ Upload Media", "media"], ["Manage Categories", "categories"], ["+ Add Product", "cms_products"], ["+ Add Location Page", "cms_locations"], ["View Enquiries", "enquiries", true], ["Manage SEO", "settings", true], ["Site Settings", "settings", true]];
  return <div>
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <p className="mt-1 text-sm text-muted-foreground">Counts cover content added in the CMS. Built-in pages remain live alongside it.</p>
    <div className="mt-5 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4 xl:grid-cols-6">{cards.map(([l, k]) => <div key={k} className="bg-background p-4"><p className="text-xs text-muted-foreground">{l}</p><p className="mt-1 text-2xl font-bold">{s[k] ?? "–"}</p></div>)}</div>
    <h2 className="mt-8 font-bold">Quick actions</h2>
    <div className="mt-3 flex flex-wrap gap-2">{actions.filter((a) => !a[2] || role === "admin").map(([l, t]) => <Button key={l} variant="outline" onClick={() => go(t)}>{l}</Button>)}</div>
    <div className="mt-8 grid gap-6 md:grid-cols-2">{([["Recent blogs", recent, "created_at"], ["Recently updated", updated, "updated_at"]] as const).map(([h, list, k]) => <div key={h} className="border border-border bg-background p-4"><h2 className="font-bold">{h}</h2><ul className="mt-2 divide-y divide-border text-sm">{list.length ? list.map((r) => <li key={r.id} className="flex justify-between gap-3 py-2"><span className="truncate">{r.title}</span><span className="shrink-0 text-xs text-muted-foreground">{r.status} · {new Date(r[k]).toLocaleDateString("en-IN")}</span></li>) : <li className="py-2 text-muted-foreground">No blogs yet.</li>}</ul></div>)}</div>
  </div>;
}

/* ---------------- Generic CMS manager (products, locations, testimonials) ---------------- */
type FieldDef = { key: string; label: string; kind?: "text" | "area" | "number" | "lines" | "pairs" | "bool" | "image" | "select" | "date"; options?: string[]; required?: boolean; hint?: string; pairKeys?: [string, string] };
const seoFields: FieldDef[] = [
  { key: "seo_title", label: "SEO title" }, { key: "meta_description", label: "Meta description", kind: "area" },
  { key: "og_title", label: "OG title" }, { key: "og_description", label: "OG description", kind: "area" }, { key: "og_image", label: "OG image", kind: "image" },
];
const cmsConfig: Record<CmsTable, { title: string; label: (r: Record<string, unknown>) => string; path: (f: Record<string, unknown>) => string; fields: FieldDef[] }> = {
  cms_products: {
    title: "Products & Sub-products", label: (r) => String(r["name"]), path: (f) => `/products/${f["parent_slug"] ? `${String(f["parent_slug"])}/` : ""}${String(f["slug"])}`,
    fields: [
      { key: "name", label: "Name", required: true }, { key: "short_name", label: "Short name", required: true }, { key: "slug", label: "Slug", required: true },
      { key: "category", label: "Category", kind: "select", options: ["Operation Theatre", "Medical Gas", "Hospital Infrastructure"], required: true },
      { key: "parent_slug", label: "Parent product slug", hint: "Use modular-operation-theatre for Modular OT variants; leave empty for main products." },
      { key: "short_description", label: "Short description", kind: "area" }, { key: "introduction", label: "Introduction", kind: "area" },
      { key: "image_url", label: "Main image", kind: "image" }, { key: "image_alt", label: "Image alt text" },
      { key: "features", label: "Features (one per line)", kind: "lines" }, { key: "applications", label: "Applications (one per line)", kind: "lines" }, { key: "benefits", label: "Benefits (one per line)", kind: "lines" },
      { key: "specifications", label: "Specifications (Label :: Value per line)", kind: "pairs", pairKeys: ["label", "value"] },
      { key: "faqs", label: "FAQs (Question :: Answer per line)", kind: "pairs", pairKeys: ["q", "a"] },
      ...seoFields, { key: "focus_keyword", label: "Focus keyword" }, { key: "secondary_keywords", label: "Secondary keywords (one per line)", kind: "lines" },
      { key: "canonical_url", label: "Canonical URL", hint: "Leave empty to use the page's own URL." },
      { key: "schema_type", label: "Schema type", kind: "select", options: ["Product", "Service"] },
      { key: "robots_index", label: "Index", kind: "bool" }, { key: "robots_follow", label: "Follow", kind: "bool" }, { key: "sort_order", label: "Sort order", kind: "number" },
    ],
  },
  cms_locations: {
    title: "Location Pages", label: (r) => String(r["title"]), path: (f) => `/${String(f["slug"])}`,
    fields: [
      { key: "title", label: "H1 / page title", required: true }, { key: "slug", label: "Slug", required: true, hint: "e.g. modular-operation-theatre-manufacturers-in-lucknow" },
      { key: "product_slug", label: "Product slug", required: true }, { key: "state", label: "State", required: true }, { key: "city", label: "City" },
      { key: "introduction", label: "Introduction", kind: "area" }, { key: "content", label: "Main content (one paragraph per line, start a line with ## for a heading)", kind: "lines" },
      { key: "faqs", label: "FAQs (Question :: Answer per line)", kind: "pairs", pairKeys: ["q", "a"] },
      { key: "internal_links", label: "Internal links (Anchor text :: /path per line)", kind: "pairs", pairKeys: ["label", "path"] },
      { key: "image_url", label: "Featured image", kind: "image" }, { key: "image_alt", label: "Image alt text" },
      ...seoFields, { key: "focus_keywords", label: "Focus keywords (one per line)", kind: "lines" }, { key: "canonical_path", label: "Canonical path" },
      { key: "schema_type", label: "Schema type", kind: "select", options: ["Service", "LocalBusiness"] }, { key: "noindex", label: "Noindex", kind: "bool" },
    ],
  },
  cms_testimonials: {
    title: "Client Testimonials", label: (r) => String(r["client_name"]), path: () => "/",
    fields: [
      { key: "client_name", label: "Client name", required: true }, { key: "designation", label: "Designation" }, { key: "company", label: "Hospital / Company" }, { key: "city", label: "City" },
      { key: "testimonial", label: "Testimonial", kind: "area", required: true }, { key: "photo_url", label: "Photo", kind: "image" }, { key: "rating", label: "Rating (1–5)", kind: "number" },
      { key: "testimonial_date", label: "Date", kind: "date" }, { key: "sort_order", label: "Sort order", kind: "number" },
    ],
  },
};

type Val = string | number | boolean;
function CmsManager({ table }: { table: CmsTable }) {
  const config = cmsConfig[table];
  const hasStatus = table !== "cms_testimonials";
  const blank = () => { const o: Record<string, Val> = { status: "draft", published: false }; config.fields.forEach((d) => { o[d.key] = d.kind === "bool" ? d.key !== "noindex" : d.kind === "number" ? (d.key === "rating" ? 5 : 0) : d.kind === "select" ? d.options![0]! : ""; }); if (table === "cms_locations") o["product_slug"] = "modular-operation-theatre"; return o; };
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState<Record<string, Val>>(blank);
  const [msg, setMsg] = useState("");
  const load = async () => { const { data } = await supabase.from(table).select("*").order("updated_at", { ascending: false }); setRows((data ?? []) as Record<string, unknown>[]); };
  useEffect(() => { setForm(blank()); setMsg(""); load(); }, [table]);

  function edit(row: Record<string, unknown>) {
    const next = blank();
    for (const d of config.fields) {
      const v = row[d.key];
      if (d.kind === "lines") next[d.key] = Array.isArray(v) ? v.map((x) => typeof x === "string" ? x : typeof x === "object" && x && "text" in x ? String(x.text) : JSON.stringify(x)).join("\n") : "";
      else if (d.kind === "pairs") next[d.key] = Array.isArray(v) ? v.map((x) => { const o = x as Record<string, unknown>; return `${String(o[d.pairKeys![0]] ?? "")} :: ${String(o[d.pairKeys![1]] ?? "")}`; }).join("\n") : "";
      else if (d.kind === "bool") next[d.key] = Boolean(v);
      else if (d.kind === "number") next[d.key] = Number(v ?? 0);
      else next[d.key] = String(v ?? "");
    }
    next["id"] = String(row["id"]); next["status"] = String(row["status"] ?? (row["published"] ? "published" : "draft")); next["published"] = Boolean(row["published"]);
    setForm(next); window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if ("slug" in form && rows.some((r) => r["slug"] === form["slug"] && r["id"] !== form["id"])) { setMsg("Another item already uses this slug."); return; }
    setMsg("Saving…");
    const payload: Record<string, unknown> = {};
    for (const d of config.fields) {
      const v = form[d.key];
      if (d.kind === "lines") payload[d.key] = String(v).split("\n").map((x) => x.trim()).filter(Boolean);
      else if (d.kind === "pairs") payload[d.key] = String(v).split("\n").map((x) => x.split("::")).filter((p) => p.length >= 2).map(([a, ...b]) => ({ [d.pairKeys![0]]: a!.trim(), [d.pairKeys![1]]: b.join("::").trim() }));
      else if (d.kind === "number") payload[d.key] = Number(v);
      else if (d.kind === "bool") payload[d.key] = Boolean(v);
      else payload[d.key] = v === "" && !d.required ? null : v;
    }
    if (form["id"]) payload["id"] = form["id"];
    if (hasStatus) payload["status"] = form["status"]; else payload["published"] = Boolean(form["published"]);
    const { error } = await supabase.from(table).upsert(payload as never);
    setMsg(error?.message ?? "Saved."); if (!error) { setForm(blank()); load(); }
  }
  async function remove(id: string) { if (!confirm("Delete this item permanently?")) return; const { error } = await supabase.from(table).delete().eq("id", id); if (error) setMsg(error.message); load(); }

  const input = (d: FieldDef) => {
    const v = form[d.key];
    const onChange = (val: Val) => setForm((f) => ({ ...f, [d.key]: val, ...(d.key === "name" || (d.key === "title" && table === "cms_locations") ? (!f["id"] && !f["slugTouched"] ? { slug: slugify(String(val)) } : {}) : {}), ...(d.key === "slug" ? { slugTouched: true, slug: slugify(String(val)) } : {}) }));
    if (d.kind === "bool") return <label key={d.key} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(v)} onChange={(e) => onChange(e.target.checked)} />{d.label}</label>;
    return <label key={d.key} className="block text-xs font-semibold">{d.label}
      {d.kind === "area" || d.kind === "lines" || d.kind === "pairs" ? <textarea required={d.required} value={String(v ?? "")} onChange={(e) => onChange(e.target.value)} className={`${field} mt-1 min-h-24`} />
        : d.kind === "select" ? <select value={String(v)} onChange={(e) => onChange(e.target.value)} className={`${field} mt-1`}>{d.options!.map((o) => <option key={o}>{o}</option>)}</select>
        : <input required={d.required} type={d.kind === "number" ? "number" : d.kind === "date" ? "date" : "text"} value={String(v ?? "")} onChange={(e) => onChange(d.kind === "number" ? Number(e.target.value) : e.target.value)} className={`${field} mt-1`} />}
      {d.kind === "image" && <MediaUpload onUploaded={(url) => onChange(url)} />}
      {d.hint && <span className="mt-1 block font-normal text-muted-foreground">{d.hint}</span>}
    </label>;
  };
  const hasSeo = config.fields.some((d) => d.key === "seo_title");
  return <div><h1 className="text-2xl font-bold">{config.title}</h1>
    {table === "cms_testimonials" && <p className="mt-1 text-sm text-muted-foreground">Only add genuine client feedback you have permission to publish.</p>}
    <div className="mt-6 grid gap-8 lg:grid-cols-5">
      <form onSubmit={save} className="space-y-4 border border-border bg-background p-5 lg:col-span-2">
        {config.fields.map(input)}
        {hasSeo && <SerpPreview title={String(form["seo_title"] || form["name"] || form["title"] || "")} path={config.path(form)} description={String(form["meta_description"] || form["short_description"] || form["introduction"] || "")} />}
        {hasStatus ? <label className="block text-xs font-semibold">Status<select value={String(form["status"])} onChange={(e) => setForm({ ...form, status: e.target.value })} className={`${field} mt-1`}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          : <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form["published"])} onChange={(e) => setForm({ ...form, published: e.target.checked })} />Published</label>}
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
        <div className="flex gap-2"><Button type="submit">Save</Button><Button type="button" variant="outline" onClick={() => setForm(blank())}>New / Clear</Button></div>
      </form>
      <div className="space-y-3 lg:col-span-3">{rows.map((row) => <article key={String(row["id"])} className="flex items-start justify-between gap-4 border border-border bg-background p-4"><div><h2 className="font-bold">{config.label(row)}</h2><p className="mt-1 text-xs text-muted-foreground">{String(row["status"] ?? (row["published"] ? "published" : "draft"))} · {String(row["slug"] ?? row["company"] ?? "")}</p></div><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => edit(row)}>Edit</Button><Button size="sm" variant="destructive" onClick={() => remove(String(row["id"]))}>Delete</Button></div></article>)}{!rows.length && <p className="text-sm text-muted-foreground">No records yet. Add the first item using the form.</p>}</div>
    </div>
  </div>;
}

/* ---------------- Categories ---------------- */
type Cat = Database["public"]["Tables"]["blog_categories"]["Row"];
function Categories() {
  const blank = { id: "", name: "", slug: "", intro: "", seo_title: "", meta_description: "", noindex: false, sort_order: 0 };
  const [rows, setRows] = useState<Cat[]>([]);
  const [f, setF] = useState(blank);
  const [msg, setMsg] = useState("");
  const load = () => supabase.from("blog_categories").select("*").order("sort_order").then(({ data }) => setRows(data ?? []));
  useEffect(() => { load(); }, []);
  async function save(e: React.FormEvent) { e.preventDefault(); const { id, ...rest } = f; const { error } = await supabase.from("blog_categories").upsert({ ...(id ? { id } : {}), ...rest, seo_title: rest.seo_title || null, meta_description: rest.meta_description || null }); setMsg(error?.message ?? "Saved."); if (!error) { setF(blank); load(); } }
  async function del(id: string) { if (!confirm("Delete category? Posts keep their category text.")) return; const { error } = await supabase.from("blog_categories").delete().eq("id", id); setMsg(error?.message ?? ""); load(); }
  return <div><h1 className="text-2xl font-bold">Blog Categories</h1><div className="mt-6 grid gap-8 lg:grid-cols-5">
    <form onSubmit={save} className="space-y-3 border border-border bg-background p-5 lg:col-span-2">
      <label className="block text-xs font-semibold">Name<input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value, slug: f.id ? f.slug : slugify(e.target.value) })} className={`${field} mt-1`} /></label>
      <label className="block text-xs font-semibold">Slug (/blog/category/…)<input required value={f.slug} onChange={(e) => setF({ ...f, slug: slugify(e.target.value) })} className={`${field} mt-1`} /></label>
      <label className="block text-xs font-semibold">Intro content<textarea value={f.intro} onChange={(e) => setF({ ...f, intro: e.target.value })} className={`${field} mt-1 min-h-20`} /></label>
      <label className="block text-xs font-semibold">SEO title<input value={f.seo_title} onChange={(e) => setF({ ...f, seo_title: e.target.value })} className={`${field} mt-1`} /></label>
      <label className="block text-xs font-semibold">Meta description<textarea value={f.meta_description} onChange={(e) => setF({ ...f, meta_description: e.target.value })} className={`${field} mt-1`} /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.noindex} onChange={(e) => setF({ ...f, noindex: e.target.checked })} />Noindex this category</label>
      <SerpPreview title={f.seo_title || `${f.name} Articles | Unicare Medical Solutions`} path={`/blog/category/${f.slug}`} description={f.meta_description} />
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}<div className="flex gap-2"><Button type="submit">Save</Button><Button type="button" variant="outline" onClick={() => setF(blank)}>Clear</Button></div>
    </form>
    <div className="space-y-2 lg:col-span-3">{rows.map((c) => <article key={c.id} className="flex items-center justify-between border border-border bg-background p-3"><div><p className="font-semibold">{c.name}</p><p className="text-xs text-muted-foreground">/blog/category/{c.slug}{c.noindex ? " · noindex" : ""}</p></div><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setF({ id: c.id, name: c.name, slug: c.slug, intro: c.intro, seo_title: c.seo_title ?? "", meta_description: c.meta_description ?? "", noindex: c.noindex, sort_order: c.sort_order })}>Edit</Button><Button size="sm" variant="destructive" onClick={() => del(c.id)}>Delete</Button></div></article>)}</div>
  </div></div>;
}

/* ---------------- Redirects ---------------- */
type Redirect = Database["public"]["Tables"]["redirects"]["Row"];
const normPath = (p: string) => { const s = p.trim().replace(/^https?:\/\/[^/]+/i, "").split(/[?#]/)[0] ?? ""; const w = s.startsWith("/") ? s : `/${s}`; return w.length > 1 ? w.replace(/\/+$/, "") : w; };
function Redirects() {
  const [rows, setRows] = useState<Redirect[]>([]);
  const [f, setF] = useState({ from: "", to: "", code: 301 });
  const [msg, setMsg] = useState("");
  const load = () => supabase.from("redirects").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? []));
  useEffect(() => { load(); }, []);
  async function add(e: React.FormEvent) {
    e.preventDefault();
    const from = normPath(f.from), to = f.code === 410 ? from : (/^https?:\/\//.test(f.to) ? f.to.trim() : normPath(f.to));
    if (f.code !== 410 && from === to) { setMsg("Old and new URL are the same."); return; }
    // loop protection: follow the chain from the destination
    let cur = to; const seen = new Set([from]);
    for (let i = 0; i < 10; i++) { const next = rows.find((r) => r.from_path === cur); if (!next) break; if (seen.has(next.to_path)) { setMsg("This would create a redirect loop."); return; } seen.add(cur); cur = next.to_path; }
    const { error } = await supabase.from("redirects").upsert({ from_path: from, to_path: to, status_code: f.code }, { onConflict: "from_path" });
    setMsg(error?.message ?? "Redirect saved. It takes effect within a minute."); if (!error) { setF({ from: "", to: "", code: 301 }); load(); }
  }
  async function del(id: string) { await supabase.from("redirects").delete().eq("id", id); load(); }
  return <div><h1 className="text-2xl font-bold">Redirects</h1><p className="mt-1 text-sm text-muted-foreground">Changing the URL of a published blog, product or location page adds a 301 here automatically.</p>
    <form onSubmit={add} className="mt-5 grid gap-3 border border-border bg-background p-5 md:grid-cols-[1fr_1fr_160px_auto]">
      <input required placeholder="/old-url" value={f.from} onChange={(e) => setF({ ...f, from: e.target.value })} className={field} />
      <input required={f.code !== 410} disabled={f.code === 410} placeholder="/new-url" value={f.to} onChange={(e) => setF({ ...f, to: e.target.value })} className={field} />
      <select value={f.code} onChange={(e) => setF({ ...f, code: Number(e.target.value) })} className={field}><option value={301}>301 Permanent</option><option value={302}>302 Temporary</option><option value={410}>410 Gone</option></select>
      <Button type="submit">Add</Button>
    </form>{msg && <p className="mt-2 text-sm text-muted-foreground">{msg}</p>}
    <div className="mt-4 overflow-x-auto border border-border bg-background"><table className="w-full text-sm"><thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">From</th><th className="p-3">To</th><th className="p-3">Type</th><th className="p-3" /></tr></thead><tbody>{rows.map((r) => <tr key={r.id} className="border-t border-border"><td className="p-3 font-mono text-xs">{r.from_path}</td><td className="p-3 font-mono text-xs">{r.status_code === 410 ? "—" : r.to_path}</td><td className="p-3">{r.status_code}{r.auto_created ? " · auto" : ""}</td><td className="p-3 text-right"><Button size="sm" variant="ghost" onClick={() => del(r.id)}>Remove</Button></td></tr>)}{!rows.length && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No redirects yet.</td></tr>}</tbody></table></div>
  </div>;
}

/* ---------------- Site settings ---------------- */
type Settings = Database["public"]["Tables"]["cms_site_settings"]["Row"];
const settingGroups: { title: string; fields: [keyof Settings, string, boolean?][] }[] = [
  { title: "Company & contact", fields: [["company_name", "Company name"], ["logo_url", "Logo URL"], ["favicon_url", "Favicon URL"], ["phone", "Phone"], ["secondary_phone", "Secondary phone"], ["whatsapp", "WhatsApp number (digits, with country code)"], ["email", "Email"], ["office_address", "Office address", true], ["works_address", "Works address", true], ["working_hours", "Working hours"], ["footer_description", "Footer description", true]] },
  { title: "Local SEO", fields: [["google_maps_url", "Google Maps URL"], ["latitude", "Latitude"], ["longitude", "Longitude"]] },
  { title: "Default SEO", fields: [["website_url", "Website URL"], ["default_seo_title", "Default SEO title"], ["default_meta_description", "Default meta description", true], ["default_og_image", "Default OG image URL"], ["organization_logo", "Organization logo URL"]] },
  { title: "Search Console & analytics", fields: [["gsc_verification", "Google Search Console verification code (content value only)"], ["bing_verification", "Bing Webmaster verification code"], ["ga4_id", "Google Analytics Measurement ID (G-XXXX)"], ["gtm_id", "Google Tag Manager ID (GTM-XXXX)"], ["meta_pixel_id", "Meta Pixel ID"]] },
];
function SiteSettings() {
  const [form, setForm] = useState<Partial<Settings>>({});
  const [msg, setMsg] = useState("");
  useEffect(() => { supabase.from("cms_site_settings").select("*").eq("id", "main").maybeSingle().then(({ data }) => { if (data) setForm(data); }); }, []);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    const { id: _id, updated_at: _u, ...rest } = form;
    const clean = Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, k === "latitude" || k === "longitude" ? (v === "" || v == null ? null : Number(v)) : v]));
    const { error } = await supabase.from("cms_site_settings").update(clean as Database["public"]["Tables"]["cms_site_settings"]["Update"]).eq("id", "main"); setMsg(error?.message ?? "Settings saved.");
  }
  return <form onSubmit={save} className="max-w-3xl space-y-6"><h1 className="text-2xl font-bold">Site & SEO Settings</h1>
    {settingGroups.map((g) => <fieldset key={g.title} className="space-y-3 border border-border bg-background p-5"><legend className="px-1 font-bold">{g.title}</legend>{g.fields.map(([k, l, area]) => <label key={k} className="block text-xs font-semibold">{l}{area ? <textarea value={String(form[k] ?? "")} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={`${field} mt-1 min-h-16`} /> : <input value={String(form[k] ?? "")} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={`${field} mt-1`} />}</label>)}</fieldset>)}
    {msg && <p className="text-sm text-muted-foreground">{msg}</p>}<Button type="submit">Save Settings</Button>
  </form>;
}

/* ---------------- Users / roles ---------------- */
function Users() {
  const list = useServerFn(listStaff);
  const grant = useServerFn(grantStaffRole);
  const [rows, setRows] = useState<{ user_id: string; role: string; email: string }[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("content_manager");
  const [msg, setMsg] = useState("");
  const load = () => list().then(setRows).catch((e: unknown) => setMsg(e instanceof Error ? e.message : "Could not load users"));
  useEffect(() => { load(); }, []);
  async function add(e: React.FormEvent) { e.preventDefault(); const r = await grant({ data: { email, role } }); setMsg(r.message); if (r.ok) { setEmail(""); load(); } }
  async function revoke(user_id: string, r: string) { if (!confirm("Remove this access?")) return; const { error } = await supabase.from("user_roles").delete().eq("user_id", user_id).eq("role", r as never); setMsg(error?.message ?? "Access removed."); load(); }
  return <div className="max-w-3xl"><h1 className="text-2xl font-bold">Users & Roles</h1>
    <p className="mt-1 text-sm text-muted-foreground">Super Admin: everything. Content Manager: blogs, products, locations, testimonials and categories. The person must first create an account at /admin.</p>
    <form onSubmit={add} className="mt-5 flex flex-wrap gap-2 border border-border bg-background p-4"><input required type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} max-w-xs`} /><select value={role} onChange={(e) => setRole(e.target.value as Role)} className={`${field} w-48`}><option value="content_manager">Content Manager</option><option value="admin">Super Admin</option></select><Button type="submit">Grant access</Button></form>
    {msg && <p className="mt-2 text-sm text-muted-foreground">{msg}</p>}
    <div className="mt-4 space-y-2">{rows.map((r) => <div key={r.user_id + r.role} className="flex items-center justify-between border border-border bg-background p-3 text-sm"><span>{r.email} · <b>{r.role === "admin" ? "Super Admin" : "Content Manager"}</b></span><Button size="sm" variant="ghost" onClick={() => revoke(r.user_id, r.role)}>Remove</Button></div>)}</div>
  </div>;
}

function Login() {
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")), password = String(f.get("password") ?? "");
    setMsg("");
    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
      setMsg(error ? error.message : "If this account exists, a reset link has been sent to the email.");
      return;
    }
    const { error } = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    if (error) setMsg(mode === "in" ? "Incorrect email or password." : error.message);
    else if (mode === "up") setMsg("Check your email to confirm your account, then sign in.");
  }
  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-sm space-y-4 border border-border bg-background p-6">
      <h1 className="text-xl font-bold">{mode === "in" ? "Admin sign in" : mode === "up" ? "Create account" : "Reset password"}</h1>
      <input name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
      {mode !== "forgot" && <input name="password" type="password" required minLength={8} placeholder="Password" autoComplete={mode === "in" ? "current-password" : "new-password"} className={field} />}
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      <Button type="submit" className="w-full rounded-sm">{mode === "in" ? "Sign in" : mode === "up" ? "Sign up" : "Send reset link"}</Button>
      <div className="flex justify-between text-xs">
        <button type="button" className="underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>{mode === "in" ? "Need an account? Sign up" : "Back to sign in"}</button>
        {mode === "in" && <button type="button" className="underline" onClick={() => setMode("forgot")}>Forgot password?</button>}
      </div>
    </form>
  );
}

function ChangePassword({ email, onClose }: { email: string; onClose: () => void }) {
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const current = String(f.get("cur")), p = String(f.get("p")), c = String(f.get("c"));
    if (p !== c) return setMsg("New passwords do not match.");
    const check = await supabase.auth.signInWithPassword({ email, password: current });
    if (check.error) return setMsg("Current password is incorrect.");
    const { error } = await supabase.auth.updateUser({ password: p, current_password: current } as never);
    setMsg(error ? error.message : "Password changed.");
  }
  return <div className="fixed inset-0 z-50 flex items-start justify-center bg-navy/40 p-4 pt-24" onClick={onClose}>
    <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm space-y-3 bg-background p-6">
      <h2 className="text-lg font-bold">Change password</h2>
      <input name="cur" type="password" required placeholder="Current password" autoComplete="current-password" className={field} />
      <input name="p" type="password" required minLength={8} placeholder="New password (min 8)" autoComplete="new-password" className={field} />
      <input name="c" type="password" required minLength={8} placeholder="Confirm new password" autoComplete="new-password" className={field} />
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      <div className="flex gap-2"><Button type="submit">Update</Button><Button type="button" variant="ghost" onClick={onClose}>Close</Button></div>
    </form>
  </div>;
}

/* ---------------- Enquiries ---------------- */
function Enquiries() {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<Status | "">("");
  const [sel, setSel] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState("");
  const load = () => supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(1000).then(({ data }) => setRows(data ?? []));
  useEffect(() => { load(); }, []);
  useEffect(() => { setNotes(sel?.internal_notes ?? ""); }, [sel?.id]);
  const list = useMemo(() => rows.filter((r) => (!status || r.status === status) && (!q || [r.name, r.company, r.phone, r.email, r.city, r.state, r.product].join(" ").toLowerCase().includes(q.toLowerCase()))), [rows, q, status]);
  async function patch(id: string, p: Partial<Enquiry>) { await supabase.from("enquiries").update(p).eq("id", id); setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...p } : r))); setSel((x) => (x && x.id === id ? { ...x, ...p } : x)); }
  async function del(id: string) { if (!confirm("Delete this enquiry permanently?")) return; await supabase.from("enquiries").delete().eq("id", id); setRows((rs) => rs.filter((r) => r.id !== id)); setSel(null); }
  function exportCsv() {
    const cols: (keyof Enquiry)[] = ["created_at", "status", "source", "name", "company", "phone", "email", "city", "state", "product", "project_type", "quantity", "requirement", "message", "contact_method", "page_url", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...list.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  }
  const counts = STATUSES.map((s) => ({ ...s, n: rows.filter((r) => r.status === s.v).length }));
  return (
    <div>
      <h1 className="text-2xl font-bold">Enquiries</h1>
      <div className="mt-4 grid grid-cols-3 gap-px border border-border bg-border md:grid-cols-6">{counts.map((c) => <div key={c.v} className="bg-background p-3"><p className="text-xs text-muted-foreground">{c.l}</p><p className="text-xl font-bold">{c.n}</p></div>)}</div>
      <div className="mt-6 flex flex-wrap gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, hospital, product…" className={`${field} max-w-sm`} />
        <select value={status} onChange={(e) => setStatus(e.target.value as Status | "")} className={`${field} w-44`}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}</select>
        <Button variant="outline" className="rounded-sm" onClick={exportCsv}>Export CSV</Button>
      </div>
      <div className="mt-4 overflow-x-auto border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground"><tr>{["Date", "Name", "Hospital / Company", "Phone", "Product", "Location", "Source", "Status"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} className="cursor-pointer border-t border-border hover:bg-muted" onClick={() => setSel(r)}>
                <td className="whitespace-nowrap p-3">{new Date(r.created_at).toLocaleDateString("en-IN")}</td><td className="p-3 font-medium">{r.name}</td><td className="p-3">{r.company}</td><td className="p-3">{r.phone}</td>
                <td className="p-3">{r.product}</td><td className="p-3">{[r.city, r.state].filter(Boolean).join(", ")}</td><td className="p-3 text-xs">{r.utm_source ?? "direct"}</td><td className="p-3">{STATUSES.find((s) => s.v === r.status)?.l}</td>
              </tr>
            ))}
            {!list.length && <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No enquiries found.</td></tr>}
          </tbody>
        </table>
      </div>
      {sel && (
        <div className="fixed inset-0 z-50 flex justify-end bg-navy/40" onClick={() => setSel(null)}>
          <div className="h-full w-full max-w-md overflow-y-auto bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="text-lg font-bold">{sel.name}</h2><button onClick={() => setSel(null)} className="text-sm underline">Close</button></div>
            <dl className="mt-4 space-y-2 text-sm">
              {([["Company", sel.company], ["Phone", sel.phone], ["Email", sel.email], ["City", sel.city], ["State", sel.state], ["Product", sel.product], ["Project type", sel.project_type], ["Quantity", sel.quantity], ["Requirement", sel.requirement], ["Message", sel.message], ["Preferred contact", sel.contact_method], ["Form", sel.source], ["Source page", sel.page_url], ["UTM source", sel.utm_source], ["UTM medium", sel.utm_medium], ["UTM campaign", sel.utm_campaign], ["UTM term", sel.utm_term], ["UTM content", sel.utm_content], ["Received", new Date(sel.created_at).toLocaleString("en-IN")]] as const).map(([k, v]) => v ? (
                <div key={k} className="grid grid-cols-3 gap-2 border-b border-border pb-2"><dt className="font-semibold">{k}</dt><dd className="col-span-2 whitespace-pre-wrap break-words text-muted-foreground">{v}</dd></div>
              ) : null)}
            </dl>
            <label className="mt-6 block text-xs font-semibold">Status</label>
            <select value={sel.status} onChange={(e) => patch(sel.id, { status: e.target.value as Status })} className={`${field} mt-1`}>{STATUSES.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}</select>
            <label className="mt-4 block text-xs font-semibold">Internal notes (private)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className={`${field} mt-1 min-h-24`} />
            <Button size="sm" variant="outline" className="mt-2" onClick={() => patch(sel.id, { internal_notes: notes || null })}>Save notes</Button>
            <div className="mt-6 flex gap-3">
              <Button asChild className="rounded-sm"><a href={`tel:${sel.phone}`}>Call</a></Button>
              <Button variant="destructive" className="rounded-sm" onClick={() => del(sel.id)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Tags() {
  const [rows, setRows] = useState<{ id: string; tags: string[] }[]>([]);
  const load = () => supabase.from("cms_blog_posts").select("id,tags").then(({ data }) => setRows(data ?? []));
  useEffect(() => { load(); }, []);
  const counts = useMemo(() => { const m = new Map<string, number>(); rows.forEach((r) => r.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1))); return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0])); }, [rows]);
  const apply = async (from: string, to: string | null) => {
    for (const r of rows.filter((x) => x.tags.includes(from))) {
      const next = Array.from(new Set(r.tags.flatMap((t) => t === from ? (to ? [to] : []) : [t])));
      const { error } = await supabase.from("cms_blog_posts").update({ tags: next }).eq("id", r.id);
      if (error) { alert(error.message); return; }
    }
    load();
  };
  return <div>
    <h1 className="text-2xl font-bold">Tags</h1>
    <p className="mt-1 text-sm text-muted-foreground">Tags are added inside each blog. Rename or remove a tag here to update every blog that uses it. Tag archive pages stay noindex.</p>
    <div className="mt-5 divide-y divide-border border border-border bg-background">{counts.length ? counts.map(([t, n]) => <div key={t} className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm"><span><b>{t}</b> <span className="text-muted-foreground">· {n} blog{n > 1 ? "s" : ""} · /blog/tag/{slugify(t)}</span></span><span className="flex gap-2"><Button size="sm" variant="outline" onClick={() => { const v = prompt("Rename tag", t)?.trim(); if (v && v !== t) apply(t, v); }}>Rename</Button><Button size="sm" variant="ghost" onClick={() => { if (confirm(`Remove "${t}" from ${n} blog(s)?`)) apply(t, null); }}>Remove</Button></span></div>) : <p className="p-4 text-sm text-muted-foreground">No tags yet.</p>}</div>
  </div>;
}

function MediaLibrary() {
  const [url, setUrl] = useState("");
  return <div>
    <h1 className="text-2xl font-bold">Media Library</h1>
    <p className="mt-1 text-sm text-muted-foreground">Upload an image to get a link you can use in blogs, products and settings. Images are also uploadable directly inside each editor.</p>
    <div className="mt-5 max-w-xl border border-border bg-background p-4"><MediaUpload value={url} onChange={setUrl} /></div>
  </div>;
}

function Activity() {
  const [rows, setRows] = useState<Database["public"]["Tables"]["admin_activity"]["Row"][]>([]);
  useEffect(() => { supabase.from("admin_activity").select("*").order("created_at", { ascending: false }).limit(200).then(({ data }) => setRows(data ?? [])); }, []);
  const names: Record<string, string> = { cms_blog_posts: "Blog", cms_products: "Product", cms_locations: "Location", cms_testimonials: "Testimonial" };
  return <div>
    <h1 className="text-2xl font-bold">Activity Log</h1>
    <p className="mt-1 text-sm text-muted-foreground">Last 200 content changes, recorded automatically.</p>
    <div className="mt-5 divide-y divide-border border border-border bg-background text-sm">{rows.length ? rows.map((r) => <div key={r.id} className="flex flex-wrap justify-between gap-2 p-3"><span><b className="capitalize">{r.action}</b> {names[r.entity] ?? r.entity}: {r.label ?? "—"}</span><span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString("en-IN")}</span></div>) : <p className="p-4 text-muted-foreground">No activity yet.</p>}</div>
  </div>;
}
