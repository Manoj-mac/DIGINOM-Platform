from pydantic import BaseModel


class EmployeeCreate(BaseModel):
    first_name: str
    last_name: str
    email: str


class EmployeeUpdate(BaseModel):
    first_name: str
    email: str


class UserRegister(BaseModel):
    username: str
    email: str
    password: str
class UserLogin(BaseModel):
    email: str
    password: str
class CompanyCreate(BaseModel):
    company_name: str
    email: str
    phone: str
    website: str
    address: str
    city: str
    state: str
    country: str


class CompanyUpdate(BaseModel):
    company_name: str
    email: str
    phone: str
    website: str
    address: str
    city: str
    state: str
    country: str
    status: str

class EmploymentHistoryCreate(BaseModel):
    employee_id: str
    company_id: str
    role: str
    start_date: str
    end_date: str | None = None
    status: str


class EmploymentHistoryUpdate(BaseModel):
    role: str
    end_date: str | None = None
    status: str