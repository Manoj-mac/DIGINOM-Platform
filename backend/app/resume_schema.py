from pydantic import BaseModel


class ResumeResponse(BaseModel):

    name: str
    email: str
    phone: str
    skills: list