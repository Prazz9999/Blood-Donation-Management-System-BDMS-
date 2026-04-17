from fastapi import APIRouter
from datetime import date
from app.schemas import EligibilityCheck

router = APIRouter(prefix="/eligibility", tags=["Eligibility"])


@router.post("/")
def check_eligibility(data: EligibilityCheck):
    today = date.today()
    days = (today - data.last_donation_date).days

    if days < 90:
        return {
            "eligible": False,
            "reason": "Last donation less than 3 months ago"
        }

    if not data.health_status:
        return {
            "eligible": False,
            "reason": "Not healthy enough"
        }

    return {
        "eligible": True,
        "reason": "Eligible to donate"
    }