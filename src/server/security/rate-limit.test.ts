import { describe, expect, it } from "vitest";
import { rateLimit, resetRateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("blocks after the limit and can be reset", () => {
    const key = "test:key";
    resetRateLimit(key);
    expect(rateLimit(key, 2, 1000).ok).toBe(true);
    expect(rateLimit(key, 2, 1000).ok).toBe(true);
    const blocked = rateLimit(key, 2, 1000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    resetRateLimit(key);
    expect(rateLimit(key, 2, 1000).ok).toBe(true);
  });
});
