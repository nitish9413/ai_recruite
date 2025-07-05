// app/jobs/[jobId]/page.tsx
import JobDetailView from "./job-detail-view";

export default function JobDetailPage() {
  return (
    <main className="container mx-auto py-10">
      <JobDetailView />
    </main>
  );
}