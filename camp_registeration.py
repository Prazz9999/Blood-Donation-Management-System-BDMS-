from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import (
    Donor,
    Camp,
    CampRegistration
)

from app.schemas import (
    CampRegister,
    CampRegisterResponse
)

router = APIRouter(
    prefix="/camp-registration",
    tags=["Camp Registration"]
)


# ✅ REGISTER FOR CAMP
@router.post(
    "/",
    response_model=CampRegisterResponse
)
def register_for_camp(
    data: CampRegister,
    db: Session = Depends(get_db)
):

    # check donor
    donor = db.query(Donor).filter(
        Donor.id == data.donor_id
    ).first()

    if not donor:
        raise HTTPException(
            status_code=404,
            detail="Donor not found"
        )

    # check camp
    camp = db.query(Camp).filter(
        Camp.id == data.camp_id
    ).first()

    if not camp:
        raise HTTPException(
            status_code=404,
            detail="Camp not found"
        )

    # prevent duplicate registration
    existing = db.query(
        CampRegistration
    ).filter(
        CampRegistration.donor_id == data.donor_id,
        CampRegistration.camp_id == data.camp_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Already registered"
        )

    registration = CampRegistration(
        donor_id=data.donor_id,
        camp_id=data.camp_id
    )

    db.add(registration)

    db.commit()

    db.refresh(registration)

    return registration