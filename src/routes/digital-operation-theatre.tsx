import { createFileRoute } from "@tanstack/react-router";
import { getSystemPage } from "@/data/systems";
import { SystemPageView, systemHead } from "@/components/site/SystemPageView";

const page = getSystemPage("/digital-operation-theatre");

export const Route = createFileRoute("/digital-operation-theatre")({
  head: () => systemHead(page),
  component: () => <SystemPageView page={page} />,
});
