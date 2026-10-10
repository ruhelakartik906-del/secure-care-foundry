// Canonical production origin: https, apex domain, no trailing slash.
// Override per environment with VITE_SITE_URL.
const fromEnv = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, "");
export const SITE_URL = fromEnv || "https://unicaremedicalsolutions.com";

/** Absolute, query-free, no-trailing-slash URL for a site path. */
export const absUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = ("/" + path.replace(/^\/+/, "")).split(/[?#]/)[0]!.replace(/(.)\/+$/, "$1");
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
};
