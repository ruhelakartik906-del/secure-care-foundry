export const INDEXABLE_HOST = "www.unicaremedicalsolutions.com";

export const canIndexHost = (hostname: string) => hostname.toLowerCase() === INDEXABLE_HOST;

/** Applied to completed SSR HTML, never to the production prerender artifact. */
export function guardIndexingHtml(html: string, hostname: string) {
  if (canIndexHost(hostname)) return html;
  const robots = hostname.toLowerCase() === "secure-care-foundry.lovable.app"
    ? '<meta name="robots" content="noindex, follow">'
    : '<meta name="robots" content="noindex, nofollow">';
  let found = false;
  const guarded = html.replace(/<meta\b[^>]*>/gi, (tag) => {
    if (!/\bname\s*=\s*["']robots["']/i.test(tag)) return tag;
    found = true;
    return robots;
  });
  return found ? guarded : guarded.replace(/<head\b[^>]*>/i, (tag) => tag + robots);
}

// Static copies and client navigation cannot override the non-production restriction.
export const indexingFallback = `(function(){var host=location.hostname.toLowerCase();if(host==='${INDEXABLE_HOST}')return;var retired=host==='secure-care-foundry.lovable.app',directive=retired?'noindex, follow':'noindex, nofollow';function protect(){var tags=document.head.querySelectorAll('meta[name="robots"]');if(!tags.length){var m=document.createElement('meta');m.name='robots';m.content=directive;document.head.appendChild(m);}else tags.forEach(function(m){if(m.content!==directive)m.content=directive;});if(retired){var href='https://${INDEXABLE_HOST}'+location.pathname,c=document.head.querySelector('link[rel="canonical"]');if(!c){c=document.createElement('link');c.rel='canonical';document.head.appendChild(c);}if(c.getAttribute('href')!==href)c.setAttribute('href',href);}}protect();new MutationObserver(protect).observe(document.head,{childList:true,subtree:true,attributes:true,attributeFilter:['content','href']});})();`;