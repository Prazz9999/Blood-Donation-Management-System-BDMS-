from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.inventory_model import BloodInventory
from app.schemas.inventory_schema import InventoryCreate

router = APIRouter()


# create inventory
@router.post("/inventory")
def create_inventory(
    inventory: InventoryCreate,
    db: Session = Depends(get_db)
):

    new_inventory = BloodInventory(
        blood_group=inventory.blood_group,
        units=inventory.units
    )

    db.add(new_inventory)

    db.commit()

    db.refresh(new_inventory)

    return {
        "message": "Inventory added successfully",
        "inventory_id": new_inventory.id
    }


# get inventory
@router.get("/inventory")
def get_inventory(db: Session = Depends(get_db)):

    inventory = db.query(BloodInventory).all()

    return inventory


#updates inventory
@router.put("/inventory/{inventory_id}")
def update_inventory(
    inventory_id: int,
    blood_group: str,
    units: int,
    db: Session = Depends(get_db)
):

    inventory = db.query(BloodInventory).filter(
        BloodInventory.id == inventory_id
    ).first()

    if not inventory:

        return {"message": "Inventory not found"}

    inventory.blood_group = blood_group
    inventory.units = units

    db.commit()

    db.refresh(inventory)

    return {
        "message": "Inventory updated successfully",
        "inventory": inventory
    }

#delete inventory
@router.delete("/inventory/{inventory_id}")
def delete_inventory(
    inventory_id: int,
    db: Session = Depends(get_db)
):

    inventory = db.query(BloodInventory).filter(
        BloodInventory.id == inventory_id
    ).first()

    if not inventory:

        return {"message": "Inventory not found"}

    db.delete(inventory)

    db.commit()

    return {
        "message": "Inventory deleted successfully"
    }

# low stock alert
@router.get("/inventory/low-stock")
def low_stock_alert(db: Session = Depends(get_db)):

    low_stock = db.query(BloodInventory).filter(
        BloodInventory.units < 5
    ).all()

    return {
        "low_stock_inventory": low_stock
    }