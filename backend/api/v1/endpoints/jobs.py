# api/v1/endpoints/jobs.py
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db

from models.schemas import JobBase
from services.jobs import get_all_jobs

jobs_router = APIRouter()

@jobs_router.get("/",response_model=List[JobBase])
async def get_all_jobs_ep(db:AsyncSession=Depends(get_db)):
    all_jobs = await get_all_jobs(db)
    return [ JobBase.model_validate(job) for job in all_jobs]

