from sqlalchemy import Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class Skill(Base):
    __tablename__ = "Skills"

    skill_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    employee_id = Column(String(255))
    skill_name = Column(String(255))
    skill_level = Column(String(50))
    verified = Column(Boolean, default=False)