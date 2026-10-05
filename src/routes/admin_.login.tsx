import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/admin_/login")({ ssr: false, beforeLoad: () => { throw redirect({ to: "/admin" }); } });
