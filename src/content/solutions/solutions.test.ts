import { describe, expect, it } from "vitest";
import { agentAnchor, GOVERNANCE_ANCHOR, SOLUTIONS } from "./index";

describe("agentAnchor", () => {
  it("slugifies agent names", () => {
    expect(agentAnchor("Close & Reconciliation Agent")).toBe("close-reconciliation-agent");
    expect(agentAnchor("KYC & Onboarding Agent")).toBe("kyc-onboarding-agent");
  });
});

describe.each(SOLUTIONS.map((s) => [s.slug, s] as const))(
  "%s challenge links",
  (_slug, solution) => {
    const targets = new Set([
      GOVERNANCE_ANCHOR,
      ...solution.agents.map((a) => agentAnchor(a.name)),
    ]);

    it("point at an agent card or the governance section", () => {
      for (const { title, link } of solution.challenges) {
        if (link) expect(targets, `${title} -> ${link.target}`).toContain(link.target);
      }
    });

    it("have unique agent anchors", () => {
      expect(targets.size).toBe(solution.agents.length + 1);
    });
  },
);
