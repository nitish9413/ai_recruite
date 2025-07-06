// app/jobs/[jobId]/candidates/data-table.tsx
"use client";

import { useParams } from "next/navigation";
import { Candidate } from "@/lib/types";
import { DataTable } from "@/components/tables/data-table"; // Import our new generic component
import { columns } from "./columns";

async function getCandidates(jobId: string): Promise<Candidate[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobId}/candidates`;
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("Failed to fetch candidates");
  return res.json();
}

export function CandidateDataTable() {
  const params = useParams();
  const jobId = params.jobId as string;

  return (
    <DataTable
      columns={columns}
      queryKey={["candidates", jobId]}
      queryFn={() => getCandidates(jobId)}
      initialSorting={[{ id: 'matchScore', desc: true }]} // Pass in the specific initial sort
      noResultsMessage="No applications received yet."
      errorMessage="Could not load candidate data."
    />
  );
}