from typing import List
from fastapi import APIRouter, Body, Depends
from core.database import get_db
from models.schemas import Candidate, PatchCandidatePayload
from sqlalchemy.ext.asyncio import AsyncSession
from services.candidates import (
    get_candidate_by_id,
    update_candidate_application,
    get_candidate_for_job,
)
from fastapi import HTTPException

candidate_router = APIRouter()


@candidate_router.get("/{candidate_id}", response_model=Candidate)
async def get_candidate_by_id_ep(candidate_id: str, db: AsyncSession = Depends(get_db)):
    candidate = await get_candidate_by_id(db, candidate_id)

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not Found")

    return Candidate.model_validate(candidate)


@candidate_router.get("/", response_model=List[Candidate])
async def get_candidates_by_job(job_id: str, db: AsyncSession = Depends(get_db)):
    candidates = await get_candidate_for_job(db, job_id)
    if not candidates:
        raise HTTPException(status_code=404, detail="Candidate Not Found")

    return [Candidate.model_validate(candidate) for candidate in candidates]


@candidate_router.patch("/{candidate_id}", response_model=Candidate)
async def update_candidate_details(
    candidate_id: str,
    payload: PatchCandidatePayload = Body(...),
    db: AsyncSession = Depends(get_db),
):
    db_candidate = await get_candidate_by_id(db, candidate_id)
    if not db_candidate:
        raise HTTPException(status_code=404, details="Candidate not found")

    update_data = payload.model_dump(exclude_unset=True)

    if not update_data:
        return db_candidate

    updated = await update_candidate_application(db, db_candidate, update_data)
    return Candidate.model_validate(updated)
