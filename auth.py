from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import random


def generate_otp():
    return str(random.randint(100000, 999999))

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"])

#   hash password
def hash_password(password: str):
    return pwd_context.hash(password)

#   verify password
def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

#   create JWT token
def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserLogin
from app.auth import hash_password, verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Auth"])


#   REGISTER
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    
    # check existing email
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    #   limit admin to 3
    if user.role == "admin":
        admin_count = db.query(User).filter(User.role == "admin").count()

        if admin_count >= 3:
            raise HTTPException(
                status_code=403,
                detail="Maximum 3 admins allowed"
            )

    # create user
    new_user = User(
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "role": new_user.role
    }


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database import get_db
from app.models import User
from app.schemas import UserLogin, OTPVerify
from app.auth import (
    verify_password,
    create_token,
    generate_otp
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


#   STEP 1
# Email + Password
@router.post("/login")
def login(
    data: UserLogin,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        data.password,
        user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    # 👑 ADMIN LOGIN DIRECTLY
    if user.role == "admin":

        token = create_token({
            "user_id": user.id,
            "role": user.role
        })

        return {
            "message": "Admin login successful",
            "access_token": token,
            "role": "admin"
        }

    # 👤 USER → OTP FLOW
    otp = generate_otp()

    user.otp = otp
    user.otp_expiry = (
        datetime.utcnow()
        + timedelta(minutes=5)
    )

    db.commit()

    return {
        "message": "OTP generated",
        "otp": otp
    }


#   STEP 2
# Verify OTP
@router.post("/verify-otp")
def verify_otp(
    data: OTPVerify,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.otp != data.otp:
        raise HTTPException(
            status_code=401,
            detail="Invalid OTP"
        )

    if datetime.utcnow() > user.otp_expiry:
        raise HTTPException(
            status_code=401,
            detail="OTP expired"
        )

    # clear OTP
    user.otp = None
    user.otp_expiry = None

    db.commit()

    token = create_token({
        "user_id": user.id,
        "role": user.role
    })

    return {
        "message": "Login successful",
        "access_token": token,
        "role": user.role
    }