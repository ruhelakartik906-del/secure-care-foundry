const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
type Utm = Partial<Record<(typeof KEYS)[number], string | null>>;
const STORE = "unicare_utm";

/** Call once per page load: remembers the campaign that brought the visitor in. */
export function captureUtm() {
  if (typeof window === "undefined") return;
  const q = new URLSearchParams(window.location.search);
  if (!KEYS.some((k) => q.get(k))) return;
  const v: Utm = {};
  KEYS.forEach((k) => { const x = q.get(k); if (x) v[k] = x.slice(0, 200); });
  try { sessionStorage.setItem(STORE, JSON.stringify(v)); } catch { /* storage blocked */ }
}

export function utmParams(): Utm {
  if (typeof window === "undefined") return {};
  captureUtm();
  try { return JSON.parse(sessionStorage.getItem(STORE) ?? "{}") as Utm; } catch { return {}; }
}
