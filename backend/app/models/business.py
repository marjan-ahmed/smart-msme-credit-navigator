from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class TransactionBase(BaseModel):
    date: datetime
    amount: float
    description: str
    type: str  # "income" or "expense"

class Transaction(TransactionBase):
    id: int
    user_id: int
    category: Optional[str] = None
    
    class Config:
        from_attributes = True

class CreditScore(BaseModel):
    score: int
    factors: dict
    recommendations: List[str]
    potential_score: int

class FileUpload(BaseModel):
    id: str
    filename: str
    status: str
    uploaded_at: datetime
