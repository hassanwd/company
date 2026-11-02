"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Reports `cta_click` for any element marked `data-cta="<location>"`. One delegated listener, so
 * server components can mark their buttons without becoming client components.
 */
export function CtaTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("[data-cta]") : null;
      const location = target?.getAttribute("data-cta");
      if (location) track("cta_click", { location });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
