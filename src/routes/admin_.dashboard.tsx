import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/admin_/dashboard")({ ssr: false, beforeLoad: () => { throw redirect({ to: "/admin" }); } });
