from datetime import datetime
from app.verification_requests import VerificationRequest


def create_verification_request(
    db,
    request_data,
    requested_by
):
    request = VerificationRequest(
        employee_id=request_data.employee_id,
        verification_type=request_data.verification_type,
        entity_id=request_data.entity_id,
        requested_by=requested_by
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    return {
        "verification_id": str(
            request.verification_id
        ),
        "status": request.status
    }


def get_verification_requests(db):
    return db.query(
        VerificationRequest
    ).all()


def get_verification_request_by_id(
    db,
    verification_id
):
    return db.query(
        VerificationRequest
    ).filter(
        VerificationRequest.verification_id ==
        verification_id
    ).first()

from datetime import datetime


def approve_verification_request(
    db,
    verification_id,
    verified_by
):
    request = get_verification_request_by_id(
        db,
        verification_id
    )

    if not request:
        return None

    request.status = "APPROVED"
    request.verified_by = verified_by
    request.verified_at = datetime.utcnow()

    db.commit()
    db.refresh(request)

    return request