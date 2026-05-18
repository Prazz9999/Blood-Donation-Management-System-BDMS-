"""
routes/users.py  —  Frontend-facing user endpoints

Frontend calls mapped here:
  POST /login                          ← Login.jsx
  POST /signup                         ← Signup.jsx
  GET  /users/me                       ← DonorDashboard.jsx, DonorProfile.jsx
  PUT  /users/update-profile           ← DonorProfile.jsx
  POST /users/update-avatar            ← DonorProfile.jsx  (stub — no file storage yet)
  POST /users/update-availability      ← DonorDashboard.jsx
  GET  /admin/users                    ← api.js mock, AdminUserRecords.jsx
  GET  /api/users                      ← AdminUserRecords.jsx  (same data, different prefix)
  PATCH /api/users/{id}/status         ← AdminUserRecords.jsx
  PUT   /api/users/{id}                ← AdminUserRecords.jsx
  DELETE /api/users/{id}               ← AdminUserRecords.jsx
"""

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
from pydantic import BaseModel

from app.database import get_db
from app.models import User, Donor
from app.schemas import UserCreate, UserLogin, OTPVerify
from app.auth import (
    hash_password, verify_password, create_token,
    generate_otp, get_current_user_id, decode_token
)

router = APIRouter(tags=["Users / Auth Bridge"])


# ─── Schemas local to this bridge ────────────────────────────────────────────

class LoginPayload(BaseModel):
    username: Optional[str] = None   # Login.jsx sends `username`
    email: Optional[str] = None      # fallback for email-based login
    password: str


class SignupPayload(BaseModel):
    fullName: str
    email: str
    phone: Optional[str] = None
    bloodGroup: Optional[str] = None
    password: str


class ProfileUpdate(BaseModel):
    fullName: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    bloodGroup: Optional[str] = None
    age: Optional[str] = None
    weight: Optional[str] = None


class AvailabilityUpdate(BaseModel):
    is_available: bool


class UserStatusUpdate(BaseModel):
    status: str


class AdminUserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None
    blood: Optional[str] = None
    status: Optional[str] = None


# ─── POST /login  (Login.jsx sends username + password) ──────────────────────

@router.post("/login")
def login_bridge(data: LoginPayload, db: Session = Depends(get_db)):
    """
    Login.jsx POSTs to /login with { username, password }.
    We treat `username` as the email field.
    Admin → returns token immediately.
    User  → generates OTP, returns it (in production: send via SMS/email).
    """
    email = data.username or data.email
    if not email:
        raise HTTPException(status_code=400, detail="Username/email is required")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Admin → direct token
    if user.role == "admin":
        token = create_token({"user_id": user.id, "role": user.role})
        return {
            "access_token": token,
            "user": {
                "fullName": user.email.split("@")[0],
                "role": user.role,
            }
        }

    # Regular user → OTP flow
    otp = generate_otp()
    user.otp = otp
    user.otp_expiry = datetime.utcnow() + timedelta(minutes=5)
    db.commit()

    # In production: send OTP via SMS/email; here we return it so OTP.jsx can verify
    return {
        "message": "OTP sent",
        "otp": otp,          # remove in production
        "email": user.email,
        "user": {"fullName": user.email.split("@")[0], "role": user.role},
    }


# ─── POST /signup  (Signup.jsx) ──────────────────────────────────────────────

@router.post("/signup")
def signup_bridge(data: SignupPayload, db: Session = Depends(get_db)):
    """
    Signup.jsx POSTs to /signup with { fullName, email, phone, bloodGroup, password }.
    Creates a User record, then a Donor profile linked to that user.
    """
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=data.email,
        password=hash_password(data.password),
        role="user",
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create a Donor profile automatically on signup
    if data.bloodGroup:
        donor = Donor(
            user_id=new_user.id,
            blood_group=data.bloodGroup,
            location="",
        )
        db.add(donor)
        db.commit()

    return {"message": "Account created successfully", "email": new_user.email}


# ─── GET /users/me  (DonorDashboard.jsx, DonorProfile.jsx) ──────────────────

@router.get("/users/me")
def get_me(db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    donor = db.query(Donor).filter(Donor.user_id == user_id).first()

    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "fullName": user.email.split("@")[0],   # placeholder until fullName column added
        "bloodGroup": donor.blood_group if donor else "",
        "location": donor.location if donor else "",
        "is_available": donor.available if donor else False,
        "memberSince": "2024",
        "totalDonations": 0,
        "livesSaved": 0,
        "nextEligibility": "Available Now",
    }


# ─── PUT /users/update-profile  (DonorProfile.jsx) ──────────────────────────

@router.put("/users/update-profile")
def update_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    donor = db.query(Donor).filter(Donor.user_id == user_id).first()

    if donor and data.bloodGroup:
        donor.blood_group = data.bloodGroup
        db.commit()

    return {"message": "Profile updated successfully"}


# ─── POST /users/update-avatar  (DonorProfile.jsx) ──────────────────────────

@router.post("/users/update-avatar")
async def update_avatar(
    avatar: UploadFile = File(...),
    user_id: int = Depends(get_current_user_id),
):
    """
    Stub endpoint — accepts the file upload without error.
    Integrate with S3 / local storage as needed.
    """
    return {"message": "Avatar received", "filename": avatar.filename}


# ─── POST /users/update-availability  (DonorDashboard.jsx) ──────────────────

@router.post("/users/update-availability")
def update_availability(
    data: AvailabilityUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    donor = db.query(Donor).filter(Donor.user_id == user_id).first()
    if not donor:
        raise HTTPException(status_code=404, detail="Donor profile not found")

    donor.available = data.is_available
    db.commit()

    return {"is_available": donor.available}


# ─── GET /admin/inventory  (api.js / AdminDashboard.jsx) ─────────────────────

@router.get("/admin/inventory")
def admin_inventory(db: Session = Depends(get_db)):
    """
    Returns blood group inventory summary.
    Aggregates available donors by blood group as a proxy for inventory.
    The other backend dev will own the real inventory table — this bridges for now.
    """
    donors = db.query(Donor).filter(Donor.available == True).all()

    groups: dict = {}
    for d in donors:
        bg = d.blood_group or "Unknown"
        groups[bg] = groups.get(bg, 0) + 1

    return [{"bloodType": bg, "units": count} for bg, count in groups.items()]


# ─── GET /admin/users  (api.js mock target) ───────────────────────────────────

@router.get("/admin/users")
def admin_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    result = []
    for u in users:
        donor = db.query(Donor).filter(Donor.user_id == u.id).first()
        result.append({
            "id": u.id,
            "name": u.email.split("@")[0],
            "fullName": u.email.split("@")[0],
            "email": u.email,
            "bloodGroup": donor.blood_group if donor else "—",
            "blood": donor.blood_group if donor else "—",
            "role": u.role.capitalize(),
            "status": "active",
        })
    return result


# ─── /api/users routes  (AdminUserRecords.jsx uses localhost:5174/api/users) ─
# We serve the same data at /api/users on the FastAPI backend port (8000)

@router.get("/api/users")
def api_users(db: Session = Depends(get_db)):
    return admin_users(db)


@router.patch("/api/users/{user_id}/status")
def patch_user_status(
    user_id: int,
    data: UserStatusUpdate,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Status is a UI concept for now; store in role or a future column
    return {"id": user_id, "status": data.status}


@router.put("/api/users/{user_id}")
def update_user(
    user_id: int,
    data: AdminUserUpdate,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if data.email:
        user.email = data.email
    if data.role:
        user.role = data.role.lower()

    donor = db.query(Donor).filter(Donor.user_id == user_id).first()
    if donor and data.blood:
        donor.blood_group = data.blood

    db.commit()
    return {"message": "User updated"}


@router.delete("/api/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}


# ─── POST /api/blood-request  (Request.jsx posts multipart here) ─────────────

@router.post("/api/blood-request")
async def blood_request(db: Session = Depends(get_db)):
    """
    Request.jsx sends a multipart/form-data payload to this endpoint.
    The other backend dev owns the BloodRequest model/table.
    This stub accepts the request and returns success so the frontend works.
    Replace with real DB insert once the shared model is available.
    """
    return {"message": "Blood request received and is being processed"}


# ─── GET /donations/my-history  (DonorDashboard.jsx) ────────────────────────

@router.get("/donations/my-history")
def my_donation_history(user_id: int = Depends(get_current_user_id)):
    """
    Stub — donation history belongs to the other backend dev's domain.
    Returns empty list so the frontend renders gracefully.
    """
    return []


# ─── GET /camps/upcoming  (DonorDashboard.jsx) ───────────────────────────────

@router.get("/camps/upcoming")
def upcoming_camps(db: Session = Depends(get_db)):
    """
    Returns upcoming camps in the shape DonorDashboard.jsx expects:
    { id, month, day, location, time, distance }
    """
    from app.models import Camp
    import datetime as dt

    today = dt.date.today()
    camps = db.query(Camp).filter(Camp.status == "upcoming").all()

    result = []
    for c in camps:
        result.append({
            "id": c.id,
            "month": c.camp_date.strftime("%b").upper() if c.camp_date else "",
            "day": str(c.camp_date.day) if c.camp_date else "",
            "location": c.title,
            "time": "09:00 AM - 04:00 PM",
            "distance": "Nearby",
        })
    return result


# ─── POST /verify-otp  (OTP.jsx calls this endpoint) ─────────────────────────

@router.post("/verify-otp")
def verify_otp_bridge(data: OTPVerify, db: Session = Depends(get_db)):
    """
    OTP.jsx POSTs to /verify-otp with { email, otp }.
    Validates the OTP and returns a JWT token on success.
    """
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.otp:
        raise HTTPException(status_code=400, detail="No OTP was requested. Please log in again.")

    if user.otp != data.otp:
        raise HTTPException(status_code=401, detail="Invalid OTP. Please try again.")

    if user.otp_expiry is None or datetime.utcnow() > user.otp_expiry:
        raise HTTPException(status_code=401, detail="OTP has expired. Please log in again.")

    # Clear OTP after successful use
    user.otp = None
    user.otp_expiry = None
    db.commit()

    token = create_token({"user_id": user.id, "role": user.role})
    return {
        "message": "Login successful",
        "access_token": token,
        "role": user.role,
    }
