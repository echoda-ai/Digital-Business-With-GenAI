from services.recommendation_service import RecommendationService

service = RecommendationService()
user_query = "I want a comfortable and affordable running shoes under $50"
preferences = service.check_user_preferences(user_query)
print(preferences)
