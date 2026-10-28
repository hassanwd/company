"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared/feedback/error-state";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <ErrorState onRetry={reset} />
    </div>
  );
}
