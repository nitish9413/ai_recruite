// app/jobs/[jobId]/job-detail-view.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Job } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from "date-fns";
import { Briefcase, Calendar, MapPin, AlertCircle } from "lucide-react";
import { ApplyForJobDialog } from "./apply-dialog"; // We will create this next

// We extend the Job type to include the description we added in the API
type JobWithDescription = Job & { description: string };

async function getJob(jobId: string): Promise<JobWithDescription> {
  const res = await fetch(`/api/jobs/${jobId}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("JobNotFound");
    }
    throw new Error("Failed to fetch job details");
  }
  return res.json();
}

export default function JobDetailView() {
  const params = useParams();
  const jobId = params.jobId as string;

  const { data: job, isLoading, error } = useQuery<JobWithDescription>({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId),
    retry: (failureCount, error) => {
      // Don't retry if the error is JobNotFound
      if (error.message === "JobNotFound") return false;
      return failureCount < 3;
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message === "JobNotFound"
            ? "This job could not be found. It may have been closed or removed."
            : "Failed to load job details. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!job) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
            <CardDescription className="text-xl pt-1">{job.companyName}</CardDescription>
          </div>
          <ApplyForJobDialog jobId={job.id} jobTitle={job.title} />
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Posted on {format(new Date(job.postedDate), 'MMM d, yyyy')}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="text-muted-foreground whitespace-pre-line">
            {job.description}
        </p>
      </CardContent>
    </Card>
  );
}