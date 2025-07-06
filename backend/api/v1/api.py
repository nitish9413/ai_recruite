# api/v1/api.py
from fastapi import APIRouter
from api.v1.endpoints import jobs

api_router = APIRouter()

api_router.include_router(jobs.jobs_router,prefix="/jobs",tags=["jobs"])