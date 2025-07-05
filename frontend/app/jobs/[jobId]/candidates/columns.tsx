// app/jobs/[jobId]/candidates/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Candidate } from "@/lib/types";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// --- 1. Import the new Progress component ---
import { Progress } from "@/components/ui/progress";

// --- 2. Create a new helper for progress bar colors ---
// This function returns Tailwind CSS classes to color the bar.
const getProgressColor = (score: number): string => {
  if (score >= 90) return "bg-green-600"; // Strong match
  if (score >= 75) return "bg-yellow-500"; // Good match
  return "bg-red-600"; // Weak match
};

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "matchScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Match Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // --- 3. Replace the cell renderer logic ---
    cell: ({ row }) => {
      const score: number = row.getValue("matchScore");
      return (
        <div className="flex items-center gap-x-3">
          {/* Display the percentage number */}
          <span className="font-medium w-12 text-right">{score}%</span>
          {/* Display the progress bar */}
          <Progress 
            value={score} 
            className="w-[60%]"
            indicatorClassName={getProgressColor(score)} // Custom prop to color the indicator
          />
        </div>
      );
    },
  },
  {
    accessorKey: "applicationDate",
    header: "Applied On",
    cell: ({ row }) => {
        // ... (this part remains the same)
        const date = new Date(row.getValue("applicationDate"));
        return <div>{format(date, 'MMM d, yyyy')}</div>
    }
  },
  {
    id: "resume",
    header: "Resume",
    cell: ({ row }) => {
        // ... (this part remains the same)
        const candidate = row.original;
        return (
          <Button variant="outline" size="sm" asChild>
            <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
              View <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];