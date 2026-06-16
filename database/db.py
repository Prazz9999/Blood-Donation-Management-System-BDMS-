from sqlalchemy import create_engine

DATABASE_URL = "postgresql://evyaanyadav@localhost:5432/blood_donation_db"

engine = create_engine(DATABASE_URL)