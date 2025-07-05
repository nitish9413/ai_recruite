// app/api/jobs/[jobId]/route.ts
import { NextResponse } from 'next/server';
import { Job } from '@/lib/types';

// Same mock data as before. In a real app, this would be a database query.
const jobs: Job[] = [
  { id: '1', title: 'Senior Frontend Engineer', companyName: 'Vercel', location: 'San Francisco, CA', type: 'Full-time', postedDate: '2024-07-15T10:00:00Z', status: 'Open' },
  { id: '2', title: 'Product Manager', companyName: 'Google', location: 'Mountain View, CA', type: 'Full-time', postedDate: '2024-07-14T14:30:00Z', status: 'Open' },
  { id: '3', title: 'UX/UI Designer', companyName: 'Stripe', location: 'Remote', type: 'Contract', postedDate: '2024-07-12T09:00:00Z', status: 'Interviewing' },
  // ... other jobs
];

// We need to add a "description" for the detail page.
const jobDetails = {
  '1': {
    description: 'As a Senior Frontend Engineer at Vercel, you will be at the forefront of building the next generation of web experiences. You will work with Next.js, React, and cutting-edge frontend technologies to deliver high-performance, scalable, and beautiful user interfaces.',
    responsibilities: [
      'Develop and maintain user-facing features using React.js and Next.js.',
      'Collaborate with product managers, designers, and other engineers.',
      'Optimize applications for maximum speed and scalability.',
      'Write clean, maintainable, and well-documented code.',
    ],
    qualifications: [
      '5+ years of experience in frontend development.',
      'Deep expertise in JavaScript, React, and CSS.',
      'Experience with server-side rendering and static site generation.',
      'Strong understanding of web performance and security best practices.',
    ]
  },
  '2': { description: 'The Product Manager role at Google involves defining product strategy, gathering requirements, and guiding products from conception to launch. You will work closely with engineering, design, and marketing teams.' },
  '3': { description: 'Join Stripe as a UX/UI Designer to create intuitive and elegant financial products. This contract role is fully remote and requires a strong portfolio in product design.' },
};

export async function GET(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = await params;

  // Find the job in our mock list
  const job = jobs.find(j => j.id === jobId);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  // Combine base job data with detailed description
  const details = jobDetails[job.id as keyof typeof jobDetails] || { description: 'No description available.' };

  return NextResponse.json({
    ...job,
    ...details,
  });
}