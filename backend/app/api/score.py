from fastapi import APIRouter, UploadFile, File, HTTPException
from app.core.database import get_db
from app.services.credit_score import credit_score_service
import uuid, shutil, os

router = APIRouter()
UPLOAD_DIR = "/tmp/msme_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    db = get_db()
    file_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{file_id}_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    await db.files.insert_one({
        "fileId": file_id,
        "filename": file.filename,
        "path": file_path,
        "status": "processing"
    })
    return {"fileId": file_id, "status": "processing"}

@router.post("/score")
async def get_score(body: dict):
    db = get_db()
    file_id = body.get("fileId")
    if not file_id:
        raise HTTPException(status_code=400, detail="fileId is required")

    file_doc = await db.files.find_one({"fileId": file_id})
    if not file_doc:
        raise HTTPException(status_code=404, detail="File not found")

    result = credit_score_service.process_file(file_doc["path"], file_doc["filename"])

    await db.scores.insert_one({"fileId": file_id, **result})
    await db.files.update_one({"fileId": file_id}, {"$set": {"status": "completed"}})
    return result

@router.get("/transactions")
async def get_transactions():
    db = get_db()
    transactions = await db.transactions.find().to_list(100)
    for t in transactions:
        t["id"] = str(t.pop("_id"))
    return {"transactions": transactions}

@router.get("/user/profile")
async def get_profile():
    return {
        "user": {"id": "demo", "name": "Demo User", "email": "segademo@gmail.com", "type": "sme"},
        "score": {"score": 85, "factors": {}}
    }
