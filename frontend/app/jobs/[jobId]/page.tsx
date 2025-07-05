// app/jobs/[jobId]/page.tsx
import { PageLayout } from "@/components/layout/page-layout";
import JobDetailView from "./job-detail-view";

export default function JobDetailPage() {
  return (
    <PageLayout className="max-w-6xl"> 
      <JobDetailView />
    </PageLayout>
  );
}