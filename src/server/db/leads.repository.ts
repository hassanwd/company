import "server-only";

import { randomUUID } from "node:crypto";
import type { LeadInput } from "@/features/leads/schemas";

export type LeadRecord = Omit<LeadInput, "website"> & { id: string; createdAt: string };

/**
 * Persistence boundary for demo requests. The in-memory version is a development stand-in:
 * implement this against your database or CRM (HubSpot, Salesforce, ...) before launch.
 */
export interface LeadsRepository {
  create(input: Omit<LeadInput, "website">): Promise<LeadRecord>;
}

const globalStore = globalThis as unknown as { __leads?: LeadRecord[] };
const getStore = () => (globalStore.__leads ??= []);

export const leadsRepository: LeadsRepository = {
  async create(input) {
    const record: LeadRecord = { id: randomUUID(), createdAt: new Date().toISOString(), ...input };
    getStore().push(record);
    return record;
  },
};
