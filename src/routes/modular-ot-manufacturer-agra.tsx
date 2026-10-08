import { createFileRoute } from "@tanstack/react-router";
import { getCity } from "@/data/cities";
import { CityPage, cityHead } from "@/components/site/CityPage";

const c = getCity("agra")!;
export const Route = createFileRoute("/modular-ot-manufacturer-agra")({
  head: () => cityHead(c),
  component: Page,
});

function Page() { return <CityPage c={c} />; }
