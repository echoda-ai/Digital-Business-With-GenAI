import os
from utils.llm_model import LLMModel
from dotenv import load_dotenv
load_dotenv(override=True)
import os
import re
from services.qdrant_service import QdrantService
from services.nlp_service import TextVectorizerService


class RecommendationService:
    
    def __init__(self):
        self.model = LLMModel().get_llm_model()
        self.text_vectorizer = TextVectorizerService()
        self.qdrant_service = QdrantService()

    def clean_preferences_text(self, preferences_text):
        for line in preferences_text.split('\n'):
            cleaned_line = re.sub(r'[*]', '', line) 
        return cleaned_line
    
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
        
    def get_product_recommend_ids(self, user_preference_list, top_k=3):

        print(user_preference_list)
        
        text_vectorizer = TextVectorizerService()  
        embedded_vectors = text_vectorizer.vectorize_texts(user_preference_list)
        
        if embedded_vectors:
            query_vector = embedded_vectors[0]  
            search_results = self.qdrant_service.search_vectors(query_vector)
    
            if search_results:
                sorted_results = sorted(search_results, key=lambda x: x.score, reverse=True)
                top_product_recommendations = [
                    (result.payload["productID"], result.score) for result in sorted_results[:top_k]
                ]
                return top_product_recommendations
            else:
                return []
        else:
            return []