// Company-confirmed canonical production origin; preview/env settings cannot override it.
export const SITE_URL = "https://www.unicaremedicalsolutions.com";

/** Absolute, query-free, no-trailing-slash URL for a site path. */
export const absUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path.replace(/^https?:\/\/(?:www\.)?unicaremedicalsolutions\.com(?=\/|$)/i, SITE_URL);
  const clean = (("/" + path.replace(/^\/+/, "")).split(/[?#]/)[0] ?? "/").replace(/(.)\/+$/, "$1");
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
};
