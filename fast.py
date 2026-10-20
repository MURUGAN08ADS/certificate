from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello FastAPI"}

@app.get("/user/{user_id}")
def home(user_id : int):
    return {
        "user_id":user_id,
        "user_name":"ashwin"
    }