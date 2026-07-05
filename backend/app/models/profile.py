import uuid
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import String, Enum, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base
from app.models.enums import UserRole


class Profile(Base):
    __tablename__ = "profiles"

    homes = relationship(
    "Home",
    back_populates="owner",
    cascade="all, delete-orphan"
)

    technician = relationship(
    "Technician",
    back_populates="profile",
    uselist=False,
    cascade="all, delete-orphan"
)

    bookings = relationship(
    "Booking",
    back_populates="customer"
)

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
   
    clerk_user_id: Mapped[str] = mapped_column(
        String,
        unique=True,
        nullable=False
    )

    full_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String,
        unique=True,
        nullable=False
    )

    phone: Mapped[str | None] = mapped_column(
        String(20)
    )

    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role"),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )