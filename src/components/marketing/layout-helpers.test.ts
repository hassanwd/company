import { describe, expect, it } from "vitest";
import { featureGridClass, STEP_CONNECTOR, stepsLayout } from "./layout-helpers";

describe("stepsLayout", () => {
  it("uses a single column for one step and two columns for two", () => {
    expect(stepsLayout(1).grid).toBe("");
    expect(stepsLayout(2).grid).toBe("sm:grid-cols-2");
  });

  it("puts 3, 4 and 5 steps in one row at the right breakpoint and connects them", () => {
    expect(stepsLayout(3)).toEqual({ grid: "md:grid-cols-3", connectAt: "md" });
    expect(stepsLayout(4)).toEqual({ grid: "sm:grid-cols-2 lg:grid-cols-4", connectAt: "lg" });
    expect(stepsLayout(5)).toEqual({ grid: "xl:grid-cols-5", connectAt: "xl" });
  });

  it("splits six steps into two even rows of three and draws no connectors", () => {
    expect(stepsLayout(6)).toEqual({ grid: "sm:grid-cols-2 lg:grid-cols-3", connectAt: null });
  });

  it("never connects steps that wrap onto several rows", () => {
    for (const count of [6, 7, 8, 9]) expect(stepsLayout(count).connectAt).toBeNull();
  });

  it("has a connector style for every breakpoint a layout can request", () => {
    for (const count of [3, 4, 5]) {
      const { connectAt } = stepsLayout(count);
      expect(connectAt && STEP_CONNECTOR[connectAt]).toBeTruthy();
    }
  });
});

describe("featureGridClass", () => {
  it("uses three columns when the count divides by three", () => {
    expect(featureGridClass(6)).toBe("md:grid-cols-3");
    expect(featureGridClass(9)).toBe("md:grid-cols-3");
  });

  it("uses two columns for even counts that do not divide by three, so ten cards leave no orphan", () => {
    expect(featureGridClass(10)).toBe("sm:grid-cols-2");
    expect(featureGridClass(4)).toBe("sm:grid-cols-2");
  });
});
