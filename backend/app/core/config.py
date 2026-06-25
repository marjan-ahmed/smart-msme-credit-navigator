from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "Smart MSME Credit Navigator API"
    DATABASE_URL: str = "sqlite:///./test.db"
    SECRET_KEY: str = "your-secret-key-here"
    FRONTEND_URL: str = "http://localhost:3000"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()
