import os
from utils.llm_model import LLMModel
from dotenv import load_dotenv
load_dotenv(override=True)
import os
import re
from services.qdrant_service import QdrantService
from services.chatbot_service import ChatBotService


class RecommendationService:
    
    def __init__(self):
        self.model = LLMModel().get_llm_model()
        self.qdrant_service = QdrantService()
        self.chatbot_service = ChatBotService()

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
            user_preference_string = ' '.join([item.strip('- ').strip('$') for item in preferences_text.split('\n')])
            return user_preference_string
        except Exception as e:
            print(f"Error generating user preferences: {e}")
            return "topproduct"
        
    def get_product_recommend_ids_archived(self, user_preference, top_k=3):
        
        embedded_vectors = self.text_vectorizer.vectorize_texts(user_preference)
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
        
    def get_product_recommend_ids(self, user_preference, top_k=2):
        embedded_vectors = self.chatbot_service.embedding_user_query(user_preference)
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