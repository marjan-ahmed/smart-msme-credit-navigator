from pydantic import BaseModel
from typing import List, Optional

class Transaction(BaseModel):
    id: str
    date: str
    amount: float
    description: str
    type: str
    category: str

class FactorScore(BaseModel):
    score: float
    weight: float
    name: str

class CreditScore(BaseModel):
    score: float
    factors: dict
    recommendations: List[str]
    potential_score: float

class FileUpload(BaseModel):
    fileId: str
    status: str
