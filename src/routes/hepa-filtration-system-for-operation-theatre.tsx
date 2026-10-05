import { createFileRoute } from "@tanstack/react-router";
import { getSystemPage } from "@/data/systems";
import { SystemPageView, systemHead } from "@/components/site/SystemPageView";

const page = getSystemPage("/hepa-filtration-system-for-operation-theatre");

export const Route = createFileRoute("/hepa-filtration-system-for-operation-theatre")({
  head: () => systemHead(page),
  component: () => <SystemPageView page={page} />,
});
