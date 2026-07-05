import uuid
from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    func,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base
from app.models.enums import TechnicianSpecialization


class Technician(Base):
    __tablename__ = "technicians"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("profiles.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    specialization: Mapped[TechnicianSpecialization] = mapped_column(
        Enum(TechnicianSpecialization, name="technician_specialization"),
        nullable=False,
    )

    experience: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    rating: Mapped[float] = mapped_column(
        Float,
        default=5.0,
    )

    is_available: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    latitude: Mapped[float | None] = mapped_column(Float)

    longitude: Mapped[float | None] = mapped_column(Float)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    profile = relationship(
        "Profile",
        back_populates="technician",
    )

    bookings = relationship(
        "Booking",
        back_populates="technician",
    )