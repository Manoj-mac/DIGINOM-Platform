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

class SkillCreate(BaseModel):
    employee_id: str
    skill_name: str
    skill_level: str


class SkillUpdate(BaseModel):
    skill_name: str
    skill_level: str
    verified: bool

class CertificationCreate(BaseModel):
    employee_id: str
    certification_name: str
    issuer: str
    issue_date: str
    expiry_date: str | None = None


class CertificationUpdate(BaseModel):
    certification_name: str
    issuer: str
    issue_date: str
    expiry_date: str | None = None
    verified: bool

class DocumentCreate(BaseModel):
    employee_id: str
    document_name: str
    document_type: str
    file_path: str


class DocumentUpdate(BaseModel):
    document_name: str
    document_type: str
    file_path: str
    verified: bool