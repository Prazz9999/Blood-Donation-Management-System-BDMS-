from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Seeker
from app.schemas import SeekerCreate, SeekerUpdate, SeekerResponse

router = APIRouter(prefix="/seekers", tags=["Seekers"])


#   CREATE REQUEST
@router.post("/", response_model=SeekerResponse)
def create_seeker(seeker: SeekerCreate, db: Session = Depends(get_db)):
    new_seeker = Seeker(
        blood_group=seeker.blood_group,
        location=seeker.location,
        user_id=1   # simple for now
    )

    db.add(new_seeker)
    db.commit()
    db.refresh(new_seeker)

    return new_seeker


#   GET ALL REQUESTS
@router.get("/", response_model=list[SeekerResponse])
def get_all_seekers(db: Session = Depends(get_db)):
    return db.query(Seeker).all()


#   GET SINGLE REQUEST
@router.get("/{seeker_id}", response_model=SeekerResponse)
def get_seeker(seeker_id: int, db: Session = Depends(get_db)):
    seeker = db.query(Seeker).filter(Seeker.id == seeker_id).first()

    if not seeker:
        raise HTTPException(status_code=404, detail="Request not found")

    return seeker


# UPDATE REQUEST
@router.put("/{seeker_id}", response_model=SeekerResponse)
def update_seeker(seeker_id: int, data: SeekerUpdate, db: Session = Depends(get_db)):
    seeker = db.query(Seeker).filter(Seeker.id == seeker_id).first()

    if not seeker:
        raise HTTPException(status_code=404, detail="Request not found")

    seeker.blood_group = data.blood_group
    seeker.location = data.location
    seeker.status = data.status

    db.commit()
    db.refresh(seeker)

    return seeker


#   DELETE REQUEST
@router.delete("/{seeker_id}")
def delete_seeker(seeker_id: int, db: Session = Depends(get_db)):
    seeker = db.query(Seeker).filter(Seeker.id == seeker_id).first()

    if not seeker:
        raise HTTPException(status_code=404, detail="Request not found")

    db.delete(seeker)
    db.commit()

    return {"message": "Request deleted"}