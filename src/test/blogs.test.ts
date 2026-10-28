import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { blogs, findBlog, type Blog } from "@/data/blogs";
import { staticPaths } from "@/lib/static-pages";
import { blogPath } from "@/lib/routes";

describe("Static company-supplied blogs", () => {
  it("publishes the two requested guides at 1,200+ words with related product links", () => {
    expect(blogs.map((b) => b.slug)).toEqual(["what-is-cssd-hospital-sterilisation-department-guide", "dynamic-vs-static-pass-box"]);
    for (const b of blogs) {
      const words = b.sections.flatMap((s) => [s.heading ?? "", ...s.paragraphs, ...(s.bullets ?? [])]).join(" ").split(/\s+/).filter(Boolean).length;
      expect(words).toBeGreaterThanOrEqual(1200);
    }
    expect(blogs[0]?.relatedProducts).toContain("cssd-systems");
    expect(blogs[1]?.relatedProducts).toContain("pass-box");
  });

  it("includes the Blogs listing in static hosting paths", () => {
    expect(staticPaths()).toContain("/blogs");
  });

  it("resolves a supplied article and does not substitute missing content", () => {
    const supplied: Blog = { slug: "supplied-article", title: "Supplied article", excerpt: "Supplied summary", publishedAt: "2026-10-23", sections: [{ paragraphs: ["Supplied text"] }] };
    expect(findBlog("supplied-article", [supplied])).toBe(supplied);
    expect(findBlog("missing-article", [supplied])).toBeUndefined();
    expect(blogPath(supplied.slug)).toBe("/blogs/supplied-article");
  });

  it("matches the listing and dedicated article routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/blogs").at(-1)?.routeId).toBe("/blogs/");
    expect(router.matchRoutes("/blogs/supplied-article").at(-1)?.routeId).toBe("/blogs/$slug");
  });
});