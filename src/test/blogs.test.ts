import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { blogs, findBlog, type Blog } from "@/data/blogs";
import { staticPaths } from "@/lib/static-pages";
import { blogPath } from "@/lib/routes";

describe("Static company-supplied blogs", () => {
  it("does not publish invented articles before the user sends content", () => {
    expect(blogs).toEqual([]);
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