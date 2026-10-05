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
