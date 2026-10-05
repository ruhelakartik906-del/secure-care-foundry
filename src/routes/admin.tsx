import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";

type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
type Status = Database["public"]["Enums"]["enquiry_status"];
type CmsTable = "cms_products" | "cms_blog_posts" | "cms_testimonials" | "cms_locations";
const STATUSES: { v: Status; l: string }[] = [
  { v: "new", l: "New" }, { v: "contacted", l: "Contacted" }, { v: "qualified", l: "Qualified" },
  { v: "proposal_sent", l: "Proposal Sent" }, { v: "converted", l: "Converted" }, { v: "closed", l: "Closed" },
];

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin | Unicare" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: Admin,
});

const field = "w-full border border-input bg-background px-3 py-2 text-sm";

function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  if (!ready) return null;
  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-navy text-navy-foreground">
        <div className="site-wrap flex h-14 items-center justify-between">
          <Link to="/" className="font-display font-bold">Unicare Admin</Link>
          {session && <button className="text-sm underline" onClick={() => supabase.auth.signOut()}>Sign out</button>}
        </div>
      </header>
      <div className="site-wrap py-8">
        {!session ? <Login /> : isAdmin === false ? (
          <div className="max-w-lg border border-border bg-background p-6 text-sm">
            <p className="font-semibold">Your account does not have admin access yet.</p>
            <p className="mt-2 text-muted-foreground">Signed in as {session.user.email}. Ask the site owner to grant admin access to this account.</p>
          </div>
        ) : isAdmin ? <AdminDashboard /> : null}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [tab, setTab] = useState<"enquiries" | CmsTable | "cms_site_settings">("enquiries");
  const tabs: { key: typeof tab; label: string }[] = [{ key: "enquiries", label: "Enquiries" }, { key: "cms_products", label: "Products" }, { key: "cms_blog_posts", label: "Blogs" }, { key: "cms_testimonials", label: "Testimonials" }, { key: "cms_locations", label: "Locations" }, { key: "cms_site_settings", label: "Site Settings" }];
  return <div><nav className="mb-7 flex gap-2 overflow-x-auto border-b border-border" aria-label="Admin sections">{tabs.map((item) => <Button key={item.key} variant={tab === item.key ? "default" : "ghost"} className="rounded-none" onClick={() => setTab(item.key)}>{item.label}</Button>)}</nav>{tab === "enquiries" ? <Enquiries /> : tab === "cms_site_settings" ? <SiteSettings /> : <CmsManager table={tab} />}</div>;
}

const cmsConfig: Record<CmsTable, { title: string; fields: { key: string; label: string; required?: boolean; area?: boolean; type?: string }[]; empty: Record<string, string | boolean | number> }> = {
  cms_products: { title: "Products & Sub-products", fields: [{ key: "name", label: "Name", required: true }, { key: "short_name", label: "Short name", required: true }, { key: "slug", label: "Slug", required: true }, { key: "category", label: "Category", required: true }, { key: "parent_slug", label: "Parent slug" }, { key: "short_description", label: "Short description", area: true }, { key: "introduction", label: "Introduction", area: true }, { key: "image_url", label: "Image URL" }, { key: "seo_title", label: "SEO title" }, { key: "meta_description", label: "Meta description", area: true }, { key: "focus_keyword", label: "Focus keyword" }, { key: "sort_order", label: "Sort order", type: "number" }], empty: { name: "", short_name: "", slug: "", category: "", parent_slug: "", short_description: "", introduction: "", image_url: "", seo_title: "", meta_description: "", focus_keyword: "", sort_order: 0, published: false } },
  cms_blog_posts: { title: "Blog Posts", fields: [{ key: "title", label: "Title", required: true }, { key: "slug", label: "Slug", required: true }, { key: "category", label: "Category" }, { key: "author", label: "Author" }, { key: "excerpt", label: "Excerpt", area: true }, { key: "content_text", label: "Article content", area: true }, { key: "featured_image_url", label: "Featured image URL" }, { key: "meta_title", label: "Meta title" }, { key: "meta_description", label: "Meta description", area: true }, { key: "focus_keywords_text", label: "Focus keywords (comma separated)" }, { key: "published_at", label: "Publish date", type: "datetime-local" }], empty: { title: "", slug: "", category: "Modular OT", author: "Unicare Medical Solutions", excerpt: "", content_text: "", featured_image_url: "", meta_title: "", meta_description: "", focus_keywords_text: "", published_at: "", published: false } },
  cms_testimonials: { title: "Client Testimonials", fields: [{ key: "client_name", label: "Client name", required: true }, { key: "designation", label: "Designation" }, { key: "company", label: "Hospital / Company" }, { key: "city", label: "City" }, { key: "testimonial", label: "Testimonial", required: true, area: true }, { key: "photo_url", label: "Photo URL" }, { key: "rating", label: "Rating", type: "number" }, { key: "sort_order", label: "Sort order", type: "number" }], empty: { client_name: "", designation: "", company: "", city: "", testimonial: "", photo_url: "", rating: 5, sort_order: 0, published: false } },
  cms_locations: { title: "Location Pages", fields: [{ key: "title", label: "Page title", required: true }, { key: "slug", label: "Slug", required: true }, { key: "product_slug", label: "Product slug", required: true }, { key: "state", label: "State", required: true }, { key: "city", label: "City" }, { key: "introduction", label: "Introduction", area: true }, { key: "content_text", label: "Localized content", area: true }, { key: "image_url", label: "Image URL" }, { key: "seo_title", label: "SEO title" }, { key: "meta_description", label: "Meta description", area: true }], empty: { title: "", slug: "", product_slug: "modular-operation-theatre", state: "", city: "", introduction: "", content_text: "", image_url: "", seo_title: "", meta_description: "", published: false } },
};

function CmsManager({ table }: { table: CmsTable }) {
  const config = cmsConfig[table];
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState<Record<string, string | boolean | number>>({ ...config.empty });
  const [msg, setMsg] = useState("");
  const load = async () => { const { data } = await supabase.from(table).select("*").order("updated_at", { ascending: false }); setRows((data ?? []) as Record<string, unknown>[]); };
  useEffect(() => { setForm({ ...config.empty }); load(); }, [table]);
  function edit(row: Record<string, unknown>) {
    const next = { ...config.empty };
    for (const item of config.fields) next[item.key] = typeof row[item.key] === "number" ? Number(row[item.key]) : String(row[item.key] ?? "");
    if (table === "cms_blog_posts") { next["content_text"] = Array.isArray(row["content"]) ? row["content"].map((x) => typeof x === "object" && x && "text" in x ? String(x.text) : "").join("\n\n") : ""; next["focus_keywords_text"] = Array.isArray(row["focus_keywords"]) ? row["focus_keywords"].join(", ") : ""; }
    if (table === "cms_locations") next["content_text"] = Array.isArray(row["content"]) ? row["content"].map(String).join("\n\n") : "";
    next["published"] = Boolean(row["published"]); if (typeof row["id"] === "string") next["id"] = row["id"]; setForm(next); window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function save(e: React.FormEvent) {
    e.preventDefault(); setMsg("Saving…");
    const payload: Record<string, unknown> = { ...form };
    delete payload["content_text"]; delete payload["focus_keywords_text"];
    if (table === "cms_blog_posts") { payload["content"] = String(form["content_text"] ?? "").split(/\n\s*\n/).filter(Boolean).map((text) => ({ heading: "", text })); payload["focus_keywords"] = String(form["focus_keywords_text"] ?? "").split(",").map((x) => x.trim()).filter(Boolean); payload["published_at"] = form["published_at"] || null; }
    if (table === "cms_locations") payload["content"] = String(form["content_text"] ?? "").split(/\n\s*\n/).filter(Boolean);
    const { error } = table === "cms_products" ? await supabase.from(table).upsert(payload as Database["public"]["Tables"]["cms_products"]["Insert"]) : table === "cms_blog_posts" ? await supabase.from(table).upsert(payload as Database["public"]["Tables"]["cms_blog_posts"]["Insert"]) : table === "cms_testimonials" ? await supabase.from(table).upsert(payload as Database["public"]["Tables"]["cms_testimonials"]["Insert"]) : await supabase.from(table).upsert(payload as Database["public"]["Tables"]["cms_locations"]["Insert"]);
    setMsg(error?.message ?? "Saved."); if (!error) { setForm({ ...config.empty }); load(); }
  }
  async function remove(id: string) { if (!confirm("Delete this item permanently?")) return; if (table === "cms_products") await supabase.from(table).delete().eq("id", id); else if (table === "cms_blog_posts") await supabase.from(table).delete().eq("id", id); else if (table === "cms_testimonials") await supabase.from(table).delete().eq("id", id); else await supabase.from(table).delete().eq("id", id); load(); }
  return <div><h1 className="text-2xl font-bold">{config.title}</h1><div className="mt-6 grid gap-8 lg:grid-cols-5"><form onSubmit={save} className="space-y-4 border border-border bg-background p-5 lg:col-span-2">{config.fields.map((item) => <label key={item.key} className="block text-xs font-semibold">{item.label}{item.area ? <textarea required={item.required} value={String(form[item.key] ?? "")} onChange={(e) => setForm({ ...form, [item.key]: e.target.value })} className={`${field} mt-1 min-h-24`} /> : <input required={item.required} type={item.type ?? "text"} value={String(form[item.key] ?? "")} onChange={(e) => setForm({ ...form, [item.key]: item.type === "number" ? Number(e.target.value) : e.target.value })} className={`${field} mt-1`} />}</label>)}<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form["published"])} onChange={(e) => setForm({ ...form, published: e.target.checked })} />Published</label>{msg && <p className="text-sm text-muted-foreground">{msg}</p>}<div className="flex gap-2"><Button type="submit">Save</Button><Button type="button" variant="outline" onClick={() => setForm({ ...config.empty })}>Clear</Button></div></form><div className="space-y-3 lg:col-span-3">{rows.map((row) => <article key={String(row["id"])} className="flex items-start justify-between gap-4 border border-border bg-background p-4"><div><h2 className="font-bold">{String(row["title"] ?? row["name"] ?? row["client_name"] ?? row["state"] ?? "Untitled")}</h2><p className="mt-1 text-xs text-muted-foreground">{row["published"] ? "Published" : "Draft"} · {String(row["slug"] ?? row["company"] ?? "")}</p></div><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => edit(row)}>Edit</Button><Button size="sm" variant="destructive" onClick={() => remove(String(row["id"]))}>Delete</Button></div></article>)}{!rows.length && <p className="text-sm text-muted-foreground">No records yet. Add the first item using the form.</p>}</div></div></div>;
}

function SiteSettings() {
  const [form, setForm] = useState({ phone: "", secondary_phone: "", whatsapp: "", email: "", office_address: "", works_address: "", working_hours: "", footer_description: "" });
  const [msg, setMsg] = useState("");
  useEffect(() => { supabase.from("cms_site_settings").select("*").eq("id", "main").maybeSingle().then(({ data }) => { if (data) setForm({ phone: data.phone, secondary_phone: data.secondary_phone, whatsapp: data.whatsapp, email: data.email, office_address: data.office_address, works_address: data.works_address, working_hours: data.working_hours, footer_description: data.footer_description }); }); }, []);
  async function save(e: React.FormEvent) { e.preventDefault(); const { error } = await supabase.from("cms_site_settings").update(form).eq("id", "main"); setMsg(error?.message ?? "Settings saved."); }
  return <form onSubmit={save} className="max-w-2xl space-y-4 border border-border bg-background p-6"><h1 className="text-2xl font-bold">Site Settings</h1>{Object.entries(form).map(([key, value]) => <label key={key} className="block text-xs font-semibold capitalize">{key.replaceAll("_", " ")}<textarea value={value} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={`${field} mt-1 min-h-10`} /></label>)}{msg && <p className="text-sm text-muted-foreground">{msg}</p>}<Button type="submit">Save Settings</Button></form>;
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")), password = String(f.get("password"));
    setMsg("");
    const { error } = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    if (error) setMsg(error.message);
    else if (mode === "up") setMsg("Check your email to confirm your account, then sign in.");
  }
  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-sm space-y-4 border border-border bg-background p-6">
      <h1 className="text-xl font-bold">{mode === "in" ? "Admin sign in" : "Create admin account"}</h1>
      <input name="email" type="email" required placeholder="Email" className={field} />
      <input name="password" type="password" required minLength={8} placeholder="Password" className={field} />
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      <Button type="submit" className="w-full rounded-sm">{mode === "in" ? "Sign in" : "Sign up"}</Button>
      <button type="button" className="text-xs underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "Need an account? Sign up" : "Have an account? Sign in"}
      </button>
    </form>
  );
}

function Enquiries() {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<Status | "">("");
  const [sel, setSel] = useState<Enquiry | null>(null);

  const load = () => supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(1000).then(({ data }) => setRows(data ?? []));
  useEffect(() => { load(); }, []);

  const list = useMemo(() => rows.filter((r) =>
    (!status || r.status === status) &&
    (!q || [r.name, r.company, r.phone, r.email, r.city, r.state, r.product].join(" ").toLowerCase().includes(q.toLowerCase()))), [rows, q, status]);

  async function setRowStatus(id: string, s: Status) {
    await supabase.from("enquiries").update({ status: s }).eq("id", id);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: s } : r)));
    setSel((x) => (x && x.id === id ? { ...x, status: s } : x));
  }
  async function del(id: string) {
    if (!confirm("Delete this enquiry permanently?")) return;
    await supabase.from("enquiries").delete().eq("id", id);
    setRows((rs) => rs.filter((r) => r.id !== id));
    setSel(null);
  }
  function exportCsv() {
    const cols: (keyof Enquiry)[] = ["created_at", "status", "source", "name", "company", "phone", "email", "city", "state", "product", "quantity", "requirement", "message", "contact_method", "page_url"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...list.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const counts = STATUSES.map((s) => ({ ...s, n: rows.filter((r) => r.status === s.v).length }));
  return (
    <div>
      <h1 className="text-2xl font-bold">Enquiries</h1>
      <div className="mt-4 grid grid-cols-3 gap-px border border-border bg-border md:grid-cols-6">
        {counts.map((c) => <div key={c.v} className="bg-background p-3"><p className="text-xs text-muted-foreground">{c.l}</p><p className="text-xl font-bold">{c.n}</p></div>)}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, hospital, product…" className={`${field} max-w-sm`} />
        <select value={status} onChange={(e) => setStatus(e.target.value as Status | "")} className={`${field} w-44`}>
          <option value="">All statuses</option>{STATUSES.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
        </select>
        <Button variant="outline" className="rounded-sm" onClick={exportCsv}>Export CSV</Button>
      </div>
      <div className="mt-4 overflow-x-auto border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>{["Date", "Name", "Hospital / Company", "Phone", "Product", "Location", "Status"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} className="cursor-pointer border-t border-border hover:bg-muted" onClick={() => setSel(r)}>
                <td className="whitespace-nowrap p-3">{new Date(r.created_at).toLocaleDateString("en-IN")}</td>
                <td className="p-3 font-medium">{r.name}</td><td className="p-3">{r.company}</td><td className="p-3">{r.phone}</td>
                <td className="p-3">{r.product}</td><td className="p-3">{[r.city, r.state].filter(Boolean).join(", ")}</td>
                <td className="p-3">{STATUSES.find((s) => s.v === r.status)?.l}</td>
              </tr>
            ))}
            {!list.length && <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No enquiries found.</td></tr>}
          </tbody>
        </table>
      </div>

      {sel && (
        <div className="fixed inset-0 z-50 flex justify-end bg-navy/40" onClick={() => setSel(null)}>
          <div className="h-full w-full max-w-md overflow-y-auto bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="text-lg font-bold">{sel.name}</h2><button onClick={() => setSel(null)} className="text-sm underline">Close</button></div>
            <dl className="mt-4 space-y-2 text-sm">
              {([["Company", sel.company], ["Phone", sel.phone], ["Email", sel.email], ["City", sel.city], ["State", sel.state], ["Product", sel.product], ["Quantity", sel.quantity], ["Requirement", sel.requirement], ["Message", sel.message], ["Preferred contact", sel.contact_method], ["Form", sel.source], ["Page", sel.page_url], ["Received", new Date(sel.created_at).toLocaleString("en-IN")]] as const).map(([k, v]) => v ? (
                <div key={k} className="grid grid-cols-3 gap-2 border-b border-border pb-2"><dt className="font-semibold">{k}</dt><dd className="col-span-2 whitespace-pre-wrap break-words text-muted-foreground">{v}</dd></div>
              ) : null)}
            </dl>
            <label className="mt-6 block text-xs font-semibold">Status</label>
            <select value={sel.status} onChange={(e) => setRowStatus(sel.id, e.target.value as Status)} className={`${field} mt-1`}>
              {STATUSES.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
            </select>
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
