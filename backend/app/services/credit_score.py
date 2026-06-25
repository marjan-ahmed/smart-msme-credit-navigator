from typing import Dict, List
import random

class CreditScoreService:
    """Service for calculating credit scores based on 5 factors"""
    
    FACTORS = {
        "cash_flow": {"weight": 0.35, "name": "Cash Flow Regularity"},
        "revenue_trend": {"weight": 0.25, "name": "Revenue Trend"},
        "expense_management": {"weight": 0.20, "name": "Expense Management"},
        "longevity": {"weight": 0.10, "name": "Business Longevity"},
        "digital_footprint": {"weight": 0.10, "name": "Digital Footprint"}
    }
    
    def calculate_score(self, transactions: List[dict]) -> Dict:
        """Calculate credit score from transaction data"""
        # Placeholder implementation - Saad will implement real logic
        factors = {}
        total_score = 0
        
        for factor_key, factor_info in self.FACTORS.items():
            # Simulated score for demo
            factor_score = random.randint(60, 95)
            factors[factor_key] = {
                "name": factor_info["name"],
                "score": factor_score,
                "weight": factor_info["weight"],
                "weighted_score": factor_score * factor_info["weight"]
            }
            total_score += factor_score * factor_info["weight"]
        
        return {
            "score": int(total_score),
            "factors": factors,
            "recommendations": [
                "Maintain consistent cash flow patterns",
                "Consider digitizing more transactions",
                "Build longer business history"
            ],
            "potential_score": min(100, int(total_score * 1.15))
        }

credit_score_service = CreditScoreService()
