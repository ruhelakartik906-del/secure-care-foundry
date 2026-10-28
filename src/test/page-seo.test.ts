import { describe, expect, it } from "vitest";
import { pageSeo } from "@/data/page-seo";
import { seo } from "@/lib/seo";

describe("Task 4 metadata limits", () => {
  it.each(Object.entries(pageSeo).filter(([, copy]) => copy.title))("keeps the requested title under 60 characters for %s", (_path, copy) => {
    expect(copy.title?.length).toBeLessThan(60);
  });
  it.each(Object.entries(pageSeo).filter(([, copy]) => copy.description))("keeps descriptions within 140–155 characters for %s", (_path, copy) => {
    expect(copy.description?.length).toBeGreaterThanOrEqual(140);
    expect(copy.description?.length).toBeLessThanOrEqual(155);
  });
  it("does not apply overrides to unlisted pages", () => {
    const head = seo("Unlisted page title", "An existing description for an unlisted page that is already long enough to remain unchanged and is not affected by the scoped Task 4 update.", "/resources");
    expect(head.meta[0]).toEqual({ title: "Unlisted page title" });
    expect(pageSeo["/resources"]).toBeUndefined();
  });
});

describe("requested H1 copy", () => {
  const requestedH1s: Record<string, string> = {
    "/products/modular-operation-theatre": "Modular Operation Theatre Manufacturer in India",
    "/products/medical-gas-pipeline-system": "Medical Gas Pipeline System (MGPS) Manufacturer in India",
    "/products/laminar-air-flow": "Laminar Air Flow System for Operation Theatres",
    "/products/ot-pendant": "OT Pendant Manufacturer – Surgical & Anaesthesia Pendants",
    "/products/led-surgical-light": "LED OT Light & Surgical Light Manufacturer",
    "/products/modular-icu-nicu": "Modular ICU & NICU Setup – Design and Installation",
    "/products/pass-box": "Pass Box Manufacturer – Dynamic & Static Pass Box",
    "/products/hermetic-ot-door": "Hermetic Sliding OT Door Manufacturer",
    "/products/manifold-room-system": "Oxygen Manifold & Medical Gas Manifold Room System",
    "/products/agss": "AGSS – Anaesthetic Gas Scavenging System Manufacturer",
    "/products/surgical-scrub-sink-station": "Surgical Scrub Sink & Scrub Station Manufacturer",
    "/products/cssd-systems": "CSSD Equipment & Systems for Hospitals",
    "/products/cubicle-curtain-system": "Hospital Cubicle Curtain & Curtain Track System",
    "/products/hospital-furniture": "Hospital Furniture Manufacturer & Supplier",
    "/products/bed-head-panel": "Bed Head Panel Manufacturer for ICU & Wards",
    "/solutions": "Modular OT & Hospital Infrastructure Solutions",
    "/get-a-quote": "Get a Quote for Your Modular OT or MGPS Project",
    "/faqs": "Modular OT & MGPS: Frequently Asked Questions",
  };

  it.each(Object.entries(requestedH1s))("uses the exact requested H1 for %s", (path, h1) => {
    expect(pageSeo[path]?.h1).toBe(h1);
  });
});