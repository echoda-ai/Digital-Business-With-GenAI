

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">EcomAI - GenAI Application</h1>
</p>


<!-- GETTING STARTED -->
## Getting Started
How to get started

### Prerequisites
In in guideline, there are 2 main components to run it out: 
- Product Data Embedding Script
- EcomAI Chatbot Application 


#### EcomAI Chatbot Application 
First, we will go with the EcomAI Chatbot Application: 

1. Env File
```bash 
GOOGLE_API_KEY = ""
PRIMARY_MODEL_NAME = '' 
EMBEDDING_MODEL = ""
APP_KEY = ""
QDRANT_COLLECTION = ""
QDRANT_HOST = ""  
MARIADB_HOST = ""
MARIADB_USER = ""
MARIADB_PASSWORD = ""
MARIADB_DB = ""
BACKEND_API_URL = ""
```

2. Dependencies: check it out on requirements.txt
3. Run app: we use docker to run the app, the main docker compose file is availalb at the main path, just run that one. 

```bash
docker compose -f docker-compose.yml up
```

#### Product Data Embedding Script
We used Qdrant as our vector database, so it's main dependendies to embedding the product to the QDrant 

1. Run Script

```bash
python qdrant_autobot_embeder.py
```
it will embed the product data from the operation database (product table). 