import type { Metadata } from "next";
import { connection } from "next/server";
import { PageHeader } from "@/components/shared/feedback/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usersService } from "@/server/services/users.service";

export const metadata: Metadata = { title: "Dashboard" };

// Read directly on the server (Server Component): no REST endpoint is exposed for this data.
export default async function DashboardPage() {
  await connection(); // render per request: stats are live data, never prerendered
  const stats = await usersService.stats();

  const cards = [
    { label: "Total users", value: stats.total },
    { label: "Active users", value: stats.active },
    { label: "Administrators", value: stats.admins },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="An overview of your workspace." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value }) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-3xl font-semibold">{value}</CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
