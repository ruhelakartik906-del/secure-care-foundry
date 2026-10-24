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