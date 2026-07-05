from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class HomeCreate(BaseModel):
    home_name: str
    address: str
    city: str
    state: str
    pincode: str


class HomeResponse(BaseModel):
    id: UUID
    owner_id: UUID
    home_name: str
    address: str
    city: str
    state: str
    pincode: str
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }