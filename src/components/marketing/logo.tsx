import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Text + monogram logo. To use a real logo later, replace the monogram `<span>` with an
 * `<svg>` (or `next/image`) — every page and the footer render this one component.
 */
export function Logo({ className }: { className?: string }) {
  const monogram = SITE.name.trim().charAt(0).toUpperCase();
  return (
    <span className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span
        className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-base font-bold"
        aria-hidden
      >
        {monogram}
      </span>
      {SITE.name}
    </span>
  );
}
