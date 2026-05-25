from pydantic import BaseModel


class RequestCreate(BaseModel):

    patient_name: str

    blood_group: str

    hospital: str

    units: int