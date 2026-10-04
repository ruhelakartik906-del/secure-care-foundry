import { createFileRoute } from "@tanstack/react-router";
import { getLocation } from "@/data/locations";
import { LocationPage } from "@/components/site/LocationPage";
import { makeLocationHead, makeLocationLoader } from "@/lib/location-route";

export const Route = createFileRoute("/modular-operation-theatre-manufacturer/$state")({
  loader: makeLocationLoader(),
  head: makeLocationHead("modular-operation-theatre", "modular-operation-theatre-manufacturer"),
  component: Page,
});

function Page() {
  const { state } = Route.useLoaderData();
  return <LocationPage productSlug="modular-operation-theatre" location={getLocation(state)!} />;
}
