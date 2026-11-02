/**
 * Grid column logic that avoids orphan cards: pick columns from how many items there are.
 * Class names are written out in full so Tailwind can detect them.
 */

export type StepsLayout = {
  /** Grid column classes for the list. */
  grid: string;
  /** Breakpoint at which every step sits in one row, where connectors are drawn between them. */
  connectAt: "md" | "lg" | "xl" | null;
};

export function stepsLayout(count: number): StepsLayout {
  if (count <= 1) return { grid: "", connectAt: null };
  if (count === 2) return { grid: "sm:grid-cols-2", connectAt: null };
  if (count === 3) return { grid: "md:grid-cols-3", connectAt: "md" };
  if (count === 4) return { grid: "sm:grid-cols-2 lg:grid-cols-4", connectAt: "lg" };
  // Five fit in one row only on wide screens; below that they stack in a single column.
  if (count === 5) return { grid: "xl:grid-cols-5", connectAt: "xl" };
  if (count === 6) return { grid: "sm:grid-cols-2 lg:grid-cols-3", connectAt: null };
  return { grid: "sm:grid-cols-2 lg:grid-cols-4", connectAt: null };
}

/** Connector drawn in the gap to the right of each step except the last. */
export const STEP_CONNECTOR: Record<NonNullable<StepsLayout["connectAt"]>, string> = {
  md: "md:not-last:after:absolute md:not-last:after:top-9 md:not-last:after:left-full md:not-last:after:h-px md:not-last:after:w-4 md:not-last:after:bg-border md:not-last:after:content-['']",
  lg: "lg:not-last:after:absolute lg:not-last:after:top-9 lg:not-last:after:left-full lg:not-last:after:h-px lg:not-last:after:w-4 lg:not-last:after:bg-border lg:not-last:after:content-['']",
  xl: "xl:not-last:after:absolute xl:not-last:after:top-9 xl:not-last:after:left-full xl:not-last:after:h-px xl:not-last:after:w-4 xl:not-last:after:bg-border xl:not-last:after:content-['']",
};

/** Feature cards: 3 columns when the count divides by 3, otherwise 2, so no card is left alone. */
export function featureGridClass(count: number): string {
  if (count % 3 === 0) return "md:grid-cols-3";
  if (count % 2 === 0) return "sm:grid-cols-2";
  return "sm:grid-cols-2 lg:grid-cols-3";
}
