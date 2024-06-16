from fastapi import FastAPI, Depends
import json
import uvicorn
from routers import route
import pathlib

# The param inside FastAPI here to disable the swagger 
app = FastAPI()
app.include_router(route.app)

if __name__ == "__main__":
    cwd = pathlib.Path(__file__).parent.resolve()
    uvicorn.run(app, host="0.0.0.0", port=8000, log_config=f"{cwd}/log.ini")
