from dotenv import load_dotenv
import os 
import requests
load_dotenv(override=True)
from fastapi import HTTPException
import json


class backEndAPIRequestor:
    def __init__(self):
        self.base_url = os.environ.get('BACKEND_API_URL')
        self.headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }

    def get_product_detail_by_id(self, data):
        try:
            token = data.pop('user_token', None)
            if token:
                self.headers['Authorization'] = f'Bearer {token}'
            else:
                raise ValueError("Token is required")

            url = self.base_url + "/api/products/get-product-by-ids"
            return_data = requests.post(url, headers=self.headers, json=data)
            return_data = json.loads(return_data.text)
            return return_data["data"]
        except Exception as e:
            print(f'Error: {e}')
            raise HTTPException(status_code=500, detail="Failed to get the product")

    def make_order_by_product_id(self, data):
        try:
            token = data.pop('user_token', None)
            if token:
                self.headers['Authorization'] = f'Bearer {token}'
            else:
                raise ValueError("Token is required")
            
            url  = self.base_url + '/api/orders'            
            return_data = requests.post(url, headers=self.headers, json=data.pop('product_orders', None))
            return_data = json.loads(return_data.text)
            return return_data["data"]
        
        except Exception as e:
            print(f'Error: {e}')
            raise HTTPException(status_code=500, detail="Failed to order the products")
