from sqlalchemy.ext.asyncio import AsyncSession

from app.models.profile import Profile


class ProfileRepository:

    @staticmethod
    async def create(
        db: AsyncSession,
        profile: Profile
    ):
        db.add(profile)
        await db.commit()
        await db.refresh(profile)
        return profile