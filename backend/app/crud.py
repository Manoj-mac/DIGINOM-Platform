from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Employee
from app.employee_timeline_crud import (
    create_timeline_event
)
from app.notification_crud import (
    create_notification
)


def generate_diginom_id(db: Session):

    employees = db.query(Employee).all()

    max_number = 0

    for employee in employees:

        try:
            number = int(
                employee.diginom_id.split("-")[-1]
            )

            if number > max_number:
                max_number = number

        except:
            pass

    next_number = max_number + 1
    print("NEW DIGINOM ID:", next_number)

    return f"DGN-IND-2026-{next_number:06d}"
    

    latest_employee = (
        db.query(Employee)
        .order_by(Employee.diginom_id.desc())
        .first()
    )

    if not latest_employee:
        return "DGN-IND-2026-000001"

    last_number = int(
        latest_employee.diginom_id.split("-")[-1]
    )

    next_number = last_number + 1

    return (
        f"DGN-IND-2026-{next_number:06d}"
    )
def create_employee(db: Session, employee):

    diginom_id = generate_diginom_id(db)

    db_employee = Employee(
        diginom_id=diginom_id,
        first_name=employee.first_name,
        last_name=employee.last_name,
        email=employee.email
    )

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    create_notification(

    db,

    db_employee.email,

    "Welcome To DIGINOM",

    "Your employee profile has been created."
)

    create_timeline_event(

    db,

    str(
        db_employee.employee_id
    ),

    "EMPLOYEE_CREATED",

    "Employee profile created"
)

    return {
        "employee_id": str(db_employee.employee_id),
        "diginom_id": db_employee.diginom_id,
        "first_name": db_employee.first_name,
        "last_name": db_employee.last_name,
        "email": db_employee.email
    }


def get_employees(db: Session):
    return db.query(Employee).all()


def get_employee_by_id(db: Session, employee_id: str):
    return db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()
def get_employee_by_email(
    db: Session,
    email: str
):

    print("=" * 60)
    print("Searching Email :", repr(email))

    employees = db.query(Employee).all()

    print("Employees in Database:")

    for emp in employees:
        print(
            "DB Email:",
            repr(emp.email),
            "Employee ID:",
            emp.employee_id
        )

    employee = db.query(Employee).filter(
        func.lower(Employee.email) == email.lower()
    ).first()

    print("Matched Employee:", employee)
    print("=" * 60)

    return employee


def update_employee(db: Session, employee_id: str, employee_data):
    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

    if not employee:
        return None

    employee.first_name = employee_data.first_name
    employee.email = employee_data.email

    db.commit()
    db.refresh(employee)

    return employee


def delete_employee(db: Session, employee_id: str):
    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

    if not employee:
        return None

    db.delete(employee)
    db.commit()

    return {"message": "Employee deleted successfully"}