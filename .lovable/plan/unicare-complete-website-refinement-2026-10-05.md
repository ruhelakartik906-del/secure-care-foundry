# Unicare Complete Website Refinement

## Goal
Refine the existing Unicare website into a stronger B2B lead-generation and SEO platform without replacing the current branding, enquiry database, authentication, or existing public URLs. Modular Operation Theatre remains the primary commercial focus.

## Implementation

### 1. Navigation and conversion actions
- Replace the current three-column Products dropdown with the requested two-level mega menu: all nine main products remain visible in the first panel, while hovering Modular Operation Theatre reveals its six variants in a secondary panel.
- Remove “View All Products” from desktop and mobile product navigation; use an accessible nested accordion on mobile.
- Keep the sticky information bar, real phone number, search, and quote action. Quote actions will open the existing enquiry experience preselected for Modular OT where relevant.
- Update the floating WhatsApp action to `+91-7678443838` with the supplied professional prefilled message; keep the call action on `+91-7736077740`.

### 2. Homepage redesign and order
- Rebuild the hero into a strong two-column Modular OT presentation with the supplied headline/copy, Request a Quote and Call Now actions, real OT imagery, and compact trust points.
- Keep all nine product cards in priority order, with stronger treatment for Modular OT and quote-only pricing language.
- Consolidate the Modular OT feature and variants into one high-conversion section with images, concise descriptions, Enquire Now actions, and “Discuss Your Modular OT Project.”
- Redesign Why Choose Unicare into five compact professional icon blocks and keep the healthcare facilities section as polished icon-led cards.
- Reorder the page exactly as requested: hero, trust points, products, Modular OT solutions, Why Choose Unicare, healthcare facilities, enquiry, testimonials, latest blogs, final CTA.
- Keep the old projects gallery removed. Testimonials will render only published records; no fabricated names or quotes will appear.

### 3. Enquiry, Contact, About, and Footer
- Update the homepage lead form to the requested fields and labels, add Project Type, use the exact product choices, and retain saving into the existing enquiry system.
- Rework Contact Us into left-side form and right-side contact details/map/actions; add Mon–Sat, 9:30 AM–6:30 PM and Get Directions.
- Expand About Us into the requested factual sections without unsupported claims.
- Reorder the footer to Brand, Products, Service Locations, Contact; include all nine products and ten selected locality links, remove “View All Products,” retain “View All Locations,” add working hours, and preserve legal links.

### 4. Product architecture
- Keep all nine existing main product URLs and enrich each detail page with its current overview, features, applications, specifications, benefits, installation, FAQ, related content, enquiry, call, and WhatsApp actions.
- Remove service-location blocks from individual product pages.
- Add six dedicated nested Modular OT variant pages under `/products/modular-operation-theatre/.../`, backed by the existing Modular OT option data and linked from the mega menu, homepage, parent product page, search, and sitemap.
- Preserve existing parent-page hash links where useful so previously shared links do not break.

### 5. CMS and admin
- Extend the current secure admin area rather than creating a duplicate system.
- Add database-backed management for products/sub-products, blogs, testimonials, location pages, and site settings with create, edit, delete, publish/unpublish controls and the requested SEO fields.
- Keep roles in the existing protected role system and preserve existing enquiry access rules.
- Migrate current product, blog, location, and site content into initial database records so the public website remains populated; public pages will read published CMS records with safe fallback during migration.
- Add image upload support for CMS content using website storage.
- Expand enquiry statuses to the requested set while safely retaining existing records and admin filtering.

### 6. Blog, local SEO, search, and technical SEO
- Make homepage/blog pages read the latest published CMS posts and add complete article pages with SEO fields, author/date/category, related links, and Article/Breadcrumb metadata.
- Expand location records to support state, city, product, localized content, FAQs, image, metadata, and publish state. Preserve current location URLs and add permanent aliases for the requested plural `...manufacturers-in-...` format instead of breaking indexed links.
- Ensure location pages contain genuinely editable localized sections, related products/locations, contact details, FAQs, and enquiry actions; no generated duplicate doorway text.
- Expand site search to categorize main products, Modular OT variants, published blogs, and published location pages.
- Add unique route metadata (title, description, Open Graph text/type, Twitter card, self-canonical), appropriate Product/Article/Breadcrumb/Organization schemas, image alt text, and internal linking.
- Keep crawler access in `robots.txt`; generate a public XML sitemap route from published content without hardcoding a placeholder domain.

### 7. Validation
- Verify desktop, tablet, and mobile layouts for overflow, menu hover/keyboard behavior, mobile accordions, forms, floating actions, and footer readability.
- Test enquiry submission, CMS publish/unpublish behavior, product variants, blogs, search, location pages, admin authorization, and preserved URLs.
- Confirm there are no fabricated testimonials, prices, company claims, obsolete contact details, product-page location blocks, projects gallery, Quick Links, or “View All Products” menu/footer links.
- Check the latest preview build, browser console, runtime errors, route metadata, and all major public/admin routes before completion.

## Notes
- Existing generated product imagery remains until genuine project/product photography is supplied.
- Existing URLs remain live; new nested Modular OT URLs and plural locality aliases are additive.
- The website will continue to show quote-based pricing only.
