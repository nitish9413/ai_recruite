// app/jobs/[jobId]/apply-dialog.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

// This is a mock mutation function.
// In a real app, this would be a POST request to your API.
async function applyForJob({ jobId, formData }: { jobId: string, formData: FormData }): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobId}/apply`;
  
  // When using FormData with fetch, you DO NOT set the 'Content-Type' header.
  // The browser sets it automatically with the correct boundary.
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Network response was not ok.");
  }
    
  return response.json();
}


interface ApplyForJobDialogProps {
    jobId: string;
    jobTitle: string;
}

export function ApplyForJobDialog({ jobId, jobTitle }: ApplyForJobDialogProps) {
    //   const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const mutation = useMutation({
        mutationFn: applyForJob,
        onSuccess: () => {
            toast.success(
                "Application Submitted!", {
                description: `Your application for ${jobTitle} has been received.`,
            });
            setOpen(false); // Close the dialog on success
        },
        onError: (error) => {
            toast.error("Uh oh! Something went wrong.",
                {
                    description: error.message,
                });
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("jobId", jobId);
        mutation.mutate({jobId,formData});
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg">Apply Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Apply for {jobTitle}</DialogTitle>
                        <DialogDescription>
                            Submit your details below. Your resume will be scanned by our AI agent.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="applicantName" className="text-right">Name</label>
                            <Input id="applicantName" name="applicantName" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="applicantEmail" className="text-right">Email</label>
                            <Input id="applicantEmail" name="applicantEmail" type="email" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="resume" className="text-right">Resume</label>
                            <Input id="resume" name="resume" type="file" className="col-span-3" required accept=".pdf,.doc,.docx" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" disabled={mutation.isPending}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {mutation.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}