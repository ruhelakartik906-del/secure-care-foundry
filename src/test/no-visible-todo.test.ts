import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : []; });
}

describe("no visible content placeholders", () => {
  it("content data files contain no TODO or [[ ]] strings", () => {
    for (const f of ["about-expansion", "variant-expansion", "planning-expansion", "expansion-faqs", "blogs-nov5", "state-serving"]) {
      const s = readFileSync(`src/data/${f}.ts`, "utf8");
      expect(s, f).not.toMatch(/TODO —|\[\[[a-z]/i);
    }
  });
  it.skipIf(!existsSync("dist/client"))("built HTML has no TODO or [[", () => {
    for (const f of walk("dist/client")) {
      const s = readFileSync(f, "utf8");
      expect(s.includes("TODO"), f).toBe(false);
      expect(s.includes("[["), f).toBe(false);
    }
  });
});
