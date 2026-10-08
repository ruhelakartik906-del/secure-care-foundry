import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { site } from "@/data/site";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("keeps the full service location directory on its own route", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/locations");

    expect(matches.at(-1)?.routeId).toBe("/locations");
  });

  it("uses the supplied Unicare contact details", () => {
    expect(site.phone).toBe("+91-7678443838");
    expect(site.secondaryPhone).toBe("+91-7736077740");
    expect(site.email).toBe("unicaremedical2023@gmail.com");
    expect(site.officeAddress).toContain("Ghaziabad – 201001");
    expect(site.worksAddress).toContain("Faridabad – 121004");
    expect(site.whatsapp).toBe("917678443838");
    expect(site.hours).toBe("Mon – Sat, 9:30 AM – 6:30 PM");
  });

  it("matches every dedicated Modular OT variant route", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes("/products/modular-operation-theatre/stainless-steel-modular-ot");
    expect(matches.at(-1)?.routeId).toBe("/products/modular-operation-theatre/$variant");
  });
});
