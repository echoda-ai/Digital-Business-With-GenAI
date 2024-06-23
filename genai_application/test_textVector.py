from services.nlp_service import TextVectorizerService

if __name__ == "__main__":
    vectorizer = TextVectorizerService()

    user_preferences = [
        "Comfortable",
        "Running Shoes",
        "Price: around 15"
    ]

    embedded_vectors = vectorizer.vectorize_texts(user_preferences)
    for i, vector in enumerate(embedded_vectors):
        print(f"Embedded vector for '{user_preferences[i]}': {vector}")
