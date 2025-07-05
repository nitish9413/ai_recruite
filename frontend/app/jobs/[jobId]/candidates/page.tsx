// app/jobs/[jobId]/candidates/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateDataTable } from "./data-table";
import { columns } from "./columns";

// 1. Make the component function `async`
export default async function CandidateListPage({ params }: { params: { jobId: string }}) {
  
  // 2. "await" the params object to get the jobId, just like in the route handler.
  // This satisfies the Next.js static analysis tool.
  const { jobId } = await params;

  return (
    <main className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Job Applicants
          </CardTitle>
          <CardDescription>
            {/* 3. Use the new `jobId` variable */}
            Candidates who applied for Job ID: {jobId}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CandidateDataTable columns={columns} />
        </CardContent>
      </Card>
    </main>
  );
}