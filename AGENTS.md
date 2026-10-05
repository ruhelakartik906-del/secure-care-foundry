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

- Products, blogs and locations have database-backed CMS tables with `src/data/*.ts` retained as migration-safe public fallbacks.
- Enquiries are inserted straight from the browser into the `enquiries` table (insert-only for the public, admin-only read/update/delete via `has_role`), so no server function is needed for form submission.
- Admin access is granted via rows in `user_roles`, never on profiles, to avoid privilege escalation.
- Location pages use one route file per product (`<product>-manufacturer.$state.tsx`) sharing `LocationPage`, because TanStack paths can't put a parameter inside a segment.
- Site-wide layout classes (`site-wrap`, `eyebrow`) are plain CSS in `src/styles.css`, because `@utility` versions did not generate.
- Modular Operation Theatre child options live in the product helper, have dedicated detailed routes, and retain parent-page anchors for old links.
- The public `/locations` directory is the only full locality index; product browsing remains separate and footer locality links stay intentionally limited.
- Content visibility uses a `status` column (draft/published/archived); a trigger keeps the legacy `published` flag in sync so older queries keep working.
- Staff access uses `is_staff()` (admin or content_manager) for content tables; settings, redirects, enquiries and roles stay admin-only.
- Slug changes on published content create 301 rows in `redirects` via a database trigger; `src/server.ts` applies redirects, robots.txt, sitemap.xml, trailing-slash and www/HTTPS canonicalisation before SSR.
- Canonical URLs are absolute on the production origin from `src/lib/site-url.ts` (no trailing slash), so previews never leak into canonicals or the sitemap.
- Blog bodies are stored as HTML (`content_html`) from the TipTap editor with H1 disabled; the public page cleans it before rendering.
- CMS location pages render at the top level through the `$pageSlug` catch-all route; built-in location pages use the plural `-manufacturers-in/$state` URLs, and singular or flat variants 301 to them.
- The first Super Admin is bootstrapped by `claimInitialAdmin` (designated email, confirmed, only while no admin exists), so no password is ever stored in code.
- Header menu groups live in `src/components/site/nav-data.ts` (shared by desktop and mobile); catalogue products not listed there are appended automatically.
