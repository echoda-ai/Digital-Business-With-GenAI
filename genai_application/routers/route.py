from fastapi import APIRouter, Depends, HTTPException, Request
from services.chatbot_service import ChatBotService
from services.recommendation_service import RecommendationService 
from datetime import datetime
import time
from fastapi import FastAPI
from dto import schemas

app = APIRouter(
    prefix="/api/v1",
    tags=["gemini-chatbot"]
)
chatbot = ChatBotService()
recommender = RecommendationService()

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
        print("Error Occured: " + str(e))
        raise HTTPException(status_code = 500, detail='Failed to get the response data')


@app.post("/chatbot/get-advance-answer")
async def get_response_data(
    request:Request, 
    user_query: schemas.ChatbotInputSchema):                                                                                                                                                              
    try:
        start = time.time()
        user_intention = chatbot.check_user_intention(user_query)
        if user_intention == "recommendation":
            user_preferences = recommender.get_user_preferences(user_query)
            response = user_preferences
        elif user_intention == "order":
            response = "order"
        else:
            response = chatbot.get_general_answer(user_query) 
        end = time.time()

        return {
            "status": True,
            "data": response,
            "time": (end - start) * 1000
        }
    except Exception as e:
        print("Error Occured: " + str(e))
        raise HTTPException(status_code = 500, detail='Failed to get the response data')
