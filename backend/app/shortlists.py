from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class Shortlist(Base):
    __tablename__ = "Shortlists"

    shortlist_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    recruiter_email = Column(String(255))
    employee_id = Column(String(255))

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )