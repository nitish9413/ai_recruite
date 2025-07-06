from api.v1.api import api_router
from fastapi import FastAPI

app: FastAPI = FastAPI(title="Job Portal")

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
