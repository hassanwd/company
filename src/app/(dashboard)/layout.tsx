import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { consoleEnabled } from "@/server/config/env";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // The console has no authentication, so it 404s unless explicitly enabled (see .env.example).
  if (!consoleEnabled) notFound();
  return <AppShell>{children}</AppShell>;
}
