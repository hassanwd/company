import "server-only";

import { env, isProd, leadsEmailConfig } from "./env";

/** Throws at server start when a production deployment would silently lose demo requests. */
export function assertProductionConfig() {
  if (!isProd) return;

  const missing = [
    ["RESEND_API_KEY", leadsEmailConfig.apiKey],
    ["LEADS_FROM_EMAIL", leadsEmailConfig.from],
    ["LEADS_TO_EMAIL", leadsEmailConfig.to.length > 0],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(
      `Demo requests would be lost: set ${missing.join(", ")} (see .env.example) before starting in production.`,
    );
  }

  if (env.DATABASE_URL) {
    console.warn(
      "[startup] DATABASE_URL is set but no database sink is implemented; leads are delivered by email only.",
    );
  }
}
