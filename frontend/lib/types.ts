// lib/types.ts

// The "export" keyword here is crucial. It tells TypeScript that this file is a module.
export type Job = {
  id: string;
  title: string;
  companyName: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  postedDate: string; // ISO 8601 date string
  status: "Open" | "Closed" | "Interviewing";
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  applicationDate: string; // ISO 8601 date string
  resumeUrl: string; // Link to a PDF, e.g., in cloud storage
  matchScore: number; // The LLM-generated score from 0 to 100
};