from sqlalchemy import Column, Integer, String

from app.database import Base


class BloodInventory(Base):

    __tablename__ = "blood_inventory"

    id = Column(Integer, primary_key=True, index=True)

    blood_group = Column(String(10), unique=True)

    units = Column(Integer)