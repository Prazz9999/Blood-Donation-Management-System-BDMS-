from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os

# load env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

print("DATABASE URL:", DATABASE_URL)

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# FIX DATABASE CONNECTION LEAK
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()