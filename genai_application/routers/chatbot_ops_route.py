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
    tags=["chatbot-backend-operation"]
)
backend_helper = backEndAPIRequestor()

@app.post("/chatbot/orderes")
async def make_orders(
        request:Request, 
        user_query: schemas.ChatbotOrder,
        user_token: str = Header()
    ):                                                                                                                                                             
    try:
        start = time.time()
        user_query = user_query.dict()
        response = backend_helper.make_order_by_product_id(
            {
                'user_token': user_token,
                'product_orders': user_query
            }
        )
        end = time.time()
        return schemas.ResponseData(
            message="success",
            data=response,
            time=(end - start) * 1000
        )
    except Exception as e:
        print("Error Occured: " + str(e))
        raise HTTPException(status_code = 500, detail='Failed to order the product')
    
