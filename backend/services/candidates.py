from typing import Any, Dict, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.schemas import ApplicationPayload, PatchCandidatePayload
from models.tables import Candidate


async def get_candidate_for_job(db: AsyncSession, job_id: str) -> List[Candidate]:
    result = await db.execute(select(Candidate).filter(Candidate.job_id == job_id))
    return result.scalars().first()


async def get_candidate_by_id(db: AsyncSession, candidate_id: str):
    result = await db.execute(select(Candidate).filter(Candidate.id == candidate_id))
    return result.scalars().first()


async def create_candidate_application(
    db: AsyncSession, candidate_data: ApplicationPayload, resume_url: str, job_id: str
) -> Candidate:
    db_candidate = Candidate(
        name=candidate_data.applicant_name,
        email=candidate_data.applicant_email,
        years_of_experience=candidate_data.years_of_experience,
        resume_url=resume_url,
        job_id=job_id,
    )
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    return db_candidate


async def update_candidate_application(
    db: AsyncSession, candidate: Candidate, update_data: Dict[str, Any]
):
    for key, value in update_data.items():
        setattr(candidate, key, value)

    db.add(candidate)
    await db.commit()
    await db.refresh()
    return candidate
