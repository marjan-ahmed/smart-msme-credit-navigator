from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, UserLogin
from app.core.database import get_db
from app.core.auth_utils import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/login")
async def login(data: UserLogin):
    db = get_db()
    user = await db.users.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user["_id"]), "email": user["email"]})
    return {
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "type": user["type"]
        }
    }

@router.post("/signup")
async def signup(data: UserCreate):
    db = get_db()
    existing = await db.users.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = {
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password),
        "type": data.type
    }
    result = await db.users.insert_one(new_user)
    user_id = str(result.inserted_id)

    token = create_access_token({"sub": user_id, "email": data.email})
    return {
        "token": token,
        "user": {
            "id": user_id,
            "name": data.name,
            "email": data.email,
            "type": data.type
        }
    }
