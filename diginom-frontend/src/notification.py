import uuid

from sqlalchemy import (
    Column,
    String,
    Boolean,
    DateTime
)

from sqlalchemy.dialects.postgresql import UUID

from datetime import datetime

from app.database import Base


class Notification(Base):

    __tablename__ = "Notifications"

    notification_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_email = Column(
        String(255)
    )

    title = Column(
        String(255)
    )

    message = Column(
        String(1000)
    )

    is_read = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )