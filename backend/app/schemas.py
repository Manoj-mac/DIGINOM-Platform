from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    diginom_id: str
    first_name: str
    last_name: str
    email: str

class EmployeeUpdate(BaseModel):
    first_name: str
    email: str