import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { field } from "@/components/admin/shared";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({ meta: [{ title: "Reset Password | Unicare Medical Solutions" }, { name: "description", content: "Set a new password for your Unicare Medical Solutions admin account." }, { property: "og:title", content: "Reset Password | Unicare Medical Solutions" }, { property: "og:description", content: "Set a new admin password." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: Reset,
});

function Reset() {
  const nav = useNavigate();
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setOk(true);
    const { data } = supabase.auth.onAuthStateChange((e) => { if (e === "PASSWORD_RECOVERY") setOk(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const p = String(f.get("p")), c = String(f.get("c"));
    if (p !== c) return setMsg("Passwords do not match.");
    const { error } = await supabase.auth.updateUser({ password: p });
    if (error) return setMsg(error.message);
    setMsg("Password updated. Redirecting…");
    setTimeout(() => nav({ to: "/admin" }), 1200);
  }
  return <div className="site-wrap py-16"><form onSubmit={submit} className="mx-auto max-w-sm space-y-4 border border-border bg-background p-6">
    <h1 className="text-xl font-bold">Set a new password</h1>
    {!ok ? <p className="text-sm text-muted-foreground">Open this page from the reset link in your email.</p> : <>
      <input name="p" type="password" required minLength={8} placeholder="New password" className={field} autoComplete="new-password" />
      <input name="c" type="password" required minLength={8} placeholder="Confirm new password" className={field} autoComplete="new-password" />
      <Button type="submit" className="w-full rounded-sm">Update password</Button></>}
    {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
  </form></div>;
}
