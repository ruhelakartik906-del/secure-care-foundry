const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"] as const;
type Key = (typeof KEYS)[number] | "landing_page" | "referrer" | "fbp" | "fbc";
type Utm = Partial<Record<Key, string | null>>;
const STORE = "unicare_utm";

const cookie = (n: string) => document.cookie.split("; ").find((c) => c.startsWith(n + "="))?.split("=")[1] ?? null;

/** Call once per page load: remembers the campaign / ad click that brought the visitor in. */
export function captureUtm() {
  if (typeof window === "undefined") return;
  let v: Utm = {};
  try { v = JSON.parse(sessionStorage.getItem(STORE) ?? "{}") as Utm; } catch { /* ignore */ }
  const q = new URLSearchParams(window.location.search);
  if (!v.landing_page) { v.landing_page = window.location.pathname.slice(0, 300); v.referrer = document.referrer ? document.referrer.slice(0, 300) : null; }
  if (KEYS.some((k) => q.get(k))) KEYS.forEach((k) => { const x = q.get(k); v[k] = x ? x.slice(0, 300) : null; });
  const fbclid = v.fbclid;
  if (fbclid && !v.fbc) v.fbc = `fb.1.${Date.now()}.${fbclid}`;
  try { sessionStorage.setItem(STORE, JSON.stringify(v)); } catch { /* storage blocked */ }
}

export function utmParams(): Utm {
  if (typeof window === "undefined") return {};
  captureUtm();
  let v: Utm = {};
  try { v = JSON.parse(sessionStorage.getItem(STORE) ?? "{}") as Utm; } catch { /* ignore */ }
  return { ...v, fbp: cookie("_fbp"), fbc: cookie("_fbc") ?? v.fbc ?? null };
}
