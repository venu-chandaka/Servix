from uuid import UUID

from pydantic import BaseModel

from app.models.enums import BookingStatus


class BookingCreate(BaseModel):
    home_id: UUID
    issue_title: str
    issue_description: str


class BookingResponse(BaseModel):
    id: UUID
    status: BookingStatus

    model_config = {
        "from_attributes": True
    }