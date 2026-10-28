import { describe, expect, it } from "vitest";
import { listUsersQuerySchema, updateUserInputSchema, userInputSchema } from "./schemas";

const valid = {
  name: "Ada Lovelace",
  email: "ADA@Example.com",
  role: "user",
  status: "active",
} as const;

describe("user schemas", () => {
  it("normalises email and rejects bad input", () => {
    const ok = userInputSchema.safeParse(valid);
    expect(ok.success && ok.data.email).toBe("ada@example.com");
    expect(userInputSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(userInputSchema.safeParse({ ...valid, role: "root" }).success).toBe(false);
  });

  it("requires a uuid id for updates", () => {
    expect(updateUserInputSchema.safeParse({ ...valid, id: "123" }).success).toBe(false);
    expect(
      updateUserInputSchema.safeParse({ ...valid, id: "5b3c9d0e-8a43-4d0b-9a0b-3f1c2d4e5f60" })
        .success,
    ).toBe(true);
  });

  it("applies query defaults and caps page size", () => {
    expect(listUsersQuerySchema.parse({})).toMatchObject({
      page: 1,
      pageSize: 10,
      sort: "createdAt",
    });
    expect(listUsersQuerySchema.safeParse({ pageSize: "1000" }).success).toBe(false);
  });
});
