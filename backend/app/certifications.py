from sqlalchemy import Column, String, Boolean, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class Certification(Base):
    __tablename__ = "Certifications"

    certification_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    employee_id = Column(String(255))
    certification_name = Column(String(255))
    issuer = Column(String(255))
    issue_date = Column(Date)
    expiry_date = Column(Date)
    verified = Column(Boolean, default=False)