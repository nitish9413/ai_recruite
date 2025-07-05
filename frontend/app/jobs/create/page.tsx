// app/jobs/create/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateJobForm } from "./create-job-form";
import { PageLayout } from "@/components/layout/page-layout";

export default function CreateJobPage() {
  return (
    <PageLayout className="max-w-3xl"> {/* A narrower layout for forms is nice */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create a New Job Posting</CardTitle>
          <CardDescription>
            Simply provide a job title and paste the full job description below. Our AI will handle the rest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateJobForm />
        </CardContent>
      </Card>
    </PageLayout>
  );
}