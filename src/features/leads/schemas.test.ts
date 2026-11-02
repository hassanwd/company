import { describe, expect, it } from "vitest";
import { INDUSTRIES, leadInputSchema } from "./schemas";

const minimal = {
  name: "Ada Lovelace",
  email: "ADA@Example.com",
  company: "Analytical Engines Ltd",
  role: "",
  industry: "",
  companySize: "",
  message: "",
  website: "",
} as const;

describe("leadInputSchema", () => {
  it("accepts a request with only name, email and company", () => {
    const result = leadInputSchema.safeParse(minimal);
    expect(result.success).toBe(true);
    // Email is normalised so sales replies go to a clean address.
    expect(result.success && result.data.email).toBe("ada@example.com");
  });

  it("treats industry and company size as optional but validates them when given", () => {
    expect(
      leadInputSchema.safeParse({ ...minimal, industry: "retail", companySize: "1-200" }).success,
    ).toBe(true);
    expect(leadInputSchema.safeParse({ ...minimal, industry: "mining" }).success).toBe(false);
    expect(leadInputSchema.safeParse({ ...minimal, companySize: "huge" }).success).toBe(false);
  });

  it("accepts every listed industry, including retail, and no longer lists cloud", () => {
    const values = INDUSTRIES.map((i) => i.value);
    expect(values).toContain("retail");
    expect(values).not.toContain("cloud");
    for (const industry of values) {
      expect(leadInputSchema.safeParse({ ...minimal, industry }).success).toBe(true);
    }
  });

  it("still requires name, a valid work email and company", () => {
    expect(leadInputSchema.safeParse({ ...minimal, name: "A" }).success).toBe(false);
    expect(leadInputSchema.safeParse({ ...minimal, email: "nope" }).success).toBe(false);
    expect(leadInputSchema.safeParse({ ...minimal, company: "" }).success).toBe(false);
  });

  it("allows an empty or short message but caps its length", () => {
    expect(leadInputSchema.safeParse({ ...minimal, message: "Hi" }).success).toBe(true);
    expect(leadInputSchema.safeParse({ ...minimal, message: "x".repeat(2001) }).success).toBe(
      false,
    );
  });
});
