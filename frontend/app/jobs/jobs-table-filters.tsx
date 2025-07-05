// app/jobs/jobs-table-filters.tsx
"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Job } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobsTableFiltersProps {
  table: Table<Job>;
}

export function JobsTableFilters({ table }: JobsTableFiltersProps) {
  const data = table.getCoreRowModel().rows.map(row => row.original);
  
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const locations = React.useMemo(() => {
    const uniqueLocations = new Set<string>();
    data.forEach(job => uniqueLocations.add(job.location));
    return Array.from(uniqueLocations);
  }, [data]);

  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      <Input
        placeholder="Filter by job title..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
        className="max-w-xs"
      />
      <Select
        value={(table.getColumn("type")?.getFilterValue() as string) ?? "all"}
        onValueChange={(value) => {
          const filterValue = value === "all" ? undefined : value;
          table.getColumn("type")?.setFilterValue(filterValue);
        }}
      >
        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {jobTypes.map(type => (<SelectItem key={type} value={type}>{type}</SelectItem>))}
        </SelectContent>
      </Select>
      <Select
        value={(table.getColumn("location")?.getFilterValue() as string) ?? "all"}
        onValueChange={(value) => {
          const filterValue = value === "all" ? undefined : value;
          table.getColumn("location")?.setFilterValue(filterValue);
        }}
      >
        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by location" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {locations.map(location => (<SelectItem key={location} value={location}>{location}</SelectItem>))}
        </SelectContent>
      </Select>
    </div>
  );
}