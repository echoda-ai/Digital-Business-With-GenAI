from services.chatbot_service import ChatBotService
from services.qdrant_service import QdrantService


chatbot_service = ChatBotService()
vector_service = QdrantService()

vector_service.create_collection()

# products = [
#     {
#         "productID": "IDNGDNGLKGLKMGLKMGMGLDFLG1",
#         "name": "MACKBOOK PRO 2024",
#         "description": "An awesome MacBook for students",
#         "price": 1500,
#         "productCategory": "Electronic"
#     },
#     {
#         "productID": "GNDKJGNLMJGEGMJGDFGKDRNG",
#         "name": "DELL Inspiron",
#         "description": "A budget-friendly laptop for everyday use",
#         "price": 700,
#         "productCategory": "Electronic"
#     }
# ]

product_id = "GNDKJGNLMJGEGMJGDFGKDRNG"
user_query = "MACKBOOKPRO 2024 An awesome MacBook for students priced at 1500 in category Electronic"
embedding = vector_service.insert_vectors(user_query, product_id)