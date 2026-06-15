from pydantic import BaseModel


class OfferCreate(BaseModel):

    employee_id: str
    job_id: str
    offered_salary: float
    joining_date: str


class OfferUpdate(BaseModel):

    status: str