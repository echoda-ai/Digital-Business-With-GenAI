from pydantic import BaseModel,Field
from typing import Union

class ChatbotInputSchema(BaseModel):
    question: str = Field('Hello, can you recommend me of the most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles in category Intelligent Plastic Car?',
        example='Hello, can you recommend me of the most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles in category Intelligent Plastic Car?')
    user: str = Field('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxZTdiNzIwNi03ZjUxLTRhMGItYjZhZC1iYTJmZWE5ZGI3MTIiLCJpYXQiOjE3MTk3MjQ1MTEsImV4cCI6MjAzMDc2NDUxMX0.hRCOYd6eomi4bITFrQrnDI7PkI-OXfCMKC0Wxs9DlZM', 
        example='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxZTdiNzIwNi03ZjUxLTRhMGItYjZhZC1iYTJmZWE5ZGI3MTIiLCJpYXQiOjE3MTk3MjQ1MTEsImV4cCI6MjAzMDc2NDUxMX0.hRCOYd6eomi4bITFrQrnDI7PkI-OXfCMKC0Wxs9DlZM')     
