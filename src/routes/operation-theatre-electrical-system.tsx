import { createFileRoute } from "@tanstack/react-router";
import { getSystemPage } from "@/data/systems";
import { SystemPageView, systemHead } from "@/components/site/SystemPageView";

const page = getSystemPage("/operation-theatre-electrical-system");

export const Route = createFileRoute("/operation-theatre-electrical-system")({
  head: () => systemHead(page),
  component: () => <SystemPageView page={page} />,
});
