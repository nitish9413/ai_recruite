// app/jobs/data-table.tsx
"use client";

import { Job } from "@/lib/types";
import { DataTable } from "@/components/tables/data-table"; // Import our new generic component
import { columns } from "./columns";
import { JobsTableFilters } from "./jobs-table-filters"; // Import the specific filters

async function getJobs(): Promise<Job[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`;
  console.log("ATTEMPTING TO FETCH FROM:", apiUrl);
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export function JobsDataTable() {
  return (
    <DataTable
      columns={columns}
      queryKey={["jobs"]}
      queryFn={getJobs}
      FilterComponent={JobsTableFilters}
    />
  );
}