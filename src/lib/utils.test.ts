import { describe, expect, it } from "vitest";
import { cn, getInitials } from "./utils";

describe("utils", () => {
  it("merges tailwind classes", () => {
    expect(cn("px-2", "px-4", false && "hidden")).toBe("px-4");
  });

  it("builds initials", () => {
    expect(getInitials("ada lovelace byron")).toBe("AL");
  });
});
