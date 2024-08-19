from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, HTTPException
import uvicorn
from typing import List

from drive_db.drive_db import main
from controllers.controllers import push_file_db
from controllers.controllers import extract_text_url

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

global service


@app.get("/api/check")
def check_working():
    try:
        return JSONResponse(
            {"status": 200, "message": "Server is working fine", "data": None},
            status_code=200,
        )
    except Exception as e:
        return JSONResponse(
            {"status": 500, "message": "Server is not working", "error": e},
        )


@app.post("/api/save-docs")
async def save_docs(file: UploadFile = File(...)):
    try:
        print(file.filename)
        file_id, extracted_text, status = await push_file_db(service, file)
        if not file_id:
            return JSONResponse(
                {"status": 500, "message": status, "data": None}, status_code=500
            )
        print(file_id)
        return JSONResponse(
            {
                "status": 200,
                "message": "Document saved successfully",
                "data": {
                    "file_id": file_id,
                    "extracted_text": extracted_text,
                    "title": file.filename,
                },
            },
            status_code=200,
        )
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({"status": 500, "message": str(e)}, status_code=500)


@app.post("/api/get-abstract")
async def get_abstract(file: UploadFile = File(...)):
    try:
        print(file.filename)
        extracted_text, status = await extract_text_url(file)
        if not extracted_text:
            return JSONResponse(
                {"status": 500, "message": status, "data": None}, status_code=500
            )
        return JSONResponse(
            {
                "status": 200,
                "message": "Document saved successfully",
                "data": {"extracted_text": extracted_text, "title": file.filename},
            },
            status_code=200,
        )
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({"status": 500, "message": str(e)}, status_code=500)

class DeleteRequest(BaseModel):
    _id: List[str]

@app.post("/api/delete-report")
async def delete_report(req: DeleteRequest):
    print(req._id) 
    try:
        delete_result = delete_reports_by_ids(req._id)
        return {"message": "Deleted successfully", "deleted_ids": req._id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting reports: {str(e)}")

def delete_reports_by_ids(ids: List[str]):
    print(f"Deleting reports with IDs: {ids}")
    return True

if __name__ == "__main__":
    service = main()
    uvicorn.run(app, host="127.0.0.1", port=5000)
