from services.qdrant_service import QdrantService
from qdrant_client.models import PointStruct, VectorParams, Distance


if __name__ == "__main__":
    qdrant_db = QdrantService()
    qdrant_db.create_collection()

    vectors = [
        PointStruct(id=1, vector=[0.1] * qdrant_db.dimensions, payload={
            "productID": "ID1",
            "name":"MACKBOOK A123",
            "description":"A awesome mackbook for students",
            "price":1500,
            "quantityAvailable":5,
            "productCategory":"Electronic",
            "createdAt":"2024-06-23T15:10:00",
            "updatedAt":"2024-06-23T15:10:00"
        }),
        PointStruct(id=2, vector=[0.1] * qdrant_db.dimensions, payload={
            "productID": "ID2",
            "name":"ADIDAS A123",
            "description":"A awesome running shoes for gentlemen",
            "price":20.25,
            "quantityAvailable":5,
            "productCategory":"Shoes",
            "createdAt":"2024-06-23T12:10:00",
            "updatedAt":"2024-06-23T12:10:00"
        }),
        PointStruct(id=3, vector=[0.1] * qdrant_db.dimensions, payload={
            "productID": "ID3",
            "name":"ADIDAS A124",
            "description":"A awesome running shoes for gentlemen",
            "price":20.25,
            "quantityAvailable":5,
            "productCategory":"Shoes",
            "createdAt":"2024-06-23T12:10:00",
            "updatedAt":"2024-06-23T12:10:00"
        })
    ]

    qdrant_db.insert_vectors(vectors)
    # search_vector = [0.1] * qdrant_db.dimensions
    # search_results = qdrant_db.search_vectors(search_vector)
    # for result in search_results:
    #     print(f"Found product with ID: {result.payload['productID']} and score: {result.score}")