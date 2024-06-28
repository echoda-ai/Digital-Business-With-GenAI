from services.chatbot_service import ChatBotService
from services.qdrant_service import QdrantService


chatbot_service = ChatBotService()
vector_service = QdrantService()

vector_service.create_collection()
product_id = "GNDKJGNLMJGEGMJGDFGKDRNG"
user_query = "MACKBOOKPRO 2024 An awesome MacBook for students priced at 1500 in category Electronic"
embedding = vector_service.insert_vectors(user_query, product_id)