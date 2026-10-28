import { createFileRoute } from "@tanstack/react-router";
import { getSystemPage } from "@/data/systems";
import { SystemPageView, systemHead } from "@/components/site/SystemPageView";

const page = getSystemPage("/ot-accessories");

export const Route = createFileRoute("/ot-accessories")({
  head: () => systemHead(page),
  component: () => <SystemPageView page={page} />,
});
