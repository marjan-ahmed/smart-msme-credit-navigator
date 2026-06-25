import pandas as pd
import pytesseract
from PIL import Image
import re
import os

class CreditScoreService:

    def process_file(self, file_path: str, filename: str) -> dict:
        ext = filename.lower().split(".")[-1]
        try:
            if ext in ["jpg", "jpeg", "png"]:
                transactions = self._ocr_extract(file_path)
            elif ext == "csv":
                transactions = self._csv_extract(file_path)
            elif ext in ["xlsx", "xls"]:
                transactions = self._excel_extract(file_path)
            elif ext == "txt":
                transactions = self._whatsapp_extract(file_path)
            else:
                transactions = []
        except Exception as e:
            print(f"File processing error: {e}")
            transactions = []

        return self.calculate_score(transactions)

    def _ocr_extract(self, path: str):
        image = Image.open(path)
        text = pytesseract.image_to_string(image)
        amounts = re.findall(r'\b\d+[\.,]\d{2}\b', text)
        return [{"amount": float(a.replace(",", ".")), "type": "income", "description": "OCR extracted", "date": ""} for a in amounts]

    def _csv_extract(self, path: str):
        df = pd.read_csv(path)
        df.columns = [c.lower().strip() for c in df.columns]
        transactions = []
        for _, row in df.iterrows():
            transactions.append({
                "amount": float(row.get("amount", 0) or 0),
                "type": str(row.get("type", "income")).lower(),
                "description": str(row.get("description", "")),
                "date": str(row.get("date", ""))
            })
        return transactions

    def _excel_extract(self, path: str):
        df = pd.read_excel(path)
        df.columns = [c.lower().strip() for c in df.columns]
        transactions = []
        for _, row in df.iterrows():
            transactions.append({
                "amount": float(row.get("amount", 0) or 0),
                "type": str(row.get("type", "income")).lower(),
                "description": str(row.get("description", "")),
                "date": str(row.get("date", ""))
            })
        return transactions

    def _whatsapp_extract(self, path: str):
        transactions = []
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                amounts = re.findall(r'Rs\.?\s*(\d+(?:,\d+)*(?:\.\d{2})?)', line, re.IGNORECASE)
                for amt in amounts:
                    transactions.append({
                        "amount": float(amt.replace(",", "")),
                        "type": "income",
                        "description": line.strip()[:100],
                        "date": ""
                    })
        return transactions

    def calculate_score(self, transactions: list) -> dict:
        if not transactions:
            return self._empty_score()

        incomes = [t["amount"] for t in transactions if t.get("type") == "income"]
        expenses = [t["amount"] for t in transactions if t.get("type") == "expense"]

        total_income = sum(incomes) or 1
        total_expense = sum(expenses) or 0

        cash_flow_score = min(100, len(incomes) * 10)
        revenue_score = min(100, (total_income / 10000) * 100)
        ratio = total_income / (total_expense + 1)
        expense_score = min(100, ratio * 20)
        longevity_score = 60
        digital_score = min(100, len(transactions) * 5)

        final_score = round(
            cash_flow_score * 0.35 +
            revenue_score * 0.25 +
            expense_score * 0.20 +
            longevity_score * 0.10 +
            digital_score * 0.10, 1
        )

        recommendations = []
        if cash_flow_score < 60:
            recommendations.append("Record transactions more frequently to show consistent cash flow")
        if expense_score < 60:
            recommendations.append("Reduce expenses to improve your income-to-expense ratio")
        if digital_score < 60:
            recommendations.append("Digitize more business transactions to improve your digital footprint")
        if not recommendations:
            recommendations.append("Keep maintaining your excellent financial habits!")

        return {
            "score": final_score,
            "factors": {
                "cash_flow": {"score": cash_flow_score, "weight": 0.35, "name": "Cash Flow Regularity"},
                "revenue_trend": {"score": revenue_score, "weight": 0.25, "name": "Revenue Trend"},
                "expense_management": {"score": expense_score, "weight": 0.20, "name": "Expense Management"},
                "longevity": {"score": longevity_score, "weight": 0.10, "name": "Business Longevity"},
                "digital_footprint": {"score": digital_score, "weight": 0.10, "name": "Digital Footprint"},
            },
            "recommendations": recommendations,
            "potential_score": min(100, round(final_score + 15, 1))
        }

    def _empty_score(self):
        return {
            "score": 0,
            "factors": {},
            "recommendations": ["Upload valid transaction data (CSV, Excel, image, or WhatsApp export) to generate a score"],
            "potential_score": 50
        }

credit_score_service = CreditScoreService()
