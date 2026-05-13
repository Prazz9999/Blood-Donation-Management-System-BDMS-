from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Camp
from app.schemas import (
    CampCreate,
    CampResponse
)

router = APIRouter(
    prefix="/camps",
    tags=["Camps"]
)


# ✅ CREATE CAMP
@router.post(
    "/",
    response_model=CampResponse
)
def create_camp(
    data: CampCreate,
    db: Session = Depends(get_db)
):

    new_camp = Camp(
        title=data.title,
        location=data.location,
        camp_date=data.camp_date,
        description=data.description
    )

    db.add(new_camp)

    db.commit()

    db.refresh(new_camp)

    return new_camp
    # ✅ GET ALL CAMPS
@router.get(
    "/",
    response_model=list[CampResponse]
)
def get_all_camps(
    db: Session = Depends(get_db)
):

    camps = db.query(Camp).all()

    return camps
#update camp
    @router.put(
    "/{camp_id}",
    response_model=CampResponse
)
def update_camp(
    camp_id: int,
    data: CampCreate,
    db: Session = Depends(get_db)
):

    camp = db.query(Camp).filter(
        Camp.id == camp_id
    ).first()

    if not camp:
        return {
            "message": "Camp not found"
        }

    camp.title = data.title
    camp.location = data.location
    camp.camp_date = data.camp_date
    camp.description = data.description

    db.commit()

    db.refresh(camp)

    return camp

    #delete camp
    @router.delete("/{camp_id}")
def delete_camp(
    camp_id: int,
    db: Session = Depends(get_db)
):

    camp = db.query(Camp).filter(
        Camp.id == camp_id
    ).first()

    if not camp:
        return {
            "message": "Camp not found"
        }

    db.delete(camp)

    db.commit()

    return {
        "message": "Camp deleted"
    }   

