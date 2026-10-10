// @lovable.dev/vite-tanstack-config already includes tanstackStart, viteReact, tailwindcss, tsConfigPaths,
// nitro, VITE_* env injection and @ alias — do NOT add them manually.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import pages from "./prerender-pages.json";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Every public page is rendered to static HTML at build time (Hostinger static hosting).
    pages: (pages as string[]).map((path) => ({ path })),
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
