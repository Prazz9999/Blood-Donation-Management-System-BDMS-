from pydantic import BaseModel, EmailStr


# request schema
class UserCreate(BaseModel):

    name: str
    email: EmailStr
    password: str
    role: str

    age: int | None = None
    phone: str | None = None
    blood_group: str | None = None



# response schema
class UserResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    role: str

    age: int

    phone: str

    blood_group: str

    available: bool

    is_banned: bool

    class Config:
        from_attributes = True


class LoginSchema(BaseModel):
    email: EmailStr
    password: str