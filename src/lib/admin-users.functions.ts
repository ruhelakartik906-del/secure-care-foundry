import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: { rpc: (fn: "has_role", args: { _user_id: string; _role: "admin" }) => PromiseLike<{ data: boolean | null }> }, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (!data) throw new Response("Forbidden", { status: 403 });
}

export const listStaff = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id,role");
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const byId = new Map(users.users.map((u) => [u.id, u.email ?? ""]));
    return (roles ?? []).map((r) => ({ user_id: r.user_id, role: r.role as string, email: byId.get(r.user_id) ?? "(unknown)" }));
  });

export const grantStaffRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ email: z.string().email().max(255), role: z.enum(["admin", "content_manager"]) }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const user = users.users.find((u) => u.email?.toLowerCase() === data.email.toLowerCase());
    if (!user) return { ok: false as const, message: "No account with that email. Ask them to sign up at /admin first." };
    const { error } = await supabaseAdmin.from("user_roles").upsert({ user_id: user.id, role: data.role as never }, { onConflict: "user_id,role" });
    return error ? { ok: false as const, message: error.message } : { ok: true as const, message: "Access granted." };
  });

/** One-time bootstrap: the designated owner email becomes Super Admin, only while no admin exists yet. */
const INITIAL_ADMIN_EMAIL = "nitinupgrowbharat@gmail.com";
export const claimInitialAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: u } = await supabaseAdmin.auth.admin.getUserById(context.userId);
    const user = u.user;
    if (!user || user.email?.toLowerCase() !== INITIAL_ADMIN_EMAIL || !user.email_confirmed_at) return { ok: false };
    const { count } = await supabaseAdmin.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin");
    if ((count ?? 0) > 0) return { ok: false };
    const { error } = await supabaseAdmin.from("user_roles").insert({ user_id: user.id, role: "admin" });
    return { ok: !error };
  });
