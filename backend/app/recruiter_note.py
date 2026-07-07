import uuid

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from sqlalchemy.dialects.postgresql import UUID

from datetime import datetime

from app.database import Base


class RecruiterNote(Base):

    __tablename__ = "RecruiterNotes"

    note_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    recruiter_email = Column(
        String(255),
        nullable=False
    )

    employee_id = Column(
        String(255),
        nullable=False
    )

    note = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )