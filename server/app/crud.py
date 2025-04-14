from sqlalchemy.orm import Session
from . import models

# Create Function (Create R.U.D.)
def create_sale(db: Session, item: str, unit_price: int, total: int):
    db_sale = models.Sale(item=item, unit_price=unit_price, total=total)
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

# Read (Get by ID) [C. Read U.D.]
def get_sale(db: Session, sale_id: int):
    return db.query(models.Sale).filter(models.Sale.id == sale_id).first()

# Read (Get All) [C. Read U.D.]
def get_sales(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Sale).offset(skip).limit(limit).all()

# Update (C.R. Update D.)
def update_sale(db: Session, sale_id: int, item: str, unit_price: int, total: int):
    db_sale = db.query(models.Sale).filter(models.Sale.id == sale_id).first()
    if db_sale:
        db_sale.item = item
        db_sale.unit_price = unit_price
        db_sale.total = total
        db.commit()
        db.refresh(db_sale)
    return db_sale

# Delete (C.R.U. Delete)
def delete_sale(db: Session, sale_id: int):
    db_sale = db.query(models.Sale).filter(models.Sale.id == sale_id).first()
    if db_sale:
        db.delete(db_sale)
        db.commit()
    return db_sale