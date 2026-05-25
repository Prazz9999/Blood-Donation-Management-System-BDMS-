from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.notification_model import Notification

router = APIRouter()


# create notification
@router.post("/notifications")
def create_notification(
    message: str,
    type: str
):

    db: Session = SessionLocal()

    new_notification = Notification(
        message=message,
        type=type
    )

    db.add(new_notification)

    db.commit()

    db.refresh(new_notification)

    db.close()

    return new_notification


# get notifications
@router.get("/notifications")
def get_notifications():

    db: Session = SessionLocal()

    notifications = db.query(Notification).all()

    db.close()

    return notifications


# delete notification
@router.delete("/notifications/{notification_id}")
def delete_notification(notification_id: int):
    
    db: Session = SessionLocal()

    notification = db.query(Notification).filter(
        Notification.id == notification_id
    ).first()

    if not notification:
        return {"message": "Notification not found"}

    db.delete(notification)

    db.commit()

    db.close()

    return {"message": "Notification deleted successfully"}
