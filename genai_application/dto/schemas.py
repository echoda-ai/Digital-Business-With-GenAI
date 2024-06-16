from pydantic import BaseModel,Field
from typing import Union

class ChatSchemaClass(BaseModel):
    prompt_input : str 
