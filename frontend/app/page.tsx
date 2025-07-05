// app/page.tsx
import { columns } from "./jobs/columns";
import { JobsDataTable } from "./jobs/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobListingPage() {
  return (
    <main className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Find Your Next Opportunity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <JobsDataTable columns={columns} />
        </CardContent>
      </Card>
    </main>
  );
}