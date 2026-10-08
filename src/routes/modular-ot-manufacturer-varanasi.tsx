import { createFileRoute } from "@tanstack/react-router";
import { getCity } from "@/data/cities";
import { CityPage, cityHead } from "@/components/site/CityPage";

const c = getCity("varanasi")!;
export const Route = createFileRoute("/modular-ot-manufacturer-varanasi")({
  head: () => cityHead(c),
  component: Page,
});

function Page() { return <CityPage c={c} />; }
