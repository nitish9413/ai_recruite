// app/jobs/create/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateJobForm } from "./create-job-form";

export default function CreateJobPage() {
  return (
    <main className="container mx-auto max-w-3xl py-10">
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
    </main>
  );
}