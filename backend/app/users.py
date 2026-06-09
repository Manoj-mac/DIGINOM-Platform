from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    username = Column(String(100), unique=True)
    email = Column(String(255), unique=True)
    password = Column(String(255))
    role = Column(String(50))