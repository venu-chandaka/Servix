from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.db.database import engine, Base

# Import ALL your models here
from app.models.profile import Profile
from app.models.home import Home
from app.models.technician import Technician
from app.models.booking import Booking
from app.models.diagnosis import Diagnosis
from app.models.repair_report import RepairReport


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root():
    return {"message": "Hello"}