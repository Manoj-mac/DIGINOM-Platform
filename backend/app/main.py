from fastapi import FastAPI
from app.schemas import EmployeeCreate

app = FastAPI()

@app.get("/")
def home():
    return {
        "project": "DIGINOM",
        "status": "Backend Running"
    }

@app.post("/employees")
def create_employee(employee: EmployeeCreate):
    return {
        "message": "Employee Created",
        "data": employee
    }