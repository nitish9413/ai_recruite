// app/jobs/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Job } from "@/lib/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { format } from 'date-fns';

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const job = row.original;
      return (
        <Link href={`/jobs/${job.id}`} className="font-medium text-primary hover:underline">
          {job.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: "Company",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
        return <Badge variant="outline">{row.original.type}</Badge>
    }
  },
  {
    accessorKey: "postedDate",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Posted
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    cell: ({ row }) => {
        const date = new Date(row.getValue("postedDate"));
        return <div>{format(date, 'MMM d, yyyy')}</div>
    }
  },
];