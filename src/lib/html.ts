/** Defensive clean-up of CMS HTML (authored by staff only). Removes scripts, inline handlers and javascript: URLs. */
export function cleanHtml(html: string) {
  return html
    .replace(/<\s*(script|style|object|embed)[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|object|embed)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"')
    // demote any stray H1 so the title stays the only H1
    .replace(/<(\/?)h1(\s|>)/gi, "<$1h2$2");
}

export const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
