import { createFileRoute } from "@tanstack/react-router";
import { getSystemPage } from "@/data/systems";
import { SystemPageView, systemHead } from "@/components/site/SystemPageView";

const page = getSystemPage("/modular-ot-ceiling");

export const Route = createFileRoute("/modular-ot-ceiling")({
  head: () => systemHead(page),
  component: () => <SystemPageView page={page} />,
});
