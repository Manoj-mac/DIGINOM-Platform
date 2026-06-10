from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class VerificationRequest(Base):
    __tablename__ = "Verification_Requests"

    verification_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    employee_id = Column(String(255))
    verification_type = Column(String(100))
    entity_id = Column(String(255))
    requested_by = Column(String(255))

    status = Column(
        String(50),
        server_default=text("'PENDING'")
    )

    verified_by = Column(String(255))

    verified_at = Column(TIMESTAMP)