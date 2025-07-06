from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    BACKEND_CORS_ORIGINS : list[str] = [
        # "http://localhost:3000",
        # "http://127.0.0.1:3000",
        # "http://192.168.1.15:3000"
        # "http://localhost:3001",
        # "http://127.0.0.1:3001",
        # "http://192.168.1.15:3001"
        "*"
    ]
    class Config:
        case_sensitive = True

settings = Settings()