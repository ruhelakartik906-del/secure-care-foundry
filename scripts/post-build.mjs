import { existsSync, renameSync, rmSync } from "node:fs";
// The prerendered "/404" page becomes Apache's ErrorDocument.
const dir = "dist/client/page-not-found";
if (existsSync(`${dir}/index.html`)) { renameSync(`${dir}/index.html`, "dist/client/404.html"); rmSync(dir, { recursive: true }); }
console.log("Static site ready in dist/client");
