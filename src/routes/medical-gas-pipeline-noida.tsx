import { createFileRoute } from "@tanstack/react-router";
import { getCity } from "@/data/cities";
import { CityPage, cityHead } from "@/components/site/CityPage";

const c = getCity("mgps-noida")!;
export const Route = createFileRoute("/medical-gas-pipeline-noida")({
  head: () => cityHead(c),
  component: Page,
});

function Page() { return <CityPage c={c} />; }
