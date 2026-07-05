from app.models.home import Home
from app.repositories.home_repository import HomeRepository


class HomeService:

    @staticmethod
    async def create_home(db, data, owner_id):
        home = Home(
            owner_id=owner_id,
            **data.model_dump()
        )

        return await HomeRepository.create(
            db,
            home
        )

    @staticmethod
    async def get_all_homes(db):
        return await HomeRepository.get_all(db)

    @staticmethod
    async def get_home(db, home_id):
        return await HomeRepository.get_by_id(
            db,
            home_id
        )

    @staticmethod
    async def delete_home(db, home):
        await HomeRepository.delete(
            db,
            home
        )