import { cpSync, existsSync, renameSync, rmSync } from "node:fs";

// On Vercel the build tool auto-switches to Vercel's own output format and writes the
// pages to .vercel/output/static instead of dist/client. Normalise every host to
// dist/client so vercel.json, Hostinger and local builds all use the same folder.
const OUT = "dist/client";
const VERCEL_STATIC = ".vercel/output/static";
if (!existsSync(`${OUT}/index.html`) && existsSync(`${VERCEL_STATIC}/index.html`)) {
  rmSync(OUT, { recursive: true, force: true });
  cpSync(VERCEL_STATIC, OUT, { recursive: true });
  // Remove the auto-generated Vercel bundle so Vercel serves dist/client (vercel.json).
  rmSync(".vercel/output", { recursive: true, force: true });
  console.log(`Copied ${VERCEL_STATIC} -> ${OUT}`);
}

// The prerendered "/page-not-found" page becomes the host's 404 page.
const dir = `${OUT}/page-not-found`;
if (existsSync(`${dir}/index.html`)) {
  renameSync(`${dir}/index.html`, `${OUT}/404.html`);
  rmSync(dir, { recursive: true });
}

if (!existsSync(`${OUT}/index.html`)) {
  console.error(`Build failed: ${OUT}/index.html was not generated.`);
  process.exit(1);
}
console.log(`Static site ready in ${OUT}`);
