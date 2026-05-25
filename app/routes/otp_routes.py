import random
import os
from dotenv import load_dotenv

load_dotenv()
import smtplib
from email.message import EmailMessage

try:
    from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
    _fastapi_mail_available = True
except ImportError:
    _fastapi_mail_available = False

from fastapi import APIRouter
from pydantic import BaseModel

from app.auth import create_access_token

class SendOTPRequest(BaseModel):
    email: str

class VerifyOTPRequest(BaseModel):
    email: str
    otp: str

router = APIRouter()

# temporary otp storage
otp_store = {}

# email configuration
conf = {
    "MAIL_USERNAME": os.getenv("SMTP_EMAIL"),
    "MAIL_PASSWORD": os.getenv("SMTP_PASSWORD"),
    "MAIL_FROM": os.getenv("SMTP_EMAIL"),
    "MAIL_PORT": 587,
    "MAIL_SERVER": "smtp.gmail.com",
    "MAIL_STARTTLS": True,
    "MAIL_SSL_TLS": False,
    "USE_CREDENTIALS": True
}

if _fastapi_mail_available:
    conf = ConnectionConfig(
        MAIL_USERNAME=conf["MAIL_USERNAME"],
        MAIL_PASSWORD=conf["MAIL_PASSWORD"],
        MAIL_FROM=conf["MAIL_FROM"],
        MAIL_PORT=conf["MAIL_PORT"],
        MAIL_SERVER=conf["MAIL_SERVER"],
        MAIL_STARTTLS=conf["MAIL_STARTTLS"],
        MAIL_SSL_TLS=conf["MAIL_SSL_TLS"],
        USE_CREDENTIALS=conf["USE_CREDENTIALS"]
    )

# SEND OTP
@router.post("/send-otp")
async def send_otp(payload: SendOTPRequest):
    email = payload.email

    otp = str(random.randint(100000, 999999))

    otp_store[email] = otp

    if _fastapi_mail_available:
        message = MessageSchema(
            subject="Your OTP Code",
            recipients=[email],
            body=f"Your OTP is: {otp}",
            subtype="plain"
        )

        fm = FastMail(conf)

        await fm.send_message(message)
    else:
        message = EmailMessage()
        message["Subject"] = "Your OTP Code"
        message["From"] = conf["MAIL_FROM"]
        message["To"] = email
        message.set_content(f"Your OTP is: {otp}")

        server = smtplib.SMTP(conf["MAIL_SERVER"], conf["MAIL_PORT"])
        if conf["MAIL_STARTTLS"]:
            server.starttls()
        if conf["USE_CREDENTIALS"]:
            server.login(conf["MAIL_USERNAME"], conf["MAIL_PASSWORD"])
        server.send_message(message)
        server.quit()

    return {
        "message": "OTP sent successfully"
    }


# VERIFY OTP
@router.post("/verify-otp")
def verify_otp(payload: VerifyOTPRequest):
    email = payload.email
    otp = payload.otp

    stored_otp = otp_store.get(email)

    if not stored_otp:

        return {
            "message": "OTP expired or not found"
        }

    if stored_otp != otp:

        return {
            "message": "Invalid OTP"
        }

    access_token = create_access_token(
        data={
            "sub": email
        }
    )

    del otp_store[email]

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }