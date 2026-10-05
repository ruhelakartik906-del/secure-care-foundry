import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { products, modularOtOptions } from "@/data/products";
import { blogs } from "@/data/blogs";
import { locations } from "@/data/locations";
import { SITE_URL } from "@/lib/site-url";
import type { CheckStatus } from "@/lib/seo-score";

export const field = "w-full border border-input bg-background px-3 py-2 text-sm";

export async function uploadMedia(file: File): Promise<string> {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const path = `${new Date().toISOString().slice(0, 7)}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from("website-media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from("website-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (e2) throw e2;
  return data.signedUrl;
}

export function MediaUpload({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [msg, setMsg] = useState("");
  return <span className="mt-2 block"><input type="file" accept="image/*" className="block w-full text-xs" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; setMsg("Uploading…"); try { onUploaded(await uploadMedia(f)); setMsg("Uploaded."); } catch (err) { setMsg(err instanceof Error ? err.message : "Upload failed"); } }} />{msg && <span className="mt-1 block text-xs font-normal text-muted-foreground">{msg}</span>}</span>;
}

export function SerpPreview({ title, path, description }: { title: string; path: string; description: string }) {
  const tc = title.length, dc = description.length;
  const tone = (n: number, max: number, min: number) => n === 0 ? "text-destructive" : n > max ? "text-destructive" : n < min ? "text-amber-600" : "text-emerald-700";
  return <div className="border border-border bg-background p-4">
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Google preview</p>
    <p className="mt-2 truncate text-xs text-muted-foreground">{SITE_URL.replace("https://", "")}{path}</p>
    <p className="truncate text-lg text-[#1a0dab]">{title || "SEO title"}</p>
    <p className="line-clamp-2 text-sm text-muted-foreground">{description || "Meta description will appear here."}</p>
    <p className="mt-2 flex gap-4 text-xs"><span className={tone(tc, 60, 30)}>Title {tc}/60</span><span className={tone(dc, 160, 120)}>Description {dc}/160</span></p>
  </div>;
}

export const statusDot: Record<CheckStatus, string> = { good: "bg-emerald-600", warn: "bg-amber-500", bad: "bg-destructive" };

export type LinkTarget = { label: string; path: string; group: string };
export async function linkTargets(): Promise<LinkTarget[]> {
  const [{ data: b }, { data: l }] = await Promise.all([
    supabase.from("cms_blog_posts").select("title,slug").eq("status", "published"),
    supabase.from("cms_locations").select("title,slug").eq("status", "published"),
  ]);
  const list: LinkTarget[] = [
    { label: "About Us", path: "/about", group: "Pages" }, { label: "Contact Us", path: "/contact", group: "Pages" }, { label: "All products", path: "/products", group: "Pages" },
    ...products.map((p) => ({ label: p.name, path: `/products/${p.slug}`, group: "Products" })),
    ...modularOtOptions.map((p) => ({ label: p.name, path: `/products/modular-operation-theatre/${p.slug}`, group: "Modular OT variants" })),
    ...blogs.map((x) => ({ label: x.title, path: `/blog/${x.slug}`, group: "Blogs" })),
    ...(b ?? []).map((x) => ({ label: x.title, path: `/blog/${x.slug}`, group: "Blogs" })),
    ...locations.map((x) => ({ label: `Modular OT manufacturers in ${x.name}`, path: `/modular-operation-theatre-manufacturers-in/${x.slug}`, group: "Locations" })),
    ...(l ?? []).map((x) => ({ label: x.title, path: `/${x.slug}`, group: "Locations" })),
  ];
  return [...new Map(list.map((x) => [x.path, x])).values()];
}
