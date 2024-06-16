from fastapi import APIRouter, Depends, HTTPException, Request
from datetime import datetime
import time
from fastapi import FastAPI
from dto import schemas

app = APIRouter(
    prefix="/api/v1",
    tags=["generative_ai_api"]
)

@app.get("/healthz")
async def health_check():
    return {"status": "true"}

@app.post("/gemini/chat_response")
async def get_response_data(prompt_input: schemas.ChatSchemaClass):                                                                                                                                                              
    try:
        start = time.time()
        end = time.time()
        return {
            "status": "success",
            "data": "YES",
            "time": (end - start) * 1000
        }
    except Exception as e:
        raise HTTPException(status_code = 500, detail='Failed to get the response data')
