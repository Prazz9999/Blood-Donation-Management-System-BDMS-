from pydantic import BaseModel
from datetime import date

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class DonorCreate(BaseModel):
    blood_group: str
    location: str

class DonorUpdate(BaseModel):
    blood_group: str
    location: str

class DonorResponse(BaseModel):
    id: int
    user_id: int
    blood_group: str
    location: str

    class Config:
        orm_mode = True

class EligibilityCheck(BaseModel):
    last_donation_date: date
    health_status: bool


    class SeekerCreate(BaseModel):
    blood_group: str
    location: str

class SeekerUpdate(BaseModel):
    blood_group: str
    location: str
    status: str

class SeekerResponse(BaseModel):
    id: int
    user_id: int
    blood_group: str
    location: str
    status: str

    class Config:
        orm_mode = True