from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy import Column, Integer, String

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    role = Column(String, default="user")   # user / admin

class Seeker(Base):
    __tablename__ = "requests"   # matches your DB table

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    blood_group = Column(String)
    location = Column(String)
    status = Column(String, default="pending")   # pending / fulfilled

class Donor(Base):
    __tablename__ = "donors"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    blood_group = Column(String)
    location = Column(String)