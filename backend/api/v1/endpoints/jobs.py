from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db

from models.schemas import JobBase
from services.jobs import get_all_jobs, get_job_by_id,search_jobs_by_title

jobs_router = APIRouter()

@jobs_router.get("/", response_model=List[JobBase])
async def get_all_jobs_ep(db: AsyncSession = Depends(get_db)):
    all_jobs = await get_all_jobs(db)
    return [JobBase.model_validate(job) for job in all_jobs]

@jobs_router.get("/{job_id}", response_model=JobBase)
async def get_job_by_id_ep(job_id: str, db: AsyncSession = Depends(get_db)):
    result = await get_job_by_id(db, job_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobBase.model_validate(result)

@jobs_router.get("/jt/{job_title}", response_model=List[JobBase])
async def get_job_by_title_ep(job_title: str, db: AsyncSession = Depends(get_db)):
    results = await search_jobs_by_title(db, job_title)
    if not results:
        raise HTTPException(status_code=404, detail="No jobs found with that title")
    return [JobBase.model_validate(job) for job in results]

# @jobs_router.patch("/jobs/{job_id}",response_model=JobBase)
# async def update_job(job_id:str,db:AsyncSession=Depends(get_db)):
