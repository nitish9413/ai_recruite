// app/page.tsx
import { PageLayout } from "@/components/layout/page-layout";
import { JobsDataTable } from "./jobs/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobListingPage() {
  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Find Your Next Opportunity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <JobsDataTable />
        </CardContent>
      </Card>
    </PageLayout>
  );
}