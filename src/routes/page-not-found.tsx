import { createFileRoute } from "@tanstack/react-router";
import { NotFoundComponent } from "./__root";
import { seo } from "@/lib/seo";

// Prerendered once and served by Hostinger as the 404 page (404.html).
export const Route = createFileRoute("/page-not-found")({
  head: () => seo("Page Not Found | Unicare Medical Solutions", "The page you are looking for may have been moved or no longer exists.", "/page-not-found", "website", undefined, { index: false, follow: false }),
  component: NotFoundComponent,
});
