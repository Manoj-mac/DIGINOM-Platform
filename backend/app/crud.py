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

    return db_employee