from app.models.profile import Profile
from app.repositories.profile_repository import ProfileRepository


class ProfileService:

    @staticmethod
    async def create_profile(db, data):
        profile = Profile(**data.model_dump())

        return await ProfileRepository.create(
            db,
            profile
        )