import Script from "next/script";
import { analyticsDomain } from "@/server/config/env";
import { CtaTracker } from "./cta-tracker";

/** Cookie-less Plausible analytics. Renders nothing unless NEXT_PUBLIC_ANALYTICS_DOMAIN is set. */
export function Analytics() {
  if (!analyticsDomain) return null;
  return (
    <>
      <Script
        defer
        data-domain={analyticsDomain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
      <CtaTracker />
    </>
  );
}
