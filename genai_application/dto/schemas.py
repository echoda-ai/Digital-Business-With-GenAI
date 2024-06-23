from pydantic import BaseModel,Field
from typing import Union

class ChatbotInputSchema(BaseModel):
    question: str = Field('Hello, can you give me the Confortable Running Shoes around 15$?', example='Hello, can you give me the Confortable Running Shoes around 15$')
    user: str = Field('test.user', example='test.user')     
