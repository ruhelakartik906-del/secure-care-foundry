import { useState } from "react";
import { utmParams } from "@/lib/utm";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { modularOtOptions, products } from "@/data/products";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  company: z.string().trim().max(150).optional(),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(20).regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email").max(255)]).optional(),
  city: z.string().trim().max(80).optional(),
  state: z.string().trim().max(80).optional(),
  product: z.string().trim().min(1, "Please select a product or requirement").max(150),
  quantity: z.string().trim().max(50).optional(),
  requirement: z.string().trim().max(300).optional(),
  message: z.string().trim().max(2000).optional(),
  contact_method: z.string().max(30).optional(),
});

const field = "w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-blue focus:ring-1 focus:ring-ring";
const label = "mb-1 block text-xs font-medium text-foreground";

type Props = { source?: string; defaultProduct?: string; variant?: "full" | "lead" | "contact"; submitLabel?: string };

export function EnquiryForm({ source = "enquiry", defaultProduct = "", variant = "full", submitLabel = "Submit Enquiry" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    setServerError("");
    const d = parsed.data;
    const { error } = await supabase.from("enquiries").insert({
      source,
      name: d.name,
      company: d.company || null,
      phone: d.phone,
      email: d.email || null,
      city: d.city || null,
      state: d.state || null,
      product: d.product || null,
      quantity: d.quantity || null,
      requirement: d.requirement || null,
      message: d.message || null,
      contact_method: d.contact_method || null,
      project_type: d.requirement || null,
      ...utmParams(),
      page_url: typeof window !== "undefined" ? window.location.pathname.slice(0, 500) : null,
    });
    if (error) {
      setStatus("idle");
      setServerError("Something went wrong while sending. Please try again or call us directly.");
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="border border-accent/40 bg-accent/5 p-6">
        <p className="font-display text-lg font-semibold text-foreground">Thank you. Our team will contact you shortly.</p>
        <p className="mt-1 text-sm text-muted-foreground">Your enquiry has been received.</p>
      </div>
    );
  }

  const Err = ({ n }: { n: string }) => (errors[n] ? <p className="mt-1 text-xs text-destructive">{errors[n]}</p> : null);

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div><label className={label} htmlFor={`${source}-name`}>Name *</label><input id={`${source}-name`} name="name" className={field} autoComplete="name" /><Err n="name" /></div>
      <div><label className={label} htmlFor={`${source}-company`}>{variant === "contact" ? "Company" : "Hospital / Company"}</label><input id={`${source}-company`} name="company" className={field} autoComplete="organization" /></div>
      <div><label className={label} htmlFor={`${source}-phone`}>Phone *</label><input id={`${source}-phone`} name="phone" type="tel" className={field} autoComplete="tel" /><Err n="phone" /></div>
      <div><label className={label} htmlFor={`${source}-email`}>Email</label><input id={`${source}-email`} name="email" type="email" className={field} autoComplete="email" /><Err n="email" /></div>
      {variant !== "contact" ? (
        <>
          <div className="sm:col-span-2"><label className={label} htmlFor={`${source}-city`}>City / Location</label><input id={`${source}-city`} name="city" className={field} /></div>
        </>
      ) : (
        <div className="sm:col-span-2"><label className={label} htmlFor={`${source}-city`}>Address / City</label><input id={`${source}-city`} name="city" className={field} autoComplete="address-level2" /></div>
      )}
      {variant !== "contact" && (
        <div className="sm:col-span-2">
          <label className={label} htmlFor={`${source}-product`}>Product / Requirement *</label>
          <select id={`${source}-product`} name="product" defaultValue={defaultProduct} className={field}>
            <option value="">Select a product or service</option>
            <optgroup label="Modular Operation Theatre">
              <option value="Modular Operation Theatre">Modular Operation Theatre</option>
              {modularOtOptions.map((option) => <option key={option.slug} value={option.name}>{option.menuName}</option>)}
            </optgroup>
            <optgroup label="Other hospital infrastructure">
              {products.filter((p) => p.slug !== "modular-operation-theatre").map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
              <option value="Complete Hospital Infrastructure">Complete Hospital Infrastructure</option>
              <option value="Complete Hospital Infrastructure">Complete Hospital Infrastructure</option>
            <option value="Other">Other</option>
            </optgroup>
          </select>
        </div>
      )}
      {variant === "contact" && (
        <div className={variant === "contact" ? "sm:col-span-2" : ""}>
          <label className={label} htmlFor={`${source}-product`}>Product / Requirement *</label>
          <select id={`${source}-product`} name="product" defaultValue={defaultProduct} className={field}>
            <option value="">Select a product</option>
            {modularOtOptions.map((option) => <option key={option.slug} value={option.name}>{option.menuName}</option>)}
            {products.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
            <option value="Complete Hospital Infrastructure">Complete Hospital Infrastructure</option>
            <option value="Other">Other</option>
          </select>
        </div>
      )}
      {variant !== "contact" && <div className="sm:col-span-2"><label className={label} htmlFor={`${source}-req`}>Project Type</label><select id={`${source}-req`} name="requirement" className={field}><option value="">Select project type</option><option>New Hospital</option><option>Hospital Expansion</option><option>OT Upgrade</option><option>Replacement / Renovation</option><option>Government / Institutional Project</option><option>Other</option></select></div>}
      <div className="sm:col-span-2"><label className={label} htmlFor={`${source}-msg`}>Message</label><textarea id={`${source}-msg`} name="message" rows={3} className={field} /></div>
      {variant === "full" && (
        <div className="sm:col-span-2">
          <span className={label}>Preferred contact method</span>
          <div className="flex flex-wrap gap-4 text-sm">
            {["Phone", "WhatsApp", "Email"].map((m) => (
              <label key={m} className="flex items-center gap-2"><input type="radio" name="contact_method" value={m} defaultChecked={m === "Phone"} />{m}</label>
            ))}
          </div>
        </div>
      )}
      {serverError && <p className="sm:col-span-2 text-sm text-destructive">{serverError}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "sending"} className="w-full rounded-sm sm:w-auto">
          {status === "sending" ? "Sending…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
