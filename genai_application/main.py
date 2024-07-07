from fastapi import FastAPI, Depends
import json
import uvicorn
from routers import chatbot_route, chatbot_ops_route
import pathlib
from fastapi.openapi.utils import get_openapi


# The param inside FastAPI here to disable the swagger 
app = FastAPI(openapi_version="3.1.1", swagger=True)
app.include_router(chatbot_route.app)
app.include_router(chatbot_ops_route.app)

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Chatbot Swagger",
        version="2.5.0",
        summary="Chatbot Swagger Endpoint Listing and Documentation",
        description="",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

if __name__ == "__main__":
    cwd = pathlib.Path(__file__).parent.resolve()
    # uvicorn.run("main:app", host="0.0.0.0", port=8000)
    uvicorn.run("main:app", host="0.0.0.0", port=8000, workers=1, reload=True)
