import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  /** Public origin of the website (used for canonical URLs, sitemap and Open Graph). */
  SITE_URL: z.url().default("http://localhost:3000"),
  /**
   * The internal admin console (/dashboard, /users) has no authentication.
   * It is ON in development and OFF in production unless explicitly enabled.
   */
  ENABLE_CONSOLE: z.enum(["true", "false"]).optional(),
  /** Resend API key. Demo requests are emailed to LEADS_TO_EMAIL through Resend. */
  RESEND_API_KEY: z.string().optional(),
  /** Verified sender address, e.g. `Company <leads@yourdomain.com>`. */
  LEADS_FROM_EMAIL: z.string().optional(),
  /** Inbox that receives demo requests. Comma-separate several addresses. */
  LEADS_TO_EMAIL: z.string().optional(),
  /** Reserved for a database sink. No database driver is bundled yet; see .env.example. */
  DATABASE_URL: z.string().optional(),
  /** Plausible/Umami site domain. Analytics load only when this is set. */
  NEXT_PUBLIC_ANALYTICS_DOMAIN: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
  throw new Error(`Invalid environment variables:\n${issues}\nSee .env.example`);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
export const siteUrl = env.SITE_URL.replace(/\/$/, "");
export const consoleEnabled = env.ENABLE_CONSOLE ? env.ENABLE_CONSOLE === "true" : !isProd;

const clean = (value: string | undefined) => value?.trim() || undefined;

/** Where demo requests are delivered. `undefined` fields mean "not configured". */
export const leadsEmailConfig = {
  apiKey: clean(env.RESEND_API_KEY),
  from: clean(env.LEADS_FROM_EMAIL),
  to: (clean(env.LEADS_TO_EMAIL) ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean),
};

export const leadsEmailConfigured = Boolean(
  leadsEmailConfig.apiKey && leadsEmailConfig.from && leadsEmailConfig.to.length > 0,
);
