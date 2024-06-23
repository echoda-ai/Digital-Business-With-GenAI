import os
from utils.llm_model import LLMModel
from dotenv import load_dotenv
load_dotenv(override=True)
import os
import re

class RecommendationService:
    
    def __init__(self):
        self.model = LLMModel().get_llm_model()

    def clean_preferences_text(self, preferences_text):
        for line in preferences_text.split('\n'):
            cleaned_line = re.sub(r'[*]', '', line) 
        return cleaned_line

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

    def get_user_preferences_archived(self, user_query):

        prompt = f"""
        Extract the category, attributes, and price range from the following user query:
        User Query: "{user_query.question}"
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
            print(preferences_text)
            preferences_lines = self.clean_preferences_text(preferences_text)
            print(preferences_lines)

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
                'category': "Sport",
                'attributes': ["Comfortable"],
                'price_range': "10$"
            }
        
    def get_user_preferences(self, user_query):

        prompt = f"""
        Extract the user's preference following user query and response as the list. You must only classify the output only. no need to describe.
        User Query: "{user_query.question}"
        preferences:
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
            user_preference_list = [item.strip('- ').strip('$') for item in preferences_text.split('\n')]            
            return user_preference_list

        
        except Exception as e:
            print(f"Error generating content: {e}")
            return {
                'category': "Sport",
                'attributes': ["Comfortable"],
                'price_range': "10$"
            }