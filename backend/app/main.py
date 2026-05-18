"""
main.py — FastAPI application entry point.
Frontend integration: users.py bridges all frontend-facing URLs.
CORS allows Vite dev ports 5173 and 5174.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_routes import router as auth_router

from app.database import engine
from app.models import Base

from app.routes import (
    auth, donor, seeker, eligibility, availability,
    camp, camp_registration, geo, chat, users,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Blood Donation Management System",
    description="API for managing blood donors, seekers, camps, geolocation and AI chat.",
    version="1.0.0",
)
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Frontend bridge first (flat routes: /login, /signup, /api/*, /users/*)
app.include_router(users.router)

# Core domain routers
app.include_router(auth.router)
app.include_router(donor.router)
app.include_router(seeker.router)
app.include_router(eligibility.router)
app.include_router(availability.router)
app.include_router(camp.router)
app.include_router(camp_registration.router)
app.include_router(geo.router)
app.include_router(chat.router)


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "BDMS API is running"}

