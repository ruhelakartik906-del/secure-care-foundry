import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";

type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
type Status = Database["public"]["Enums"]["enquiry_status"];
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
        <div className="container-x flex h-14 items-center justify-between">
          <Link to="/" className="font-display font-bold">Unicare Admin</Link>
          {session && <button className="text-sm underline" onClick={() => supabase.auth.signOut()}>Sign out</button>}
        </div>
      </header>
      <div className="container-x py-8">
        {!session ? <Login /> : isAdmin === false ? (
          <div className="max-w-lg border border-border bg-background p-6 text-sm">
            <p className="font-semibold">Your account does not have admin access yet.</p>
            <p className="mt-2 text-muted-foreground">Signed in as {session.user.email}. Ask the site owner to grant admin access to this account.</p>
          </div>
        ) : isAdmin ? <Enquiries /> : null}
      </div>
    </div>
  );
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
