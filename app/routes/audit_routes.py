from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.audit_model import AuditLog

router = APIRouter()


# create audit log
@router.post("/audit-log")
def create_audit_log(action: str):

    db: Session = SessionLocal()

    new_log = AuditLog(
        action=action
    )

    db.add(new_log)

    db.commit()

    db.refresh(new_log)

    return {
        "message": "Audit log created successfully",
        "log_id": new_log.id
    }


# get audit logs
@router.get("/audit-log")
def get_audit_logs():

    db: Session = SessionLocal()

    logs = db.query(AuditLog).all()

    return logs