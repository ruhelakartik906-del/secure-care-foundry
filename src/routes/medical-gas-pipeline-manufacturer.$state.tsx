import { createFileRoute } from "@tanstack/react-router";
import { getLocation } from "@/data/locations";
import { LocationPage } from "@/components/site/LocationPage";
import { makeLocationHead, makeLocationLoader } from "@/lib/location-route";

export const Route = createFileRoute("/medical-gas-pipeline-manufacturer/$state")({
  loader: makeLocationLoader(),
  head: makeLocationHead("medical-gas-pipeline-system", "medical-gas-pipeline-manufacturer"),
  component: Page,
});

function Page() {
  const { state } = Route.useLoaderData();
  return <LocationPage productSlug="medical-gas-pipeline-system" location={getLocation(state)!} />;
}
