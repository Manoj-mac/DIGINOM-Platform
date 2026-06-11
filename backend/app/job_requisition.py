from sqlalchemy import Column, String, TIMESTAMP, Integer, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base

class JobRequisition(Base):
    __tablename__ = "Job_Requisitions"

    job_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    recruiter_email = Column(String(255))
    job_title = Column(String(255))
    required_skill = Column(String(255))
    minimum_experience = Column(Numeric(5,2))
    openings = Column(Integer)
    status = Column(String(50))

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )