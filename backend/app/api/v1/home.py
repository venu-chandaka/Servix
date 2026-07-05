from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.schemas.home import HomeCreate, HomeResponse
from app.services.home_service import HomeService

router = APIRouter(
    prefix="/homes",
    tags=["Homes"]
)

# Temporary owner_id until Clerk auth is integrated
TEMP_OWNER_ID = UUID("87a7cc41-6761-4d36-83e1-de828be579fd")


@router.post("", response_model=HomeResponse)
async def create_home(
    data: HomeCreate,
    db: AsyncSession = Depends(get_db)
):
    return await HomeService.create_home(
        db,
        data,
        TEMP_OWNER_ID
    )


@router.get("", response_model=list[HomeResponse])
async def get_homes(
    db: AsyncSession = Depends(get_db)
):
    return await HomeService.get_all_homes(db)


@router.get("/{home_id}", response_model=HomeResponse)
async def get_home(
    home_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    home = await HomeService.get_home(db, home_id)

    if not home:
        raise HTTPException(
            status_code=404,
            detail="Home not found"
        )

    return home


@router.delete("/{home_id}")
async def delete_home(
    home_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    home = await HomeService.get_home(db, home_id)

    if not home:
        raise HTTPException(
            status_code=404,
            detail="Home not found"
        )

    await HomeService.delete_home(db, home)

    return {
        "message": "Home deleted successfully"
    }