from sqlalchemy.orm import Session
from app.models import Employee


def create_employee(db: Session, employee):
    db_employee = Employee(
        diginom_id=employee.diginom_id,
        first_name=employee.first_name,
        last_name=employee.last_name,
        email=employee.email
    )

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

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