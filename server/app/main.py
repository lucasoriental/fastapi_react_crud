# First time installing and Using Fast API with: Python
# venv\Scripts\activate - Command to prevent any global installation or issues
# uvicorn app.main:app --reload -> to run the API

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, database
from fastapi.middleware.cors import CORSMiddleware

from app.models import Base
from app.database import engine

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite qualquer origem — cuidado em produção!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


# Dependency to get the DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Register a new sale
@app.post("/sales/")
def register_sale(
    item: str, unit_price: int, total: int, db: Session = Depends(get_db)
):
    return crud.create_sale(db=db, item=item, unit_price=unit_price, total=total)


@app.get("/sales/{sale_id}")
def get_sale(sale_id: int, db: Session = Depends(get_db)):
    db_sale = crud.get_sale(db=db, sale_id=sale_id)
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    return db_sale


@app.get("/sales/")
def get_sales(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_sales(db=db, skip=skip, limit=limit)


@app.put("/sales/{sale_id}")
def update_sale(
    sale_id: int, item: str, unit_price: int, total: int, db: Session = Depends(get_db)
):
    db_sale = crud.update_sale(
        db=db, sale_id=sale_id, item=item, unit_price=unit_price, total=total
    )
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    return db_sale


@app.delete("/sales/{sale_id}")
def delete_sale(sale_id: int, db: Session = Depends(get_db)):
    db_sale = crud.delete_sale(db=db, sale_id=sale_id)
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    return db_sale
