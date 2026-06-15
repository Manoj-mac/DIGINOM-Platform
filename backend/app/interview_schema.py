from pydantic import BaseModel


class InterviewCreate(BaseModel):
    employee_id: str
    job_id: str
    interview_date: str
    interview_type: str


class InterviewUpdate(BaseModel):
    status: str
    feedback: str