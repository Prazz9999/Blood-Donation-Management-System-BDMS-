from fastapi import FastAPI
from sqlalchemy import text
from database.db import engine

app = FastAPI()

# GET REQUEST DATA
@app.get("/request")
def get_requests():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM requests"))
        return [dict(row._mapping) for row in result]

# GET INVENTORY DATA
@app.get("/inventory")
def get_inventory():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM inventory"))
        return [dict(row._mapping) for row in result]

# GET DONOR DATA
@app.get("/donor")
def get_donors():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM donors"))
        return [dict(row._mapping) for row in result]