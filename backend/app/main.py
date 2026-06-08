from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas import EmployeeCreate
from app.crud import create_employee, get_employees

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/employees")
def add_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):
    return create_employee(db, employee)


@app.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    employees = get_employees(db)

    return [
        {
            "employee_id": str(emp.employee_id),
            "diginom_id": emp.diginom_id,
            "first_name": emp.first_name,
            "last_name": emp.last_name,
            "email": emp.email
        }
        for emp in employees
    ]