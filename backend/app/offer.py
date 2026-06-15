from sqlalchemy import (
    Column,
    String,
    Date,
    Numeric,
    TIMESTAMP
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class Offer(Base):

    __tablename__ = "Offers"

    offer_id = Column(
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

    offered_salary = Column(
        Numeric(10, 2)
    )

    joining_date = Column(
        Date
    )

    status = Column(
        String(50)
    )

    created_at = Column(
        TIMESTAMP,
        server_default=text(
            "CURRENT_TIMESTAMP"
        )
    )