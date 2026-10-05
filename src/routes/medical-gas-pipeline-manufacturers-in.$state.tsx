import { createFileRoute, notFound } from "@tanstack/react-router";
import { getLocation } from "@/data/locations";
import { LocationPage, locationFaqs, locationTitle } from "@/components/site/LocationPage";
import { breadcrumbSchema, seo } from "@/lib/seo";
import { faqSchema } from "@/components/site/common";

export const Route = createFileRoute("/medical-gas-pipeline-manufacturers-in/$state")({
  loader: ({ params }) => { const location = getLocation(params.state); if (!location) throw notFound(); return { state: location.slug }; },
  head: ({ loaderData }) => {
    const location = loaderData && getLocation(loaderData.state);
    if (!location) return { meta: [{ title: "Location not found" }, { name: "robots", content: "noindex" }] };
    const path = `/medical-gas-pipeline-manufacturers-in/${location.slug}`;
    return { ...seo(`${locationTitle("medical-gas-pipeline-system", location)} | Unicare`, `Medical gas pipeline design, installation and project quotations for hospitals in ${location.name}.`, path), scripts: [breadcrumbSchema([{ name: "Locations", path: "/locations" }, { name: location.name, path }]), faqSchema(locationFaqs("medical-gas-pipeline-system", location))] };
  },
  component: () => { const { state } = Route.useLoaderData(); const location = getLocation(state); return location ? <LocationPage productSlug="medical-gas-pipeline-system" location={location} /> : null; },
});