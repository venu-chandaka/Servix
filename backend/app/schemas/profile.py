from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.models.enums import UserRole


class ProfileCreate(BaseModel):
    clerk_user_id: str
    full_name: str
    email: EmailStr
    phone: str | None = None
    role: UserRole


class ProfileResponse(BaseModel):
    id: UUID
    clerk_user_id: str
    full_name: str
    email: EmailStr
    phone: str | None
    role: UserRole
    created_at: datetime

    model_config = {
        "from_attributes": True
    }