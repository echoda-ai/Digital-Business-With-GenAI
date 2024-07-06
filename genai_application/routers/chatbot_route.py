from fastapi import APIRouter, Depends, HTTPException, Request, Header
from services.chatbot_service import ChatBotService
from services.recommendation_service import RecommendationService 
from services.backend_service import backEndAPIRequestor
from datetime import datetime
import time
from fastapi import FastAPI
from dto import schemas

app = APIRouter(
    prefix="/api/v1",
    tags=["chatbot-agent"]
)
chatbot = ChatBotService()
recommender = RecommendationService()
backend_helper = backEndAPIRequestor()

@app.get("/chatbot/healthz")
async def health_check():
    start = time.time()
    response =  None
    end = time.time()
    return schemas.ResponseData(
        message="success",
        data=response,
        time=(end - start) * 1000
    )

@app.post("/chatbot/get-general-answer")
async def get_response_data(
        request:Request, 
        prompt_input: schemas.ChatbotInputSchema
    ):                                                                                                                                                              
    try:
        start = time.time()
        response = chatbot.get_general_answer(prompt_input) 
        end = time.time()
        return schemas.ResponseData(
            message="success",
            data=response,
            time=(end - start) * 1000
        )
    except Exception as e:
        print("Error Occured: " + str(e))
        raise HTTPException(status_code = 500, detail='Failed to get the response data')


@app.post("/chatbot/get-advance-answer")
async def get_advance_response_data(
        request:Request, 
        user_query: schemas.ChatbotInputSchema,
        user_token: str = Header()
    ):                                                                                                                                                              
    try:
        user_intention = chatbot.check_user_intention(user_query)
        if user_intention == "recommendation":
            user_preferences = recommender.get_user_preferences(user_query)
            response = recommender.get_product_recommend_ids(user_preferences)
            list_product_ids = [item[0] for item in response]
            response = backend_helper.get_product_detail_by_id({
                'user_token': user_token,
                'productIds': list_product_ids
            })
            return schemas.ResponseData(
                message="success",
                data=response,
                time=None
            )
        elif user_intention == "order":
            response = "order"
            return schemas.ResponseData(
                message="success",
                data=response,
                time=None
            )
        else:
            response = chatbot.get_general_answer(user_query) 
            return schemas.ResponseData(
                message="success",
                data=response,
                time=None
            )
    except Exception as e:
        print("Error Occured: " + str(e))
        raise HTTPException(status_code=500, detail='Failed to get the response data')
