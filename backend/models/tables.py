from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Enum as SQLAlchemyEnum,
    ForeignKey,
    Text,
)
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from core.database import Base
from models.schemas import JobType, JobStatus


def generate_uuid():
    return str(uuid.uuid4())


class Job(Base):
    __tablename__ = "jobs"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False, index=True)
    company_name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    type = Column(SQLAlchemyEnum(JobType), nullable=False)
    status = Column(SQLAlchemyEnum(JobStatus), nullable=False)
    posted_date = Column(DateTime, nullable=False)

    description = Column(Text, nullable=False)
    responsibilities = Column(Text, nullable=False)
    qualifications = Column(Text, nullable=False)

    candidates = relationship("Candidate", back_populates="job")


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    application_date = Column(DateTime, nullable=False)
    resume_url = Column(String, nullable=False)
    match_score = Column(Integer)
    ai_assessment = Column(Text)

    job_id = Column(String, ForeignKey("jobs.id"), nullable=False)

    job = relationship("Job", back_populates="candidates")
