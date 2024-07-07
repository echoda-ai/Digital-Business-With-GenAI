from pydantic import BaseModel,Field
from typing import Union, List

class ChatbotInputSchema(BaseModel):
    question: str = Field('Hello, can you recommend me of the most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles in category Intelligent Plastic Car?',
        example="Hello, who are you?")


class ChatbotOrder(BaseModel):
    products: List[str] = Field(
        ['09e927a6-99e4-4756-acb4-8dd706006921', '0dbbf652-342a-44a5-8f10-34df8004e1cb'],
        example=["09e927a6-99e4-4756-acb4-8dd706006921", "0dbbf652-342a-44a5-8f10-34df8004e1cb"]
    )

    isChatbotOrder: bool = Field(
        True,
        example=True
    )

class ResponseData(BaseModel):
    message: Union[str, None]
    data: Union[dict, list, str, None]
    time: Union[float, None]