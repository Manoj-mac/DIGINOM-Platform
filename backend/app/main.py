from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.auth import router as auth_router
from app.dependencies import verify_token
from app.user_routes import router as user_router

from app.database import SessionLocal
from app.schemas import EmployeeCreate, EmployeeUpdate
from app.crud import (
    create_employee,
    get_employees,
    get_employee_by_id,
    update_employee,
    delete_employee
)

app = FastAPI()

app.include_router(auth_router)
app.include_router(user_router)

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
def list_employees(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
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

@app.get("/employees/{employee_id}")
def get_employee(
    employee_id: str,
    db: Session = Depends(get_db)
):
    employee = get_employee_by_id(db, employee_id)

    if not employee:
        return {"message": "Employee not found"}

    return {
        "employee_id": str(employee.employee_id),
        "diginom_id": employee.diginom_id,
        "first_name": employee.first_name,
        "last_name": employee.last_name,
        "email": employee.email
    }

@app.put("/employees/{employee_id}")
def edit_employee(
    employee_id: str,
    employee: EmployeeUpdate,
    db: Session = Depends(get_db)
):
    updated_employee = update_employee(
        db,
        employee_id,
        employee
    )

    if not updated_employee:
        return {"message": "Employee not found"}

    return {
        "employee_id": str(updated_employee.employee_id),
        "diginom_id": updated_employee.diginom_id,
        "first_name": updated_employee.first_name,
        "email": updated_employee.email
    }

@app.delete("/employees/{employee_id}")
def remove_employee(
    employee_id: str,
    db: Session = Depends(get_db)
):
    result = delete_employee(db, employee_id)

    if not result:
        return {"message": "Employee not found"}

    return result