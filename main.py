from fastapi import FastAPI
from app.routes import auth, donor, eligibility, availability

app = FastAPI()

app.include_router(auth.router)
app.include_router(donor.router)
app.include_router(eligibility.router)
app.include_router(availability.router)

@app.get("/")
def home():
    return {"message": "Blood Donation API Running"}
 from app.routes import camp

app.include_router(camp.router)

from app.routes import camp_registration

app.include_router(
    camp_registration.router
)
