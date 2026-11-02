/**
 * Runs once when the server starts (not while building). Fails loudly if production is missing
 * the configuration that keeps demo requests from being lost.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const { assertProductionConfig } = await import("@/server/config/startup-check");
  assertProductionConfig();
}
