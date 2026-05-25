from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.request_model import BloodRequest
from app.schemas.request_schema import RequestCreate

router = APIRouter()


@router.post("/requests")
def create_request(request: RequestCreate):

    db: Session = SessionLocal()

    new_request = BloodRequest(
        patient_name=request.patient_name,
        blood_group=request.blood_group,
        hospital=request.hospital,
        units=request.units
    )

    db.add(new_request)

    db.commit()

    db.refresh(new_request)

    return {
        "message": "Blood request created successfully",
        "request_id": new_request.id
    }

@router.get("/requests")
def get_requests():

    db: Session = SessionLocal()

    requests = db.query(BloodRequest).all()

    return requests

@router.put("/requests/{request_id}")
def update_request(
    request_id: int,
    patient_name: str,
    blood_group: str,
    hospital: str,
    units: int,
    status: str
):

    db: Session = SessionLocal()

    request = db.query(BloodRequest).filter(
        BloodRequest.id == request_id
    ).first()

    if not request:

        return {"message": "Request not found"}

    request.patient_name = patient_name
    request.blood_group = blood_group
    request.hospital = hospital
    request.units = units
    request.status = status

    db.commit()

    db.refresh(request)

    return {
        "message": "Request updated successfully",
        "request": request
    }

@router.delete("/requests/{request_id}")
def delete_request(request_id: int):

    db: Session = SessionLocal()

    request = db.query(BloodRequest).filter(
        BloodRequest.id == request_id
    ).first()

    if not request:

        return {"message": "Request not found"}

    db.delete(request)

    db.commit()

    return {
        "message": "Request deleted successfully"
    }

@router.put("/accept-request/{request_id}")
def accept_request(request_id: int):

    db: Session = SessionLocal()

    request = db.query(BloodRequest).filter(
        BloodRequest.id == request_id
    ).first()

    if not request:

        return {
            "message": "Request not found"
        }

    request.status = "accepted"

    db.commit()

    db.refresh(request)

    return {
        "message": "Request accepted successfully",
        "request": request
    }