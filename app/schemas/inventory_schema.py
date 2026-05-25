from pydantic import BaseModel


class InventoryCreate(BaseModel):

    blood_group: str

    units: int