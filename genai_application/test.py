from services.chatbot_service import ChatBotService
from utils.gemini_model_collector import GeminiModelCollector

a = ChatBotService()
b = GeminiModelCollector()

result = a.call_gemini_model("Hello, you teach me about math?")
print(result)

list_model = b.get_gemini_model_listing()
print(list_model)


model_name = 'models/gemini-1.5-pro-latest'
model_detail = b.get_gemini_model_detail(model_name)
print(model_detail)