from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.home import Home


class HomeRepository:

    @staticmethod
    async def create(db: AsyncSession, home: Home):
        db.add(home)
        await db.commit()
        await db.refresh(home)
        return home

    @staticmethod
    async def get_all(db: AsyncSession):
        result = await db.execute(select(Home))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(db: AsyncSession, home_id):
        result = await db.execute(
            select(Home).where(Home.id == home_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def delete(db: AsyncSession, home: Home):
        await db.delete(home)
        await db.commit()