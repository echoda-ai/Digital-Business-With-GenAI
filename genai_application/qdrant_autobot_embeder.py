from services.chatbot_service import ChatBotService
from services.qdrant_service import QdrantService
from services.mariadb_service import mariaDBService
from dotenv import load_dotenv
import os 
import requests
load_dotenv(override=True)
import datetime
import pandas as pd

chatbot_service = ChatBotService()
vector_service = QdrantService()
mariadb_service = mariaDBService()

def get_product_dataframe():
    mariadb_service.mariadb_connect()
    result, column_names = mariadb_service.mariadb_execute_query("""
        SELECT
            A.productID AS product_id,                         
            A.name AS name,
            A.description AS description,                                                                 
            A.price AS price,
            B.categoryName AS category
        FROM products AS A
        LEFT JOIN categories AS B 
            ON A.categoryID = B.categoryID
    """)
    mariadb_service.mariadb_close_connection()

    if result:
        df = pd.DataFrame(result, columns=column_names)
        return df
    else:
        return pd.DataFrame()
    
if __name__ == "__main__":
    start = datetime.datetime.now()
    df = get_product_dataframe()
    df['name'] = df['name'].astype(str)
    df['description'] = df['description'].astype(str)
    df['category'] = df['category'].astype(str)
    df['price'] = df['price'].astype(str)
    print(df.info())
    df['chunk_column'] = df['name'] + ' is ' + df['description'] + ' in category ' + df['category'] + ' priced at ' + df['price']
    df.to_csv("product_dataframe.csv")
    for index, row in df.iterrows():
        chunk_data = str(row['chunk_column'])
        product_id = str(row['product_id']) 
        print(product_id)
        vector_service.insert_vectors(chunk_data, product_id)

    end = datetime.datetime.now()
    duration = end - start
    print("Start Time:", start)
    print("End Time:", end)
    print("Duration:", duration)