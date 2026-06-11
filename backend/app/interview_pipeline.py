from sqlalchemy import Column, String, Text, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text
from app.database import Base

class InterviewPipeline(Base):
    __tablename__ = "Interview_Pipeline"

    pipeline_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    employee_id = Column(String(255))
    recruiter_email = Column(String(255))
    stage = Column(String(50))
    remarks = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )