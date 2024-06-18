from services.recommendation_service import RecommendationService

service = RecommendationService()
user_query = "I want a comfortable and affordable running shoes under $50"
preferences = service.extract_preferences(user_query)
print(preferences)
