
from services.backend_service import backEndAPIRequestor

api_requestor = backEndAPIRequestor()
response = api_requestor.get_product_detail_by_id({
    'user': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxZTdiNzIwNi03ZjUxLTRhMGItYjZhZC1iYTJmZWE5ZGI3MTIiLCJpYXQiOjE3MTk3MjQ1MTEsImV4cCI6MjAzMDc2NDUxMX0.hRCOYd6eomi4bITFrQrnDI7PkI-OXfCMKC0Wxs9DlZM',
    'productIds':[
        "002d936d-2447-49ca-b8fa-217bff965592",
        "00316089-d754-42b0-86d0-0b86c47f9c3e"
    ]
})
print(response)