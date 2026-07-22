from sqlalchemy import (
    Column,
    String,
    Boolean,
    TIMESTAMP,
    ForeignKey,
    text
)

from sqlalchemy.dialects.postgresql import UUID

from app.database import Base


class Device(Base):

    __tablename__ = "Device"

    device_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    employee_id = Column(
        UUID(as_uuid=True),
        ForeignKey("Employee.employee_id")
    )

    device_uuid = Column(
        String(255),
        unique=True
    )

    device_name = Column(String(255))

    operating_system = Column(String(100))

    browser = Column(String(100))

    ip_address = Column(String(100))

    status = Column(
        String(30),
        default="ACTIVE"
    )

    is_primary = Column(
        Boolean,
        default=False
    )

    created_at = Column(TIMESTAMP)

    last_login = Column(TIMESTAMP)