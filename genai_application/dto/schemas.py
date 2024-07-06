from pydantic import BaseModel,Field
from typing import Union, List

class ChatbotInputSchema(BaseModel):
    question: str = Field('Hello, can you recommend me of the most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles in category Intelligent Plastic Car?',
        example="Hello, who are you?")


class ChatbotOrder(BaseModel):
    products: List[str] = Field(
        ['001c979b-b1ed-442f-85c3-a459db33c680'],
        example=["001c979b-b1ed-442f-85c3-a459db33c680"]
    )
    totalAmount: float = Field(
        25.0,
        example=25.0
    )

class ResponseData(BaseModel):
    message: Union[str, None]
    data: Union[dict, list, str, None]
    time: Union[float, None]