from fastapi import APIRouter
from app.services.fortune_services import find_fortune

router = APIRouter()

@router.get("/fortune")
async def get_fortune():
    return {"fortune": find_fortune()}