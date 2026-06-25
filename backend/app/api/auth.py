from fastapi import APIRouter
from app.models.user import UserCreate, Token

router = APIRouter()

# In-memory storage (hackathon only)
users_db = {}

@router.post("/login")
async def login(credentials: dict):
    """Login endpoint - TODO: Implement actual auth"""
    return {"message": "Login endpoint placeholder", "token": "demo-token"}

@router.post("/signup")
async def signup(user: UserCreate):
    """Signup endpoint - TODO: Implement actual registration"""
    return {"message": "Signup endpoint placeholder", "token": "demo-token"}
