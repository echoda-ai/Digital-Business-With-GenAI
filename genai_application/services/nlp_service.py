import spacy
import numpy as np
from dotenv import load_dotenv
load_dotenv(override=True)
import os


class TextVectorizerService:
    def __init__(self, model_name="en_core_web_lg", target_dim=512):
        try:
            self.nlp = spacy.load(model_name)
            self.target_dim = target_dim

        except OSError:
            print(f"Error loading spaCy model '{model_name}'. Make sure it's installed and accessible.")
            raise
    
    def preprocess_text(self, text):
        return text.lower()

    def embed_text(self, text):
        doc = self.nlp(text)
        embeddings = [token.vector for token in doc if not token.is_punct]
        if embeddings:
            mean_vector = np.mean(embeddings, axis=0)
            if mean_vector.shape[0] != self.target_dim:
                if mean_vector.shape[0] > self.target_dim:
                    mean_vector = mean_vector[:self.target_dim] 
                else:
                    mean_vector = np.pad(mean_vector, (0, self.target_dim - mean_vector.shape[0]), 'constant') 
            return mean_vector / np.linalg.norm(mean_vector)  
        else:
            return np.zeros(self.target_dim)  

    def vectorize_texts(self, texts):
        embedded_vectors = [self.embed_text(self.preprocess_text(text)) for text in texts]
        return embedded_vectors