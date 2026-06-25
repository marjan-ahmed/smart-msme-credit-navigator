from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    type: str  # "sme" or "bank"

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    email: str
    type: str

class Token(BaseModel):
    token: str
    user: UserOut
