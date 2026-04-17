from fastapi import APIRouter
from sqlalchemy import create_engine, text

router = APIRouter()

DATABASE_URL = "postgresql://evyaanyadav@localhost:5432/blood_donation_db"
engine = create_engine(DATABASE_URL)

# UPDATE REQUEST
@router.put("/request/{id}")
def update_request(id: int):
    with engine.connect() as conn:
        conn.execute(
            text("UPDATE requests SET status = 'completed' WHERE id = :id"),
            {"id": id}
        )
        conn.commit()
    return {"message": "Request updated"}

# UPDATE INVENTORY
@router.put("/inventory/{id}")
def update_inventory(id: int, units: int):
    with engine.connect() as conn:
        conn.execute(
            text("UPDATE inventory SET units = :units WHERE id = :id"),
            {"units": units, "id": id}
        )
        conn.commit()
    return {"message": "Inventory updated"}