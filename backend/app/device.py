from sqlalchemy import (
    Column,
    String,
    Boolean,
    DateTime,
    ForeignKey
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.database import Base


class Device(Base):

    __tablename__ = "devices"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    employee_id = Column(
        UUID(as_uuid=True),
        ForeignKey("employees.id", ondelete="CASCADE"),
        nullable=False
    )

    device_uuid = Column(
        String,
        nullable=False,
        unique=True
    )

    device_name = Column(
        String,
        nullable=False
    )

    operating_system = Column(
        String,
        nullable=False
    )

    browser = Column(
        String,
        nullable=False
    )

    ip_address = Column(
        String,
        nullable=True
    )

    status = Column(
        String,
        default="ACTIVE"
    )

    is_primary = Column(
        Boolean,
        default=False
    )

    last_login = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )