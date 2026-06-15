from sqlalchemy import (
    Column,
    String,
    Date,
    Text,
    TIMESTAMP
)

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy import text

from app.database import Base


class Interview(Base):

    __tablename__ = "Interviews"

    interview_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text(
            "gen_random_uuid()"
        )
    )

    employee_id = Column(
        UUID(as_uuid=True)
    )

    job_id = Column(
        UUID(as_uuid=True)
    )

    interviewer_email = Column(
        String(255)
    )

    interview_date = Column(
        Date
    )

    interview_type = Column(
        String(100)
    )

    status = Column(
        String(50)
    )

    feedback = Column(
        Text
    )

    created_at = Column(
        TIMESTAMP,
        server_default=text(
            "CURRENT_TIMESTAMP"
        )
    )