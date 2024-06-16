import google.generativeai as genai
from dotenv import load_dotenv
import os 
load_dotenv(override=True)

class GeminiModelCollector():
    def __init__(self):
        self.GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
        genai.configure(api_key=self.GOOGLE_API_KEY)
        
    def get_gemini_model_listing(self):
        try:
            list_model = []
            for m in genai.list_models():
                if "generateContent" in m.supported_generation_methods:
                    list_model.append(m.name)
            return list_model
        except Exception as e:
            return None

    def get_gemini_model_detail(self, model_name):
        try:
            model_detail =  genai.get_model(model_name)
            return model_detail
        except Exception as e:
            return None