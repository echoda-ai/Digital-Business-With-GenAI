from dotenv import load_dotenv
load_dotenv(override=True)
import os
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
from services.chatbot_service import ChatBotService
import uuid

class QdrantService:
    def __init__(self):
        self.client = QdrantClient(host=os.getenv("QDRANT_HOST"), port=6333)
        self.collection_name = os.getenv("QDRANT_COLLECTION")
        self.dimensions = 512
        self.distance_metric = Distance.COSINE
        self.chatbot_service = ChatBotService()

    def create_collection(self):
        self.client.recreate_collection(
            collection_name=self.collection_name,
            vectors_config=VectorParams(size=self.dimensions, distance=self.distance_metric)
        )

    def insert_vectors(self, user_query, product_id):
        embedding_list = self.chatbot_service.embedding_user_query(user_query)
        
        if len(embedding_list) != 1:
            raise ValueError("Expected a single embedding in the list")
    
        embedding = embedding_list[0]
        
        point = PointStruct(
            id=str(uuid.uuid4()),  
            vector=embedding, 
            payload={
                "productID": product_id  
            }
        )
        
        self.client.upsert(
            collection_name=self.collection_name,
            points=[point]
        )


    def search_vectors(self, query_vector):
        search_results = self.client.search(collection_name=self.collection_name,query_vector=query_vector)
        return search_results
