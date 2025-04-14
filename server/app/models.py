# Defining the data models!
# I'm going to use SQLAlchemy to map the database and bring to Python Objects!
# I will also define the structure basing on my purpose: sales

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Sale(Base):
    __tablename__ = 'sales'
    
    id = Column(Integer, primary_key=True, index=True)
    item = Column(String, index=True)
    unit_price = Column(Integer)
    total = Column(Integer)