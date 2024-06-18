from pydantic import BaseModel,Field
from typing import Union

class ChatbotInputSchema(BaseModel):
    question: str = Field('Hello, can you help me to order some products?', example='Hello, can you help me to order some products?')
    user: str = Field('test.user', example='test.user')     
