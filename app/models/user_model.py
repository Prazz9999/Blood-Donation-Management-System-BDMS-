from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

# User model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100))

    age = Column(Integer, default=18)

    email = Column(String(100), unique=True)

    password = Column(String(200))

    phone = Column(String(20))

    blood_group = Column(String(10))

    role = Column(String(20))

    is_banned = Column(Boolean, default=False)

    available = Column(Boolean, default=True)