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
import { Briefcase, Calendar, MapPin, AlertCircle, Check } from "lucide-react";
import { ApplyForJobDialog } from "./apply-dialog"; // We will create this next
import { Separator } from "@/components/ui/separator";

// We extend the Job type to include the description we added in the API
type JobWithDescription = Job & {
  description: string
  responsibilities?: string[]; // Make optional to avoid errors if API doesn't return it
  qualifications?: string[];
};

async function getJob(jobId: string): Promise<JobWithDescription> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobId}`;
  const res = await fetch(apiUrl);
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
    // A better skeleton for the new layout
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        <div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
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
    // This is the new two-column layout
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">

      {/* Left Column: Job Description Details */}
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold tracking-tight">{job.title}</h1>
        <h2 className="text-xl text-muted-foreground mt-1">{job.companyName}</h2>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Job Description</h3>
          <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
        </div>

        {job.responsibilities && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Responsibilities</h3>
            <ul className="space-y-3">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.qualifications && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Qualifications</h3>
            <ul className="space-y-3">
              {job.qualifications.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column: Sticky Summary & Apply Box */}
      <aside className="mt-8 md:mt-0">
        <div className="sticky top-24">
          <Card>
            <CardContent className="p-6">
              <ApplyForJobDialog jobId={job.id} jobTitle={job.title} />

              <Separator className="my-6" />

              <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{job.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">
                    Posted on {format(new Date(job.postedDate), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

    </div>
  );
}