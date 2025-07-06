from api.v1.api import api_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

app: FastAPI = FastAPI(title="Job Portal")

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router,prefix="/v1")


@app.get("/")
def read_root():
    return {"Hello": "World"}
