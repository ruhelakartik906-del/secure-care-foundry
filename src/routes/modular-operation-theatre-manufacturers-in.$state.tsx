import { createFileRoute, notFound } from "@tanstack/react-router";
import { getLocation } from "@/data/locations";
import { LocationPage, locationFaqs, locationTitle } from "@/components/site/LocationPage";
import { breadcrumbSchema, seo } from "@/lib/seo";
import { faqSchema } from "@/components/site/common";

export const Route = createFileRoute("/modular-operation-theatre-manufacturers-in/$state")({
  loader: ({ params }) => { const location = getLocation(params.state); if (!location) throw notFound(); return { state: location.slug }; },
  head: ({ loaderData }) => {
    const location = loaderData && getLocation(loaderData.state);
    if (!location) return { meta: [{ title: "Location not found" }, { name: "robots", content: "noindex" }] };
    const path = `/modular-operation-theatre-manufacturers-in/${location.slug}`;
    return { ...seo(`${locationTitle("modular-operation-theatre", location)} | Unicare`, `Modular OT design, manufacturing, installation and project quotations for hospitals in ${location.name}.`, path), scripts: [breadcrumbSchema([{ name: "Locations", path: "/locations" }, { name: location.name, path }]), faqSchema(locationFaqs("modular-operation-theatre", location))] };
  },
  component: () => { const { state } = Route.useLoaderData(); const location = getLocation(state); return location ? <LocationPage productSlug="modular-operation-theatre" location={location} /> : null; },
});