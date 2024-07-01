from dotenv import load_dotenv
import os 
import requests
load_dotenv(override=True)


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
            print('Received:', return_data.status_code, return_data.text)
            return return_data.json()
        except Exception as e:
            print(f'Error: {e}')
            return 500

    def make_order_by_product_id(self, data):
        try:
            url  = self.base_url + '/api/orders'            
            return_data = requests.request("POST", url, headers=self.headers, json=data)
            print('Received: ', return_data.status_code, return_data.text)
            return return_data.json()
        except Exception as e:
            print(f'Error: {e}')
            return 500
