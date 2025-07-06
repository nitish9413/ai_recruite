import asyncio
import json
from datetime import datetime

import sys
import os
sys.path.append(os.path.realpath(os.path.join(os.path.dirname(__file__), '..')))

from core.database import AsyncSessionLocal
from models import tables
from models import schemas

# async def seed_data():
#     """Populates the database with initial sample data."""
#     async with AsyncSessionLocal() as session:
#         # ... (check for existing data) ...

#         print("Seeding new data...")

#         # --- Create Sample Jobs ---
#         job1 = tables.Job(
#             title="Senior Frontend Engineer",
#             company_name="Vercel",
#             location="San Francisco, CA",
#             type=schemas.JobType.FULL_TIME, 
#             status=schemas.JobStatus.OPEN,
#             posted_date=datetime.utcnow(),
#             # --- ADD THE DESCRIPTION FIELD ---
#             description="Join our team to build the next generation of web experiences with Next.js. We are looking for a passionate individual who loves crafting beautiful and performant user interfaces.",
#             responsibilities=json.dumps(["Develop and maintain user-facing features using React.js and Next.js.", "Optimize applications for maximum speed and scalability."]),
#             qualifications=json.dumps(["5+ years of experience in frontend development.", "Deep expertise in JavaScript, React, and CSS."]),
#             required_skills=json.dumps(["React", "Next.js", "TypeScript", "CSS-in-JS"])
#         )
#         job2 = tables.Job(
#             title="Backend Python Developer",
#             company_name="Stripe",
#             location="Remote",
#             type=schemas.JobType.FULL_TIME,
#             status=schemas.JobStatus.OPEN,
#             posted_date=datetime.utcnow(),
#             # --- AND ADD IT HERE ---
#             description="We are looking for a skilled Python developer to join our backend team, working on critical financial infrastructure that powers millions of businesses worldwide.",
#             responsibilities=json.dumps(["Design and implement scalable REST APIs using FastAPI.", "Work with PostgreSQL and SQLAlchemy to manage data."]),
#             qualifications=json.dumps(["Strong proficiency in Python.", "Experience with FastAPI or Django."]),
#             required_skills=json.dumps(["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "REST"])
#         )

#         session.add_all([job1, job2])
#         await session.commit()
#         print("Added 2 jobs.")

#         # --- THE FIX: Refresh the objects to load the database-generated IDs ---
#         await session.refresh(job1)
#         await session.refresh(job2)
        
#         # Now it is safe to access job1.id
#         first_job_id = job1.id
#         print(f"Using Job ID: {first_job_id} for candidates.")

#         # --- Create Sample Candidates for the First Job ---
#         candidates_to_create = [
#             tables.Candidate(
#                 name="Alice Johnson",
#                 email="alice.j@example.com",
#                 years_of_experience=6,
#                 resume_url="resumes/alice_johnson.pdf",
#                 match_score=94,
#                 ai_assessment="Excellent candidate. Strong alignment with required skills...",
#                 job_id=first_job_id
#             ),
#             # ... other candidates ...
#         ]

#         session.add_all(candidates_to_create)
#         await session.commit()
#         print("Added candidates for the first job.")

#         print("Database seeding complete!")

async def seed_data():

    async with AsyncSessionLocal() as session:
        # --- Skip if already seeded ---
        # existing = await session.execute(select(tables.Job))
        # if existing.scalars().first():
        #     print("Seeding skipped: data already exists.")
        #     return

        print("Seeding new data...")

        # --- Jobs ---
        jobs = [
            tables.Job(
                title="Senior Frontend Engineer",
                company_name="Vercel",
                location="San Francisco, CA",
                type=schemas.JobType.FULL_TIME,
                status=schemas.JobStatus.OPEN,
                posted_date=datetime.utcnow(),
                description="Build modern UIs using Next.js. Work with designers and product engineers closely.",
                responsibilities=json.dumps([
                    "Develop React-based components.",
                    "Collaborate with UX designers to ensure design fidelity."
                ]),
                qualifications=json.dumps([
                    "5+ years in frontend dev.",
                    "Strong grasp of JS frameworks, especially React."
                ]),
                required_skills=json.dumps(["React", "Next.js", "TypeScript", "Figma"])
            ),
            tables.Job(
                title="Backend Python Developer",
                company_name="Stripe",
                location="Remote",
                type=schemas.JobType.FULL_TIME,
                status=schemas.JobStatus.OPEN,
                posted_date=datetime.utcnow(),
                description="Build resilient, scalable APIs for financial infrastructure.",
                responsibilities=json.dumps([
                    "Design RESTful APIs using FastAPI.",
                    "Optimize database queries."
                ]),
                qualifications=json.dumps([
                    "Strong Python skills.",
                    "Experience with Postgres and async systems."
                ]),
                required_skills=json.dumps(["Python", "FastAPI", "PostgreSQL", "Docker"])
            ),
            tables.Job(
                title="Data Engineer",
                company_name="Airbnb",
                location="San Francisco, CA",
                type=schemas.JobType.FULL_TIME,
                status=schemas.JobStatus.OPEN,
                posted_date=datetime.utcnow(),
                description="Design and maintain scalable data pipelines and analytics infra.",
                responsibilities=json.dumps([
                    "Build ETL processes with Airflow.",
                    "Manage big data workflows on Spark."
                ]),
                qualifications=json.dumps([
                    "3+ years in data engineering.",
                    "Strong SQL and distributed system understanding."
                ]),
                required_skills=json.dumps(["Airflow", "Spark", "SQL", "Python", "GCP"])
            ),
            tables.Job(
                title="DevOps Engineer",
                company_name="GitHub",
                location="Remote",
                type=schemas.JobType.CONTRACT,
                status=schemas.JobStatus.OPEN,
                posted_date=datetime.utcnow(),
                description="Automate and monitor CI/CD pipelines and infrastructure.",
                responsibilities=json.dumps([
                    "Manage Kubernetes clusters.",
                    "Improve observability and SRE practices."
                ]),
                qualifications=json.dumps([
                    "Knowledge of cloud platforms (AWS/GCP).",
                    "Strong scripting skills."
                ]),
                required_skills=json.dumps(["Kubernetes", "Terraform", "Prometheus", "AWS"])
            ),
        ]

        session.add_all(jobs)
        await session.commit()

        for job in jobs:
            await session.refresh(job)

        print(f"Added {len(jobs)} jobs.")

        # --- Candidates ---
        candidate_data = [
            # Frontend
            {"name": "Alice Johnson", "email": "alice.j@example.com", "years_of_experience": 6, "match_score": 94, "job_id": jobs[0].id},
            {"name": "Mike Green", "email": "mike.green@example.com", "years_of_experience": 4, "match_score": 88, "job_id": jobs[0].id},

            # Backend
            {"name": "Rahul Mehta", "email": "rahul.m@example.com", "years_of_experience": 5, "match_score": 91, "job_id": jobs[1].id},
            {"name": "Sophie Tran", "email": "sophie.tran@example.com", "years_of_experience": 3, "match_score": 85, "job_id": jobs[1].id},

            # Data
            {"name": "Jian Li", "email": "jian.li@example.com", "years_of_experience": 4, "match_score": 90, "job_id": jobs[2].id},
            {"name": "Carlos Vega", "email": "carlos.v@example.com", "years_of_experience": 6, "match_score": 92, "job_id": jobs[2].id},

            # DevOps
            {"name": "Nina Patel", "email": "nina.patel@example.com", "years_of_experience": 5, "match_score": 87, "job_id": jobs[3].id},
            {"name": "Tom Müller", "email": "tom.mueller@example.com", "years_of_experience": 7, "match_score": 93, "job_id": jobs[3].id},
        ]

        candidates = [
            tables.Candidate(
                name=data["name"],
                email=data["email"],
                years_of_experience=data["years_of_experience"],
                resume_url=f"resumes/{data['name'].lower().replace(' ', '_')}.pdf",
                match_score=data["match_score"],
                ai_assessment="Auto-generated match based on skill similarity and role relevance.",
                job_id=data["job_id"]
            )
            for data in candidate_data
        ]

        session.add_all(candidates)
        await session.commit()

        print(f"Added {len(candidates)} candidates.")
        print("🎉 Database seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_data())