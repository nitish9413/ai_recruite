import json
from typing import List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.tables import Job
from models.schemas import CreateJobPayload, JobStatus

async def get_job_by_id(db:AsyncSession,job_id:str)->Job|None:
    result = await db.execute(
        select(Job).filter(Job.id==job_id)
    )
    return result.scalars().first()

async def get_all_jobs(db:AsyncSession,skip:int=0,limit:int=100)->List[Job]:
    result = await db.execute(
        select(Job).offset(skip).limit(limit)
    )
    return result.scalars().all()

async def search_jobs_by_title(db:AsyncSession,title:str)->List[Job]:
    result = await db.execute(
        select(Job).filter(Job.title==title)
    )
    return result.scalars().first()

async def create_job(db:AsyncSession,job_data:CreateJobPayload)->Job:
    
    job_dict = job_data.model_dump()
    job_dict["responsibilities"] = json.dumps(job_data.responsiblities)
    job_dict["qualifications"] =json.dumps(job_data.qualification)
    job_dict["required_skills"]= json.dumps(job_data.required_skills)

    db_job = Job(**job_dict,status=JobStatus.OPEN)

    db.add(db_job)
    await db.commit()
    await db.refresh(db_job)
    return db_job