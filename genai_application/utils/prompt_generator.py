import google.generativeai as genai
from dotenv import load_dotenv
import os 
load_dotenv(override=True)

class PromptEngineeringGenerator:
    def __init__(self):
        self.agent_get_user_preference = """
                Extract the category, attributes, and price range from the following user query:
                User Query: "{user_query}"
                Category:
                Attributes:
                Price Range:
            """ 