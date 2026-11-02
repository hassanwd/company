import "server-only";

import { SITE } from "@/content/site";
import type { LeadInput } from "@/features/leads/schemas";
import { isProd, leadsEmailConfigured } from "@/server/config/env";
import { leadsRepository, type LeadRecord } from "@/server/db/leads.repository";
import { sendSalesEmail } from "@/server/email/send-email";
import { AppError } from "@/server/http/errors";

const OPTIONAL = "(not provided)";

function leadEmailText(lead: LeadRecord) {
  return [
    `New demo request (${lead.id})`,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Job title: ${lead.role || OPTIONAL}`,
    `Industry: ${lead.industry || OPTIONAL}`,
    `Company size: ${lead.companySize || OPTIONAL}`,
    `Received: ${lead.createdAt}`,
    "",
    "Message:",
    lead.message || OPTIONAL,
  ].join("\n");
}

/** Emails the lead to sales. Logs ids and status only, never personal data. */
async function notifySales(lead: LeadRecord) {
  if (!leadsEmailConfigured) {
    // Startup checks stop production from reaching this branch; in development it is expected.
    console.warn(`[leads] email not configured; lead ${lead.id} was not delivered`);
    return;
  }

  try {
    await sendSalesEmail({
      subject: `New demo request — ${lead.company}`,
      text: leadEmailText(lead),
      replyTo: lead.email,
    });
  } catch (error) {
    console.error(
      `[leads] delivery failed for ${lead.id}:`,
      error instanceof Error ? error.message : "unknown error",
    );
    throw new AppError(
      "DELIVERY_FAILED",
      `We couldn't send your request just now. Please try again, or email us at ${SITE.email}.`,
    );
  }
}

export const leadsService = {
  async submit({ website, ...input }: LeadInput) {
    // Honeypot tripped: pretend success so bots get no signal, but store nothing.
    if (website) return { received: true };

    const lead = await leadsRepository.create(input);
    await notifySales(lead);
    console.info(`[leads] new demo request ${lead.id}${isProd ? "" : " (development)"}`);
    return { received: true };
  },
};
