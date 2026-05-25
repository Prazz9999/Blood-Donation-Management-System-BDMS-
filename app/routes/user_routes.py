from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from passlib.context import CryptContext

from app.auth import create_access_token, verify_token

from app.database import get_db, SessionLocal
from app.models.user_model import User

from app.schemas.user_schema import (
    UserCreate,
    UserResponse,
    LoginSchema
)

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login"
)

def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    payload = verify_token(token)

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return payload


# SIGNUP
@router.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    new_user = User(
        name=user.name,
        email=user.email,
        password=pwd_context.hash(user.password),
        role=user.role,
        age=user.age,
        phone=user.phone,
        blood_group=user.blood_group
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }


# LOGIN
@router.post("/login")
def login(
    user: LoginSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:

        return {
            "message": "Invalid email or password"
        }

    password_check = pwd_context.verify(
        user.password,
        existing_user.password
    )

    if not password_check:

        return {
            "message": "Invalid email or password"
        }

    access_token = create_access_token(
        data={
            "sub": existing_user.email,
            "role": existing_user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": existing_user.role
    }


# GET USERS (PROTECTED)
@router.get("/users", response_model=list[UserResponse])
def get_users(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    users = db.query(User).all()

    return users


# UPDATE USER
@router.put("/users/{user_id}")
def update_user(
    user_id: int,
    name: str,
    email: str,
    role: str,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {"message": "User not found"}

    user.name = name
    user.email = email
    user.role = role

    db.commit()

    db.refresh(user)

    return {
        "message": "User updated successfully",
        "user": user
    }



#toggle api availability
@router.put("/toggle-availability/{user_id}")
def toggle_availability(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {
            "message": "User not found"
        }

    user.available = not user.available

    db.commit()

    db.refresh(user)

    return {
        "message": "Availability updated",
        "available": user.available
    }


# DELETE USER
@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {"message": "User not found"}

    db.delete(user)

    db.commit()

    return {
        "message": "User deleted successfully"
    }

# BAN USER
@router.put("/ban-user/{user_id}")
def ban_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {
            "message": "User not found"
        }

    user.is_banned = True

    db.commit()

    db.refresh(user)

    return {
        "message": "User banned successfully",
        "is_banned": user.is_banned
    }

# UNBAN USER
@router.put("/unban-user/{user_id}")
def unban_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {
            "message": "User not found"
        }

    user.is_banned = False

    db.commit()

    db.refresh(user)

    return {
        "message": "User unbanned successfully",
        "is_banned": user.is_banned
    }

# CHECK ELIGIBILITY if a person satisfies criteria to donate blood
@router.get("/eligibility/{user_id}")
def check_eligibility(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {
            "message": "User not found"
        }

    eligible = (
        user.age >= 18
        and user.available
        and not user.is_banned
    )

    return {
        "user_id": user.id,
        "eligible": eligible
    }
# GET CURRENT LOGGED IN USER
@router.get("/users/me")
def get_current_logged_user(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    return user

# UPDATE AVAILABILITY
@router.post("/users/update-availability")
def update_availability(
    data: dict,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    user.available = data["is_available"]

    db.commit()

    db.refresh(user)

    return {
        "message": "Availability updated",
        "available": user.available
    }

# UPDATE PROFILE
@router.put("/users/update-profile")
def update_profile(
    data: dict,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    user.name = data["fullName"]
    user.email = data["email"]
    user.phone = data["phone"]
    user.blood_group = data["bloodGroup"]
    user.age = int(data["age"])

    db.commit()

    db.refresh(user)

    return {
        "message": "Profile updated successfully"
    }