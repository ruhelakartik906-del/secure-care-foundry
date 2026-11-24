import { createFileRoute } from "@tanstack/react-router";
import { getCity } from "@/data/cities";
import { CityPage, cityHead } from "@/components/site/CityPage";

const c = getCity("mgps-ghaziabad")!;
export const Route = createFileRoute("/medical-gas-pipeline-ghaziabad")({
  head: () => cityHead(c),
  component: Page,
});

function Page() { return <CityPage c={c} />; }
