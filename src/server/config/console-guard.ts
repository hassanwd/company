import "server-only";

import { AppError } from "@/server/http/errors";
import { consoleEnabled } from "./env";

/** Refuses internal-console actions when the console is disabled (production default). */
export function assertConsoleEnabled() {
  if (!consoleEnabled) throw AppError.notFound();
}
