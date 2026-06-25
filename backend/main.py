from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.api.auth import router as auth_router
from app.api.score import router as score_router

load_dotenv()

app = FastAPI(
    title="Smart MSME Credit Navigator API",
    description="AI-powered credit scoring for Pakistani SMEs",
    version="0.1.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Smart MSME Credit Navigator API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Include API routers
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(score_router, prefix="/api", tags=["score"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
