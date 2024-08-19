from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi import FastAPI
from typing import List
import uvicorn

from dl_models.summerized import Summerized_Text
from dl_models.compare import compare

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StrRequest(BaseModel):
    text: str


class CompareRequest(BaseModel):
    summary: str
    text: str


@app.get("/api/check")
def check_connection():
    try:
        return JSONResponse(
            {"status": 200, "message": "Message Successfully Sent"}, status_code=200
        )
    except Exception as e:
        print("Error => ", e)
        return JSONResponse({"status": 500, "message": str(e)}, status_code=500)


@app.post("/api/summerized")
async def get_summerized(request: StrRequest):
    try:
        print(request)
        text = request.text
        if not text:
            return JSONResponse(
                {"status": 422, "message": "Invalid Input"}, status_code=422
            )
        summary = Summerized_Text(text)
        if "No abstract text." in summary:
            return JSONResponse(
                {"status": 500, "message": "No matching text found", "data": "None"}
            )
            
        if not summary:
            return JSONResponse(
                {"status": 500, "message": "No matching text found", "data": {}}
            )

        return JSONResponse(
            {"status": 200, "message": "Matching text found", "data": summary}
        )

    except Exception as e:
        print("Error => ", e)
        return JSONResponse({"status": 500, "message": str(e)}, status_code=500)


@app.post("/api/compare")
def compareTexts(request: CompareRequest):
    try:
        text = request.text
        summary = request.summary
        if not summary or not text:
            return JSONResponse(
                {"status": 422, "message": "Invalid Input"}, status_code=422
            )
        value = compare(text, summary)
        return JSONResponse(
            {
                "status": 200,
                "message": "Comparisons made",
                "value": value,
                "text": text,
                "summary": summary,
            }
        )
    except Exception as e:
        print("Error => ", e)
        return JSONResponse({"status": 500, "message": str(e)}, status_code=500)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=4000)
