from fastapi import APIRouter
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/health")
async def health():
    logger.debug("Health check requested")
    return {"status": "ok"}