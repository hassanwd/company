import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ configured: true }));
const create = vi.hoisted(() => vi.fn());
const sendSalesEmail = vi.hoisted(() => vi.fn());

vi.mock("server-only", () => ({}));
vi.mock("@/server/config/env", () => ({
  isProd: false,
  get leadsEmailConfigured() {
    return state.configured;
  },
}));
vi.mock("@/server/db/leads.repository", () => ({ leadsRepository: { create } }));
vi.mock("@/server/email/send-email", () => ({ sendSalesEmail }));

import type { LeadInput } from "@/features/leads/schemas";
import { AppError } from "@/server/http/errors";
import { leadsService } from "./leads.service";

const lead: LeadInput = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines Ltd",
  role: "",
  industry: "",
  companySize: "",
  message: "",
  website: "",
};

beforeEach(() => {
  vi.restoreAllMocks();
  create.mockReset();
  sendSalesEmail.mockReset();
  state.configured = true;
  create.mockImplementation(async (input) => ({
    id: "lead-1",
    createdAt: "2026-11-03T00:00:00.000Z",
    ...input,
  }));
  sendSalesEmail.mockResolvedValue(undefined);
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("leadsService.submit", () => {
  it("stores nothing and sends nothing when the honeypot is filled", async () => {
    const result = await leadsService.submit({ ...lead, website: "https://spam.example" });
    expect(result).toEqual({ received: true });
    expect(create).not.toHaveBeenCalled();
    expect(sendSalesEmail).not.toHaveBeenCalled();
  });

  it("stores the lead without the honeypot field and notifies sales by email", async () => {
    await leadsService.submit(lead);

    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0][0]).not.toHaveProperty("website");

    expect(sendSalesEmail).toHaveBeenCalledTimes(1);
    const email = sendSalesEmail.mock.calls[0][0];
    expect(email.subject).toContain("Analytical Engines Ltd");
    expect(email.replyTo).toBe("ada@example.com");
    expect(email.text).toContain("Industry: (not provided)");
  });

  it("logs the lead id but never personal data", async () => {
    await leadsService.submit(lead);
    const logged = JSON.stringify([
      ...vi.mocked(console.info).mock.calls,
      ...vi.mocked(console.warn).mock.calls,
      ...vi.mocked(console.error).mock.calls,
    ]);
    expect(logged).toContain("lead-1");
    expect(logged).not.toContain("ada@example.com");
    expect(logged).not.toContain("Ada Lovelace");
  });

  it("does not throw when email is not configured (development)", async () => {
    state.configured = false;
    await expect(leadsService.submit(lead)).resolves.toEqual({ received: true });
    expect(sendSalesEmail).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalled();
  });

  it("surfaces a user-safe error when delivery fails, without leaking personal data into logs", async () => {
    sendSalesEmail.mockRejectedValue(new Error("Email provider rejected the message (HTTP 500)"));

    const error = await leadsService.submit(lead).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(AppError);
    expect((error as AppError).code).toBe("DELIVERY_FAILED");

    const logged = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logged).toContain("lead-1");
    expect(logged).not.toContain("ada@example.com");
  });
});
