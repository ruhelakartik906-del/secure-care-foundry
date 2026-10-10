<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- Location pages use one route file per product (`<product>-manufacturer.$state.tsx`) sharing `LocationPage`, because TanStack paths can't put a parameter inside a segment.
- Site-wide layout classes (`site-wrap`, `eyebrow`) are plain CSS in `src/styles.css`, because `@utility` versions did not generate.
- Modular Operation Theatre child options live in the product helper, have dedicated detailed routes, and retain parent-page anchors for old links.
- Uploaded product photos use Lovable Asset pointers in the shared product helper so catalogue cards and detail pages retain one photo assignment without duplicating binaries.
- The public `/locations` directory is the only full locality index; product browsing remains separate and footer locality links stay intentionally limited.
- Canonical URLs are absolute on the production origin from `src/lib/site-url.ts` (no trailing slash), so previews never leak into canonicals or the sitemap.
- Header menu groups live in `src/components/site/nav-data.ts` (shared by desktop and mobile); catalogue products not listed there are appended automatically.
- Public URLs are built from helpers in `src/lib/routes.ts` (and `cityPath`), so header, footer, homepage, related links and the sitemap never diverge for the same page.

- The public site is fully static: all content lives in `src/data/*.ts` and the site never queries the backend, so it runs on Hostinger static hosting.
- Every public page is prerendered from `prerender-pages.json`; run `bun scripts/gen-static.ts` after adding pages to refresh it plus `public/sitemap.xml` and `public/robots.txt`, because the static host cannot generate them.
- Enquiry forms post only to FormSubmit (AJAX) and show success only when it confirms, because there is no backend to store leads.
- Hostinger URL rules (HTTPS, apex host, clean URLs, 404, old blog/admin 301s) live in `public/.htaccess`; `src/server.ts` mirrors them for Lovable hosting.
- Blogs are intentionally not part of this site (planned on a separate subdomain).
