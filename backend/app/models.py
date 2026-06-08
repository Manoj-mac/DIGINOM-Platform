from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Employee(Base):
    __tablename__ = "Employee"

    employee_id = Column(UUID(as_uuid=True), primary_key=True)

    diginom_id = Column(String(30), unique=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    email = Column(String(255), unique=True)

    mobile = Column(String(15))
    city = Column(String(100))
    state = Column(String(100))
    country = Column(String(100))

    photo_url = Column(String)
    status = Column(String(30))

    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)