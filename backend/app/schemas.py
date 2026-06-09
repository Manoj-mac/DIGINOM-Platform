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