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
  /**
   * NDA review demo (console only). "mock" runs the built-in rule checks with no model;
   * "live" calls an OpenAI-compatible endpoint such as vLLM serving gpt-oss.
   */
  LLM_MODE: z.enum(["mock", "live"]).default("mock"),
  /** e.g. http://localhost:8000/v1 for vLLM, or https://api.openai.com/v1 */
  LLM_BASE_URL: z.url().optional(),
  /** Model name as the server knows it, e.g. openai/gpt-oss-20b */
  LLM_MODEL: z.string().optional(),
  /** Optional bearer token (vLLM --api-key, or a hosted API key). */
  LLM_API_KEY: z.string().optional(),
  /** Plausible/Umami site domain. Analytics load only when this is set. */
  NEXT_PUBLIC_ANALYTICS_DOMAIN: z
    .string()
    .trim()
    .regex(/^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$/i, "must be a bare domain such as example.com")
    .optional()
    .or(z.literal("")),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
  throw new Error(`Invalid environment variables:\n${issues}\nSee .env.example`);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
export const siteUrl = env.SITE_URL.replace(/\/$/, "");
/** Site domain for cookie-less analytics, or undefined when analytics is off. */
export const analyticsDomain = env.NEXT_PUBLIC_ANALYTICS_DOMAIN || undefined;

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

/** Settings for the NDA review agent's model. Server-only: never import from client code. */
export const llmConfig = {
  mode: env.LLM_MODE,
  baseUrl: env.LLM_BASE_URL,
  model: env.LLM_MODEL,
  apiKey: env.LLM_API_KEY,
  timeoutMs: 120_000,
};
