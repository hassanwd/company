import "server-only";

import { randomUUID } from "node:crypto";
import type { LeadInput } from "@/features/leads/schemas";
import { isProd } from "@/server/config/env";

export type LeadRecord = Omit<LeadInput, "website"> & { id: string; createdAt: string };

/**
 * Persistence boundary for demo requests.
 *
 * In production a lead is delivered to the sales inbox by email (see `leads.service.ts`), which
 * is the system of record, so nothing is held in server memory. Implement this interface against
 * a database or CRM if you also want an indexed copy.
 */
export interface LeadsRepository {
  create(input: Omit<LeadInput, "website">): Promise<LeadRecord>;
}

const newRecord = (input: Omit<LeadInput, "website">): LeadRecord => ({
  id: randomUUID(),
  createdAt: new Date().toISOString(),
  ...input,
});

/** Development stand-in so the form works locally without email configured. */
const globalStore = globalThis as unknown as { __leads?: LeadRecord[] };
const memoryRepository: LeadsRepository = {
  async create(input) {
    const record = newRecord(input);
    (globalStore.__leads ??= []).push(record);
    return record;
  },
};

/** Production default: identify the lead without keeping personal data in process memory. */
const deliveryOnlyRepository: LeadsRepository = {
  async create(input) {
    return newRecord(input);
  },
};

export const leadsRepository: LeadsRepository = isProd ? deliveryOnlyRepository : memoryRepository;
