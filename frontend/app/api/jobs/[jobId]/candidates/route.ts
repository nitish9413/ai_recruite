// app/api/jobs/[jobId]/candidates/route.ts
import { NextResponse } from 'next/server';
import { Candidate } from '@/lib/types';

// Mock data for candidates. In a real app, this would come from your database.
const candidates: Candidate[] = [
  { id: 'cand1', name: 'Alice Johnson', email: 'alice@example.com', applicationDate: '2024-07-20T10:00:00Z', resumeUrl: '/resumes/alice.pdf', matchScore: 92 },
  { id: 'cand2', name: 'Bob Williams', email: 'bob@example.com', applicationDate: '2024-07-19T14:30:00Z', resumeUrl: '/resumes/bob.pdf', matchScore: 85 },
  { id: 'cand3', name: 'Charlie Brown', email: 'charlie@example.com', applicationDate: '2024-07-19T09:15:00Z', resumeUrl: '/resumes/charlie.pdf', matchScore: 76 },
  { id: 'cand4', name: 'Diana Prince', email: 'diana@example.com', applicationDate: '2024-07-21T11:00:00Z', resumeUrl: '/resumes/diana.pdf', matchScore: 98 },
  { id: 'cand5', name: 'Ethan Hunt', email: 'ethan@example.com', applicationDate: '2024-07-18T16:45:00Z', resumeUrl: '/resumes/ethan.pdf', matchScore: 65 },
];

export async function GET(
  request: Request,
  context: { params: { jobId: string } }
) {
  const jobId = context.params.jobId;

  // You can use the jobId to fetch candidates specific to that job.
  // For this mock, we'll return the same list for any job ID.
  console.log(`Fetching candidates for Job ID: ${jobId}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(candidates);
}