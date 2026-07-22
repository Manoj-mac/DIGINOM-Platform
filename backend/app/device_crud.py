from sqlalchemy.orm import Session

from app.device import Device


def register_device(db: Session, employee_id, device_data):

    existing = db.query(Device).filter(
        Device.device_uuid == device_data.device_uuid
    ).first()

    if existing:
        return existing

    primary_device = db.query(Device).filter(
        Device.employee_id == employee_id,
        Device.is_primary == True
    ).first()

    device = Device(

        employee_id=employee_id,

        device_uuid=device_data.device_uuid,

        device_name=device_data.device_name,

        operating_system=device_data.operating_system,

        browser=device_data.browser,

        ip_address=device_data.ip_address,

        is_primary=False if primary_device else True,

        status="ACTIVE"

    )

    db.add(device)

    db.commit()

    db.refresh(device)

    return device

    existing = db.query(Device).filter(
        Device.device_uuid == device_data.device_uuid
    ).first()

    if existing:
        return existing

    device = Device(

        employee_id=employee_id,

        device_uuid=device_data.device_uuid,

        device_name=device_data.device_name,

        operating_system=device_data.operating_system,

        browser=device_data.browser,

        ip_address=device_data.ip_address,

        is_primary=True,

        status="ACTIVE"

    )

    db.add(device)

    db.commit()

    db.refresh(device)

    return device


def get_employee_devices(db: Session, employee_id):

    return db.query(Device).filter(

        Device.employee_id == employee_id

    ).all()


def get_primary_device(db: Session, employee_id):

    return db.query(Device).filter(

        Device.employee_id == employee_id,

        Device.is_primary == True

    ).first()


def make_primary_device(db: Session, device_id, employee_id):

    devices = db.query(Device).filter(

        Device.employee_id == employee_id

    ).all()

    for device in devices:

        device.is_primary = False

    selected = db.query(Device).filter(

        Device.id == device_id,

        Device.employee_id == employee_id

    ).first()

    if not selected:

        return None

    selected.is_primary = True

    db.commit()

    db.refresh(selected)

    return selected


def revoke_device(db: Session, device_id, employee_id):

    device = db.query(Device).filter(

        Device.device_id == device_id,

        Device.employee_id == employee_id

    ).first()

    if not device:

        return None

    device.status = "REVOKED"

    device.is_primary = False

    db.commit()

    db.refresh(device)

    return device