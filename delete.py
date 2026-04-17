from fastapi import APIRouter
from sqlalchemy import create_engine, text

router = APIRouter()

DATABASE_URL = "postgresql://evyaanyadav@localhost:5432/blood_donation_db"
engine = create_engine(DATABASE_URL)

@router.delete("/request/{id}")
def delete_request(id: int):
    with engine.connect() as conn:
        conn.execute(
            text("DELETE FROM requests WHERE id = :id"),
            {"id": id}
        )
        conn.commit()
    return {"message": "Request deleted"}

@router.delete("/inventory/{id}")
def delete_inventory(id: int):
    with engine.connect() as conn:
        conn.execute(
            text("DELETE FROM inventory WHERE id = :id"),
            {"id": id}
        )
        conn.commit()
    return {"message": "Inventory deleted"}