from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Donor

router = APIRouter(prefix="/availability", tags=["Availability"])


# ✅ SET AVAILABILITY (ON / OFF)
@router.put("/{donor_id}")
def set_availability(donor_id: int, available: bool, db: Session = Depends(get_db)):
    donor = db.query(Donor).filter(Donor.id == donor_id).first()

    if not donor:
        return {"message": "Donor not found"}

    donor.available = available

    db.commit()

    return {
        "donor_id": donor_id,
        "available": available
    }


# ✅ CHECK AVAILABILITY
@router.get("/{donor_id}")
def get_availability(donor_id: int, db: Session = Depends(get_db)):
    donor = db.query(Donor).filter(Donor.id == donor_id).first()

    if not donor:
        return {"message": "Donor not found"}

    return {
        "donor_id": donor_id,
        "available": donor.available
    }