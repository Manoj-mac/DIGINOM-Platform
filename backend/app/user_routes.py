from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas import UserRegister
from app.user_crud import create_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register_user(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    new_user = create_user(
        db,
        user.username,
        user.email,
        user.password
    )

    return {
        "message": "User registered successfully",
        "username": new_user.username,
        "email": new_user.email
    }