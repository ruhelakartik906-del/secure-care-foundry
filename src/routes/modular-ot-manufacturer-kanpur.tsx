import { createFileRoute } from "@tanstack/react-router";
import { getCity } from "@/data/cities";
import { CityPage, cityHead } from "@/components/site/CityPage";

const c = getCity("kanpur")!;
export const Route = createFileRoute("/modular-ot-manufacturer-kanpur")({
  head: () => cityHead(c),
  component: Page,
});

function Page() { return <CityPage c={c} />; }
