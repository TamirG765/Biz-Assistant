import logging
import sys
from fastapi import FastAPI
from .core.settings import settings
from .api.health import router as health_router

logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO),
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger("app")

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        docs_url="/docs",
        redoc_url="/redoc",
    )
    app.include_router(health_router, prefix="")

    @app.get("/")
    async def root():
        logger.info("Root endpoint hit")
        return {"message": f"Welcome to {settings.APP_NAME}"}

    return app

app = create_app()