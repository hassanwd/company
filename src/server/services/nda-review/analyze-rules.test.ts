import { describe, expect, it } from "vitest";
import { SAMPLE_NDA_TEXT } from "@/features/nda-review/sample-nda";
import { analyzeWithRules } from "./analyze-rules";
import { splitParagraphs } from "./document";

const run = (text: string) => analyzeWithRules(splitParagraphs(text), text);
const byId = (text: string) => Object.fromEntries(run(text).map((r) => [r.clauseId, r]));

describe("analyzeWithRules", () => {
  it("finds 3 deviations, 1 critical, in the sample NDA (matches the website card)", () => {
    const results = byId(SAMPLE_NDA_TEXT);
    const deviations = Object.values(results).filter((r) => r.position !== "preferred");
    expect(deviations.map((r) => r.clauseId).sort()).toEqual([
      "governing-law",
      "liability",
      "term",
    ]);
    expect(results.liability!.position).toBe("unacceptable");
    expect(results.term!.position).toBe("acceptable");
    expect(results["governing-law"]!.issue).toContain("Texas");
  });

  it("only proposes redlines for deviations", () => {
    for (const r of run(SAMPLE_NDA_TEXT)) {
      expect(r.suggestedText === null).toBe(r.position === "preferred");
    }
  });

  it("flags residuals, perpetual terms and long non-solicits", () => {
    const text = SAMPLE_NDA_TEXT.replace("for a period of five (5) years", "in perpetuity").replace(
      "8. Assignment.",
      "8. Residuals. Either party may use information retained in the unaided memory of its personnel.\n\n9. Non-Solicitation. For two (2) years, neither party will solicit or hire any employee of the other.\n\n10. Assignment.",
    );
    const results = byId(text);
    expect(results.term!.position).toBe("unacceptable");
    expect(results.residuals!.position).toBe("unacceptable");
    expect(results["non-solicit"]!.position).toBe("unacceptable");
  });

  it("splits single-line PDF text into numbered sections", () => {
    const flat = SAMPLE_NDA_TEXT.replace(/\n+/g, " ");
    expect(splitParagraphs(flat).length).toBeGreaterThan(8);
    expect(byId(flat)["governing-law"]!.position).toBe("acceptable");
  });
});
