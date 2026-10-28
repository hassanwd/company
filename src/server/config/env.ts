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
