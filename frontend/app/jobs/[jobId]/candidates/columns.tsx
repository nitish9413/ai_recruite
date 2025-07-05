// app/jobs/[jobId]/candidates/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Candidate } from "@/lib/types";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";

// Function to determine badge color based on score
const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" => {
  if (score >= 90) {
    return "default";
  }
  if (score >= 75) {
    return "secondary";
  }
  return "destructive";
}

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
    cell: ({ row }) => {
      const score: number = row.getValue("matchScore");
      return (
        <Badge variant={getScoreBadgeVariant(score)} className="text-lg font-semibold">
          {score}%
        </Badge>
      );
    },
  },
  {
    accessorKey: "applicationDate",
    header: "Applied On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("applicationDate"));
      return <div>{format(date, 'MMM d, yyyy')}</div>
    }
  },
  {
    id: "resume",
    header: "Resume",
    cell: ({ row }) => {
      const candidate = row.original;
      // In a real app, this would link to a secure URL
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