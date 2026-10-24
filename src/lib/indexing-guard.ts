export const INDEXABLE_HOST = "www.unicaremedicalsolutions.com";

export const canIndexHost = (hostname: string) => hostname.toLowerCase() === INDEXABLE_HOST;

/** Applied to completed SSR HTML, never to the production prerender artifact. */
export function guardIndexingHtml(html: string, hostname: string) {
  if (canIndexHost(hostname)) return html;
  const robots = '<meta name="robots" content="noindex, nofollow">';
  let found = false;
  const guarded = html.replace(/<meta\b[^>]*>/gi, (tag) => {
    if (!/\bname\s*=\s*["']robots["']/i.test(tag)) return tag;
    found = true;
    return robots;
  });
  return found ? guarded : guarded.replace(/<head\b[^>]*>/i, (tag) => tag + robots);
}

// Static copies and client navigation cannot override the non-production restriction.
export const indexingFallback = `(function(){if(location.hostname.toLowerCase()==='${INDEXABLE_HOST}')return;function protect(){var tags=document.head.querySelectorAll('meta[name="robots"]');if(!tags.length){var m=document.createElement('meta');m.name='robots';m.content='noindex, nofollow';document.head.appendChild(m);}else tags.forEach(function(m){if(m.content!=='noindex, nofollow')m.content='noindex, nofollow';});}protect();new MutationObserver(protect).observe(document.head,{childList:true,subtree:true,attributes:true,attributeFilter:['content']});})();`;