from pydantic import BaseModel,Field
from typing import Union

class ChatbotInputSchema(BaseModel):
    question: str = Field('Hello, can you recommend me of the adidas shoes?', example='Hello, can you recommend me of the adidas shoes?')
    user: str = Field('test.user', example='test.user')     
