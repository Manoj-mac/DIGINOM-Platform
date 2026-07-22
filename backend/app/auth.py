from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.auth_crud import get_user_by_email
from app.security import (
    create_access_token,
    verify_password
)
from app.crud import get_employee_by_email


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):


    db_user = get_user_by_email(
        db,
        form_data.username
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    print("DB USER EMAIL:", db_user.email)

    employee = get_employee_by_email(
        db,
        db_user.email
    )

    print("EMPLOYEE:", employee)

    if employee:
        print("EMPLOYEE EMAIL:", employee.email)
        print("EMPLOYEE ID:", employee.employee_id)
    else:
        print("Employee not found!")

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": db_user.email,
            "role": db_user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user.role,
        "email": db_user.email,
        "username": db_user.username,
        "employee_id": str(employee.employee_id) if employee else None,
        "diginom_id": employee.diginom_id if employee else None
    }