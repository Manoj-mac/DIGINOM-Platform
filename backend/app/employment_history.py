from sqlalchemy import Column, String, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class EmploymentHistory(Base):
    __tablename__ = "Employment_History"

    history_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    employee_id = Column(String)
    company_id = Column(String)
    role = Column(String)
    start_date = Column(Date)
    end_date = Column(Date)
    status = Column(String)