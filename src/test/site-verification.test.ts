import { describe, expect, it } from "vitest";
import { site } from "@/data/site";

describe("Google Search Console site verification", () => {
  it("publishes the company-supplied verification token unchanged", () => {
    expect(site.googleSiteVerification).toBe("phTZI0wt5gLwwAWBg73mqyddsDa3JvrNZil8TfcOk-8");
  });

  it("keeps the token in the format Google accepts in a meta tag", () => {
    expect(site.googleSiteVerification).toMatch(/^[A-Za-z0-9_-]{10,100}$/);
  });
});
