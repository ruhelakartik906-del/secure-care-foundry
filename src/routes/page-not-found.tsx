import { createFileRoute } from "@tanstack/react-router";
import { NotFoundComponent } from "./__root";

// Prerendered once and served by Hostinger as the 404 page (404.html).
export const Route = createFileRoute("/page-not-found")({
  head: () => ({ meta: [{ title: "Page Not Found | Unicare Medical Solutions" }, { name: "description", content: "The page you are looking for may have been moved or no longer exists." }, { name: "robots", content: "noindex" }] }),
  component: NotFoundComponent,
});
