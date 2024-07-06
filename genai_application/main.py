from fastapi import FastAPI, Depends
import json
import uvicorn
from routers import chatbot_route, chatbot_ops_route
import pathlib

# The param inside FastAPI here to disable the swagger 
app = FastAPI()
app.include_router(chatbot_route.app)
app.include_router(chatbot_ops_route.app)

if __name__ == "__main__":
    cwd = pathlib.Path(__file__).parent.resolve()
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
    # uvicorn.run("main:app", host="0.0.0.0", port=8000, workers=1, reload=True)

