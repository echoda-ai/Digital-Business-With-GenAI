from dotenv import load_dotenv
load_dotenv(override=True)
import os
import uuid
import mysql.connector
from mysql.connector import Error

class mariaDBService:
    def __init__(self):
        self.host = os.getenv("MARIADB_HOST")
        self.database = os.getenv("MARIADB_DB")
        self.user = os.getenv("MARIADB_USER")
        self.password = os.getenv("MARIADB_PASSWORD")
        self.connection = None

    def mariadb_connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                database=self.database,
                user=self.user,
                password=self.password
            )
            if self.connection.is_connected():
                print("Connected to MariaDB database")
        except Error as e:
            print(f"Error while connecting to MariaDB: {e}")
            self.connection = None

    def mariadb_execute_query(self, query, params=None):
        if not self.connection:
            print("Connection not established")
            return None, None
        cursor = self.connection.cursor()
        try:
            cursor.execute(query, params)
            result = cursor.fetchall()  
            column_names = [desc[0] for desc in cursor.description]
            self.connection.commit()
            return result, column_names
        except Error as e:
            print(f"Error executing query: {e}")
            return None, None
        finally:
            cursor.close()

    def mariadb_close_connection(self):
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("Connection closed")

