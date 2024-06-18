from fastapi import APIRouter, Depends, HTTPException, Request
from services.chatbot_service import ChatBotService
from datetime import datetime
import time
from fastapi import FastAPI
from dto import schemas

app = APIRouter(
    prefix="/api/v1",
    tags=["gemini-chatbot"]
)
chatbot = ChatBotService()

@app.get("/healthz")
async def health_check():
    return {"status": "true"}

@app.post("/chatbot/get-general-answer")
async def get_response_data(
    request:Request, 
    prompt_input: schemas.ChatbotInputSchema):                                                                                                                                                              
    try:
        start = time.time()
        response = chatbot.get_general_answer(prompt_input) 
        end = time.time()
        return {
            "status": True,
            "data": response,
            "time": (end - start) * 1000
        }
    except Exception as e:
        raise HTTPException(status_code = 500, detail='Failed to get the response data')


@app.post("/chatbot/get-advance-answer")
async def get_response_data(
    request:Request, 
    prompt_input: schemas.ChatbotInputSchema):                                                                                                                                                              
    try:
        start = time.time()
        response = chatbot.get_general_answer(prompt_input) 
        end = time.time()

        return {
            "status": True,
            "data": response,
            "time": (end - start) * 1000
        }
    except Exception as e:
        raise HTTPException(status_code = 500, detail='Failed to get the response data')
