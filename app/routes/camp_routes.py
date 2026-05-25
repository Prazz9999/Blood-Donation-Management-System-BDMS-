from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from math import radians, cos, sin, sqrt, atan2

from app.database import get_db
from app.models.camp_model import Camp
from app.schemas.camp_schema import CampCreate

router = APIRouter()
def calculate_distance(lat1, lon1, lat2, lon2):

    R = 6371  # Earth radius in KM

    dlat = radians(lat2 - lat1)

    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2
        + cos(radians(lat1))
        * cos(radians(lat2))
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

# CAMP ROUTES
@router.post("/camps")
def create_camp(
    camp: CampCreate,
    db: Session = Depends(get_db)
):

    new_camp = Camp(
        day=camp.day,
        month=camp.month,
        title=camp.title,
        location=camp.location,
        donors=camp.donors,
        time=camp.time,
        type=camp.type,
        status=camp.status,
        latitude=camp.latitude,
        longitude=camp.longitude
    )

    db.add(new_camp)

    db.commit()

    db.refresh(new_camp)

    return new_camp


@router.get("/camps")
def get_camps(db: Session = Depends(get_db)):

    camps = db.query(Camp).all()

    return camps

# Get only upcoming camps
@router.get("/camps/upcoming")
def get_upcoming_camps(db: Session = Depends(get_db)):

    camps = db.query(Camp).all()

    return camps

# Get nearby camps based on user location
@router.get("/camps/nearest")
def get_nearest_camps(
    user_lat: float,
    user_lon: float,
    db: Session = Depends(get_db)
):

    camps = db.query(Camp).all()

    nearby_camps = []

    for camp in camps:

        if camp.latitude and camp.longitude:

            distance = calculate_distance(
                user_lat,
                user_lon,
                camp.latitude,
                camp.longitude
            )

            nearby_camps.append({
                "id": camp.id,
                "title": camp.title,
                "location": camp.location,
                "distance": round(distance, 2),
                "day": camp.day,
                "month": camp.month,
                "time": camp.time
            })

    nearby_camps.sort(
        key=lambda x: x["distance"]
    )

    return nearby_camps