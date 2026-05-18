from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import text
from database.db import engine
from fastapi.middleware.cors import CORSMiddleware

from delete import router as delete_router
from update import router as update_router
from audit import router as audit_router
from validation import router as validation_router
from notification import router as notification_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(delete_router)
app.include_router(update_router)
app.include_router(audit_router)
app.include_router(validation_router)
app.include_router(notification_router)



class SignupData(BaseModel):
    fullName: str
    email: str
    phone: str
    bloodGroup: str
    password: str

@app.post("/signup")
def signup(data: SignupData):

    return {
        "message": "Signup successful",
        "data": data
    }

class LoginData(BaseModel):
    email: str
    password: str


@app.post("/login")
def login(data: LoginData):

    return {
        "message": "Login successful"
    }

@app.get("/request")
def get_requests():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM requests"))
        return [dict(row._mapping) for row in result]

@app.get("/inventory")
def get_inventory():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM inventory"))
        return [dict(row._mapping) for row in result]

@app.get("/donor")
def get_donors():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM donors"))
        return [dict(row._mapping) for row in result]