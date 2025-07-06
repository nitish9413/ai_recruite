from typing import Optional
from pydantic import EmailStr
from datetime import datetime
from pydantic.config import ConfigDict
import enum
from pydantic import BaseModel, Field


class JobType(str, enum.Enum):
    "JOB type"

    FULL_TIME = "Full-time"
    PART_TIME = "Part-time"
    CONTRACT = "Contract"
    INTERNSHIP = "Internship"


class JobStatus(str, enum.Enum):
    OPEN = "Open"
    CLOSED = "Closed"
    INTERVIEWING = "Interviewing"


class JobBase(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)

    id: str = Field(..., description="Unique identifier for the job")
    title: str = Field(
        ..., min_length=3, max_length=100, description="The title of the job position"
    )
    company_name: str = Field(
        ..., alias="companyName", description="Name of the company hiring"
    )
    description:str =Field(...,description="Job description")
    location: str = Field(
        ..., description="The physical or remote location for the job"
    )
    type: JobType = Field(..., description="The employment type for the job")
    status: JobStatus = Field(..., description="The current status of the job posting")
    posted_date: datetime = Field(
        ..., alias="postedDate", description="The IST data and time the job was posted"
    )


class Job(JobBase):
    pass


class JobDetails(JobBase):
    description: str = Field(
        ..., description="The full,detailed description of the job"
    )
    responsibilities: list[str] = Field(
        ..., description="A list of key responsibilities"
    )
    qualifications: list[str] = Field(
        ..., description="A list of required or preferred qualifications"
    )


class Candidate(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)

    id: str = Field(..., description="Unique identifier for the candidate")
    name: str = Field(..., description="The candidate's full name")
    email: EmailStr = Field(..., description="The candidate's full name")
    application_date: datetime = Field(
        ..., alias="applocationDate", description="When the candidate applied"
    )
    years_of_experience:int =Field(
        ...,alias="yearsOfExperience",ge=0,description="Candidate's experience in years"
    )
    resume_url: str = Field(
        ..., alias="resumeUrl", description="A URL to the canidate's stored resume"
    )
    match_score: int = Field(
        ...,
        alias="matchScore",
        ge=0,  # Must be greater than or equal to 0
        le=100,  # Must be less than or equal to 100
        description="The AI-generated match score from 0 to 100",
    )
    ai_assessment: str = Field(
        ...,
        alias="aiAssessment",
        description="A short summary from the AI about the candidate's fit",
    )


class CreateJobPayload(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    title: str = Field(
        ..., min_length=3, max_length=100, description="The title for the new job"
    )
    description: str = Field(
        ..., description="The full job description to be preocessed by the AI"
    )
    company_name: str = Field(..., description="Name of the company")
    location: str = Field(..., description="Job location")
    type: JobType = Field(..., description="Employment type")
    description: str = Field(..., description="Full job description text")
    responsiblities: list[str] = Field(
        default_factory=list, description="List of responsibilities"
    )
    qualification: list[str] = Field(
        default_factory=list, description="List of qualifications"
    )
    required_skills: list[str] = Field(
        ..., alias="requiredSkills", min_length=1, description="List of required skills"
    )


class ApplicationPayload(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    applicant_name: str = Field(
        ..., alias="applicantName", description="The applicant's full name"
    )
    applicant_email: EmailStr = Field(
        ..., alias="applicantEmail", description="The applicant's email"
    )
    years_of_experience: int = Field(
        ...,
        alias="yearsOfExperience",
        ge=0,
        description="Applicant's stated years of experience",
    )


class PatchCandidatePayload(BaseModel):
    """
    Payload for partially updating a Candidate.
    All fields are optional, allowing the client to send only the data they wish to change.
    """
    name: Optional[str] = Field(None, description="The new name of the applicant")

    email: Optional[EmailStr] = Field(None, description="The new email of the applicant")

    years_of_experience: Optional[int] = Field(
        None, 
        alias="yearsOfExperience",
        ge=0, 
        description="The updated years of experience"
    )

    match_score: Optional[int] = Field(
        None, 
        alias="matchScore",
        ge=0, 
        le=100, 
        description="The updated AI-generated match score"
    )

    ai_assessment: Optional[str] = Field(
        None,
        alias="aiAssessment",
        description="The updated AI summary"
    )

    model_config = ConfigDict(populate_by_name=True)