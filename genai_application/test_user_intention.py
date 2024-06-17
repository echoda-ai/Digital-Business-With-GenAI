from services.chatbot_service import ChatBotService
from services.recommendation_service import RecommendationService

chatbot = ChatBotService()

user_questions = "Hello, how are you?"
user_questions_1 = "Hello, can you help me to order some products?"
user_questions_2 = "I wanna see some products"
user_questions_3 = "I probably wanna buy some product but I don't know which to buy?"

user_intent = chatbot.get_user_intention(user_questions_1)
print(user_intent)
