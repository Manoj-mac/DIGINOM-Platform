from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    employee_id: str
    diginom_id: str
    first_name: str
    last_name: str
    email: str