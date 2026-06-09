from sqlalchemy.orm import Session
from app.users import User
from app.security import hash_password


def create_user(
    db: Session,
    username: str,
    email: str,
    password: str
):
    hashed_password = hash_password(password)

    user = User(
        username=username,
        email=email,
        password=hashed_password,
        role="user"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user