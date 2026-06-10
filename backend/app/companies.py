from sqlalchemy import Column, String, Text, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class Company(Base):
    __tablename__ = "Companies"

    company_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    company_name = Column(String(255))
    email = Column(String(255))
    phone = Column(String(20))
    website = Column(String(255))
    address = Column(Text)
    city = Column(String(100))
    state = Column(String(100))
    country = Column(String(100))
    status = Column(String(30))
    created_at = Column(TIMESTAMP)