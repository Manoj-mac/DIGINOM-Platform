from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class AuditLog(Base):
    __tablename__ = "Audit_logs"

    audit_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    user_email = Column(String(255))
    action = Column(String(100))
    entity_type = Column(String(100))
    entity_id = Column(String(255))
    created_at = Column(
    TIMESTAMP,
    server_default=text("CURRENT_TIMESTAMP")
)