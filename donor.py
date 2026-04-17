from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Donor
from app.schemas import DonorCreate, DonorUpdate, DonorResponse

router = APIRouter(prefix="/donors", tags=["Donors"])


# ✅ CREATE DONOR
@router.post("/")
def create_donor(donor: DonorCreate, db: Session = Depends(get_db)):
    new_donor = Donor(
        blood_group=donor.blood_group,
        location=donor.location,
        user_id=1   # simple for now
    )

    db.add(new_donor)
    db.commit()
    db.refresh(new_donor)

    return new_donor


# ✅ GET ALL DONORS
@router.get("/", response_model=list[DonorResponse])
def get_all_donors(db: Session = Depends(get_db)):
    return db.query(Donor).all()


# ✅ GET ONE DONOR
@router.get("/{donor_id}", response_model=DonorResponse)
def get_donor(donor_id: int, db: Session = Depends(get_db)):
    donor = db.query(Donor).filter(Donor.id == donor_id).first()

    if not donor:
        raise HTTPException(status_code=404, detail="Donor not found")

    return donor


# ✅ UPDATE DONOR
@router.put("/{donor_id}", response_model=DonorResponse)
def update_donor(donor_id: int, data: DonorUpdate, db: Session = Depends(get_db)):
    donor = db.query(Donor).filter(Donor.id == donor_id).first()

    if not donor:
        raise HTTPException(status_code=404, detail="Donor not found")

    donor.blood_group = data.blood_group
    donor.location = data.location

    db.commit()
    db.refresh(donor)

    return donor