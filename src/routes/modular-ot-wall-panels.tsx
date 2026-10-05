import { createFileRoute } from "@tanstack/react-router";
import { getSystemPage } from "@/data/systems";
import { SystemPageView, systemHead } from "@/components/site/SystemPageView";

const page = getSystemPage("/modular-ot-wall-panels");

export const Route = createFileRoute("/modular-ot-wall-panels")({
  head: () => systemHead(page),
  component: () => <SystemPageView page={page} />,
});
