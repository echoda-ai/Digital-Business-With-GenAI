import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv(override=True)
import os
import re

class RecommendationService:
    
    def __init__(self) -> None:
        self.GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
        genai.configure(api_key=self.GOOGLE_API_KEY)
        self.model_name = os.environ.get("PRIMARY_MODEL_NAME")
        self.model = genai.GenerativeModel(self.model_name)

    def clean_preferences_text(self, preferences_text):
        cleaned_lines = []
        for line in preferences_text.split('\n'):
            cleaned_line = re.sub(r'[*]', '', line) 
            cleaned_lines.append(cleaned_line)
        return cleaned_lines

    def extract_price(self, price_text):
        price_text = price_text.replace("$", "").strip()
        if price_text.lower().startswith("under"):
            try:
                price_text = price_text.split(" ")[1] 
                return float(price_text)
            except ValueError:
                return None
        else:
            try:
                return float(price_text)
            except ValueError:
                return None
            
    def extract_attributes(self, attributes_text):
        attributes_list = []
        for attr in attributes_text.splitlines():
            attr = attr.strip()
            if attr:
                attributes_list.append(attr)
        return attributes_list

    def extract_preferences(self, user_query):

        prompt = f"""
        Extract the category, attributes, and price range from the following user query:
        User Query: "{user_query}"
        Category:
        Attributes:
        Price Range:
        """
        
        try:
            response = self.model.generate_content(
                prompt,
                safety_settings={
                    'HATE': 'BLOCK_NONE',
                    'HARASSMENT': 'BLOCK_NONE',
                    'SEXUAL': 'BLOCK_NONE',
                    'DANGEROUS': 'BLOCK_NONE'
                }
            )

            preferences_text = response.text.strip()
            preferences_lines = self.clean_preferences_text(preferences_text)

            preferences = {
                'category': None,
                'attributes': [],
                'price_range': None
            }

            current_section = None
            for line in preferences_lines:
                line = line.strip()
                if line.startswith("Category:"):
                    preferences['category'] = line.replace("Category:", "").strip()
                    current_section = 'category'
                elif line.startswith("Attributes:"):
                    current_section = 'attributes'
                    continue 
                elif line.startswith("Price Range:"):
                    preferences['price_range'] = self.extract_price(line.replace("Price Range:", "").strip())
                    current_section = 'price_range'
                else:
                    if current_section == 'attributes':
                        preferences['attributes'].append(line.strip())

            preferences['attributes'] = [attr for attr in preferences['attributes'] if attr]
            return preferences
        
        except Exception as e:
            print(f"Error generating content: {e}")
            return {
                'category': None,
                'attributes': [],
                'price_range': None
            }