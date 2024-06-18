import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv(override=True)
import os
import re

class LLMModel:
    def __init__(self) -> None:
        self.GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
        genai.configure(api_key=self.GOOGLE_API_KEY)
        self.model_name = os.environ.get("PRIMARY_MODEL_NAME")
        self.model = genai.GenerativeModel(self.model_name)
    
    def get_llm_model(self):
        return self.model