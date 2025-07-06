// app/jobs/create/create-job-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreateJobPayload {
  title: string;
  description: string;
}

// Mock mutation function to simulate creating a job
async function createJob(payload: CreateJobPayload): Promise<{ jobId: string }> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`;
  console.log("Creating job with payload:", payload);
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create job. Please try again.');
  }

  return response.json();
}

export function CreateJobForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      toast.success("Job created successfully!", {
        description: `The new job has been posted. Redirecting you to the candidates page...`,
      });
      // On success, redirect the recruiter to the new job's candidate list
      router.push(`/jobs/${data.jobId}/candidates`);
    },
    onError: (error) => {
      toast.error("Failed to create job", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) {
      toast.warning("Missing fields", { description: "Please provide both a title and a description."});
      return;
    }

    mutation.mutate({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base">Job Title</Label>
        <Input 
          id="title" 
          name="title" 
          placeholder="e.g. Senior Frontend Engineer" 
          required 
          disabled={mutation.isPending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base">Job Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Paste the full job description here..."
          className="min-h-[300px]"
          required
          disabled={mutation.isPending}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={mutation.isPending}>
          {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mutation.isPending ? "Analyzing..." : "Create Job"}
        </Button>
      </div>
    </form>
  );
}