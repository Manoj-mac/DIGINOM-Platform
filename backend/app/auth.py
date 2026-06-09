from fastapi import APIRouter, Depends, HTTPException
print("AUTH.PY LOADED")
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas import UserLogin
from app.auth_crud import get_user_by_email
from app.security import (
    create_access_token,
    verify_password
)

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = get_user_by_email(
        db,
        user.email
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
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
        "token_type": "bearer"
    }
    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_match = verify_password(
        user.password,
        db_user.password
    )

    return {
        "email": db_user.email,
        "password_match": password_match
    }

    if not db_user:
        return {
            "error": "USER NOT FOUND",
            "email": user.email
        }

    return {
        "email_from_db": db_user.email,
        "password_hash": db_user.password
    }
@router.get("/check-password")
def check_password():
    from app.security import verify_password

    stored_hash = "$2b$12$LWPCebZ1d8lv/8uWi6KA3efOn3IQ8sfSVtOcAe4.le.cPRWOQUEMe"

    return {
        "test123": verify_password("test123", stored_hash),
        "Manoj@123": verify_password("Manoj@123", stored_hash)
    }

    return {"match": result}

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
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
        "token_type": "bearer"
    }
    if not password_ok:
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
        "token_type": "bearer"
    }