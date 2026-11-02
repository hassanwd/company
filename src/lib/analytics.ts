/** Events sent to the cookie-less analytics provider. Never put personal data in `props`. */
export type AnalyticsEvent = "cta_click" | "lead_submitted";

type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

declare global {
  interface Window {
    plausible?: Plausible;
  }
}

/** No-op unless analytics is enabled and its script has loaded. */
export function track(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;
  window.plausible(event, props ? { props } : undefined);
}
