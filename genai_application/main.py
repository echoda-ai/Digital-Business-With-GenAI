import google.generativeai as genai
import sys
from dotenv import load_dotenv
import os 
load_dotenv(override=True)

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)