import "server-only";

import { leadsEmailConfig } from "@/server/config/env";

type Email = {
  subject: string;
  text: string;
  replyTo?: string;
};

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/**
 * Sends a plain-text email to the configured sales inbox through Resend's HTTP API (no SDK, so
 * no extra dependency). Throws on failure with a message that contains no personal data.
 */
export async function sendSalesEmail({ subject, text, replyTo }: Email): Promise<void> {
  const { apiKey, from, to } = leadsEmailConfig;
  if (!apiKey || !from || to.length === 0) throw new Error("Lead email is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: oneLine(subject),
      text,
      ...(replyTo ? { reply_to: oneLine(replyTo) } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    // Never include the response body: providers can echo the request, which holds personal data.
    throw new Error(`Email provider rejected the message (HTTP ${response.status})`);
  }
}
