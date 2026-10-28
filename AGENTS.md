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
- Product photo assignments live in the shared product helper using same-origin public files so cards and detail pages retain one assignment on static hosting.
- The public `/locations` directory is the only full locality index; product browsing remains separate and footer locality links stay intentionally limited.
- Canonical URLs use the fixed company-confirmed production origin from `src/lib/site-url.ts`, so preview/environment overrides cannot leak into metadata or the sitemap; retain existing path/slash conventions.
- Header menu groups live in `src/components/site/nav-data.ts` (shared by desktop and mobile); catalogue products not listed there are appended automatically.
- Public URLs are built from helpers in `src/lib/routes.ts` (and `cityPath`), so header, footer, homepage, related links and the sitemap never diverge for the same page.

- The public site is fully static: all content lives in `src/data/*.ts` and the site never queries the backend, so it runs on Hostinger static hosting.
- Every public page is prerendered from `prerender-pages.json`; run `bun scripts/gen-static.ts` after adding pages to refresh it plus `public/sitemap.xml` and `public/robots.txt`, because the static host cannot generate them.
- Enquiry forms post only to FormSubmit (AJAX) and show success only when it confirms, because there is no backend to store leads.
- Hostinger URL rules (HTTPS, canonical host, clean URLs, 404, old blog/admin 301s) live in `public/.htaccess`; `src/server.ts` mirrors them for Lovable hosting.
- `scripts/gen-static.ts` derives static public paths from route files into `public-route-paths.ts`; dynamic data paths remain in `staticPaths`, and shared `sitemap.ts` applies exclusions and only authoritative page-change dates so static and server sitemaps agree.
- Blog articles live in the static data module and render through `/blogs` and `/blogs/$slug`; static path generation includes every article, so publishing company-supplied content needs no backend or admin.
- Mobile navigation uses a portalled Radix modal with its registered Trigger and Close controls; Radix alone owns scroll locking and focus restoration, preventing conflicting body locks and lost focus across repeated openings.
- Website image paths use same-origin WebP files in `public/images`; `ResponsiveImage` selects local optimized widths, so third-party static hosting needs no Lovable asset service.
- Image dimensions are recorded in `src/lib/image-dimensions.json` and responsive sources include a mobile variant; update both when changing public photos to prevent layout shift and missing files.
- Fonts are same-origin WOFF2 variable fonts with swap and a single critical heading-font preload, preserving typography without external font requests.
- Enquiry validation/submission lives in a dynamically imported form module; FAQ uses native details/summary with no accordion script to defer, preserving server-rendered content and no-JavaScript FAQ operation.
- TanStack automatic route splitting stays enabled; never export route component functions, and keep page-specific UI dependencies out of shared head/helper modules so route chunks stay independent.
- Retired public pages have matching permanent redirects in Apache, Vercel and the SSR entry, plus client loader handling and sitemap exclusions, so every deployment host preserves old links.
- The retired published Lovable hostname redirects in the server entry before any route, asset or sitemap handling; exact-host matching preserves previews and same-path/query redirects.
- Social metadata uses `social-images.ts` to select same-domain crops in `public/og`; schema rules and variant FAQs share `structured-data.ts` so page markup and visible content stay synchronized.
- Requested per-page title, description and H1 overrides live in `src/data/page-seo.ts`, consumed by `seo` and `PageHero`; exact-path lookup preserves metadata and headings on unlisted pages and avoids changing product names in cards/forms.
- Non-production indexing is blocked in completed SSR responses and Apache response headers; an early-head observer preserves noindex across static copies and client navigation, while production prerendered HTML retains its route-specific indexing directives.
- `scripts/post-build.mjs` copies `.vercel/output/static` into `dist/client` (and fails if no `index.html`), because on Vercel the build auto-switches to Vercel's output format and every host must serve the same `dist/client` folder.
- Company-supplied verbatim sections live in src/data/content-blocks.ts (ContentBlock type) rendered by src/components/site/ContentBlocks.tsx, reused across product, system and variant pages; keep text byte-exact.
