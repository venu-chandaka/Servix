from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.schemas.profile import (
    ProfileCreate,
    ProfileResponse,
)
from app.services.profile_service import ProfileService

router = APIRouter(prefix="/profiles", tags=["Profiles"])


@router.post(
    "",
    response_model=ProfileResponse
)
async def create_profile(
    data: ProfileCreate,
    db: AsyncSession = Depends(get_db),
):
    return await ProfileService.create_profile(
        db,
        data
    )