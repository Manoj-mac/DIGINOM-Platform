from sqlalchemy import (
    Column,
    String,
    Boolean,
    TIMESTAMP
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

from app.database import Base


class Document(Base):
    __tablename__ = "Documents"

    document_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    employee_id = Column(String(255))
    document_name = Column(String(255))
    document_type = Column(String(100))
    file_path = Column(String(500))

    uploaded_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

    verified = Column(
        Boolean,
        default=False
    )