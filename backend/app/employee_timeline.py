import uuid

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import DateTime

from sqlalchemy.dialects.postgresql import UUID

from datetime import datetime

from app.database import Base


class EmployeeTimeline(Base):
  
    __tablename__ = "EmployeeTimeline"

    timeline_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    employee_id = Column(
        String(255)
    )

    event_type = Column(
        String(100)
    )

    event_description = Column(
        String(500)
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )