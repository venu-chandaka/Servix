import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class RepairReport(Base):
    __tablename__ = "repair_reports"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    booking_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("bookings.id"),
        unique=True,
    )

    actual_issue: Mapped[str] = mapped_column(Text)

    repair_steps: Mapped[str] = mapped_column(Text)

    parts_used: Mapped[str] = mapped_column(Text)

    verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    completed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    booking = relationship(
        "Booking",
        back_populates="repair_report",
    )