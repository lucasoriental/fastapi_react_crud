from databases import Database
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./sales.db" #SQLite database URL

# Create the database engine
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create the database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# The base class for our models
Base = declarative_base

# Create a Database instance for async usage (optional for FastAPI async setup)
database = Database(SQLALCHEMY_DATABASE_URL)