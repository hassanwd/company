import "server-only";

import type { LeadInput } from "@/features/leads/schemas";
import { leadsRepository } from "@/server/db/leads.repository";

export const leadsService = {
  async submit({ website, ...input }: LeadInput) {
    // Honeypot tripped: pretend success so bots get no signal, but store nothing.
    if (website) return { received: true };

    const lead = await leadsRepository.create(input);
    // TODO: notify sales (email/Slack/CRM). Log only the id — never personal data.
    console.info(`[leads] new demo request ${lead.id}`);
    return { received: true };
  },
};
