from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID

import uuid

from app.database import Base


class Resume(Base):

    __tablename__ = "Resumes"

    resume_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    file_name = Column(
        String,
        nullable=False
    )

    candidate_name = Column(
        String,
        nullable=True
    )

    email = Column(
        String,
        nullable=True
    )

    phone = Column(
        String,
        nullable=True
    )

    skills = Column(
        String,
        nullable=True
    )

    file_path = Column(
        String,
        nullable=False
    )