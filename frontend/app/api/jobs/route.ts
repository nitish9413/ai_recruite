// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { Job } from '@/lib/types';

// Mock data
const jobs: Job[] = [
  { id: '1', title: 'Senior Frontend Engineer', companyName: 'Vercel', location: 'San Francisco, CA', type: 'Full-time', postedDate: '2024-07-15T10:00:00Z', status: 'Open' },
  { id: '2', title: 'Product Manager', companyName: 'Google', location: 'Mountain View, CA', type: 'Full-time', postedDate: '2024-07-14T14:30:00Z', status: 'Open' },
  { id: '3', title: 'UX/UI Designer', companyName: 'Stripe', location: 'Remote', type: 'Contract', postedDate: '2024-07-12T09:00:00Z', status: 'Interviewing' },
  { id: '4', title: 'Data Scientist', companyName: 'Netflix', location: 'Los Gatos, CA', type: 'Full-time', postedDate: '2024-07-10T11:00:00Z', status: 'Open' },
  { id: '5', title: 'DevOps Engineer', companyName: 'Amazon', location: 'Seattle, WA', type: 'Full-time', postedDate: '2024-07-09T16:00:00Z', status: 'Closed' },
  { id: '6', title: 'Marketing Intern', companyName: 'HubSpot', location: 'Remote', type: 'Internship', postedDate: '2024-07-15T08:00:00Z', status: 'Open' },
  { id: '7', title: 'Backend Developer', companyName: 'Microsoft', location: 'Redmond, WA', type: 'Part-time', postedDate: '2024-07-11T13:20:00Z', status: 'Open' },
];

export async function GET() {
  // In a real app, you'd fetch this from a database.
  // We'll also add a small delay to simulate network latency.
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // We only want to return open jobs to candidates
  const openJobs = jobs.filter(job => job.status === 'Open');

  return NextResponse.json(openJobs);
}