from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas import (
    DeviceCreate,
    DeviceResponse
)

from app.device_crud import (
    register_device,
    get_employee_devices,
    make_primary_device,
    revoke_device
)

from app.dependencies import verify_token

router = APIRouter()


@router.post(
    "/register",
    response_model=DeviceResponse
)
def register_new_device(
    device: DeviceCreate,
    token: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    employee_id = token.get("employee_id")

    if not employee_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    return register_device(
        db,
        employee_id,
        device
    )


@router.get(
    "/me",
    response_model=list[DeviceResponse]
)
def my_devices(
    token: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    employee_id = token.get("employee_id")

    return get_employee_devices(
        db,
        employee_id
    )


@router.patch(
    "/{device_id}/primary",
    response_model=DeviceResponse
)
def set_primary(
    device_id: UUID,
    token: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    employee_id = token.get("employee_id")

    device = make_primary_device(
        db,
        device_id,
        employee_id
    )

    if not device:
        raise HTTPException(
            status_code=404,
            detail="Device not found"
        )

    return device


@router.delete("/{device_id}")
def delete_device(
    device_id: UUID,
    token: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):

    employee_id = token.get("employee_id")

    device = revoke_device(
        db,
        device_id,
        employee_id
    )

    if not device:
        raise HTTPException(
            status_code=404,
            detail="Device not found"
        )

    return {
        "message": "Device revoked successfully"
    }