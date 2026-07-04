import uuid
from datetime import datetime

from sqlalchemy import (
    String,
    Text,
    DateTime,
    ForeignKey,
    Enum,
    Numeric,
    func,
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.db.database import Base
from app.models.enums import BookingStatus


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    customer_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("profiles.id")
    )

    technician_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("technicians.id"),
        nullable=True
    )

    home_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("homes.id")
    )

    issue_title: Mapped[str] = mapped_column(
        String(200)
    )

    issue_description: Mapped[str] = mapped_column(
        Text
    )

    issue_image_url: Mapped[str | None] = mapped_column(
        String
    )

    status: Mapped[BookingStatus] = mapped_column(
        Enum(BookingStatus),
        default=BookingStatus.PENDING
    )

    estimated_cost: Mapped[float | None] = mapped_column(
        Numeric(10,2)
    )

    estimated_duration: Mapped[int | None] = mapped_column()

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    customer = relationship(
        "Profile",
        back_populates="bookings"
    )

    technician = relationship(
        "Technician",
        back_populates="bookings"
    )

    home = relationship(
        "Home",
        back_populates="bookings"
    )

    diagnosis = relationship(
        "Diagnosis",
        back_populates="booking",
        uselist=False
    )

    repair_report = relationship(
        "RepairReport",
        back_populates="booking",
        uselist=False
    )