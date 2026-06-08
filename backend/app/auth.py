from fastapi import APIRouter
from app.security import create_access_token

router = APIRouter()


@router.post("/login")
def login():

    token = create_access_token(
        {"sub": "admin@diginom.com"}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }