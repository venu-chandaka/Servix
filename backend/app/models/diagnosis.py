import uuid

from sqlalchemy import Float, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Diagnosis(Base):
    __tablename__ = "diagnoses"

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

    predicted_issue: Mapped[str] = mapped_column(Text)

    confidence: Mapped[float] = mapped_column(Float)

    severity: Mapped[str] = mapped_column()

    required_tools: Mapped[str] = mapped_column(Text)

    required_parts: Mapped[str] = mapped_column(Text)

    ai_summary: Mapped[str] = mapped_column(Text)

    booking = relationship(
        "Booking",
        back_populates="diagnosis",
    )