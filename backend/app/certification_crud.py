from app.certifications import Certification


def create_certification(db, certification):
    new_certification = Certification(
        employee_id=certification.employee_id,
        certification_name=certification.certification_name,
        issuer=certification.issuer,
        issue_date=certification.issue_date,
        expiry_date=certification.expiry_date
    )

    db.add(new_certification)
    db.commit()
    db.refresh(new_certification)

    return {
        "certification_id": str(new_certification.certification_id),
        "employee_id": new_certification.employee_id,
        "certification_name": new_certification.certification_name,
        "issuer": new_certification.issuer,
        "issue_date": str(new_certification.issue_date),
        "expiry_date": str(new_certification.expiry_date) if new_certification.expiry_date else None,
        "verified": new_certification.verified
    }


def get_certifications(db):
    return db.query(Certification).all()


def get_certification_by_id(db, certification_id):
    return db.query(Certification).filter(
        Certification.certification_id == certification_id
    ).first()


def delete_certification(db, certification_id):
    certification = get_certification_by_id(
        db,
        certification_id
    )

    if not certification:
        return None

    db.delete(certification)
    db.commit()

    return {
        "message": "Certification deleted successfully"
    }

def update_certification(
    db,
    certification_id,
    certification_data
):
    certification = get_certification_by_id(
        db,
        certification_id
    )

    if not certification:
        return None

    certification.certification_name = (
        certification_data.certification_name
    )

    certification.issuer = (
        certification_data.issuer
    )

    certification.issue_date = (
        certification_data.issue_date
    )

    certification.expiry_date = (
        certification_data.expiry_date
    )

    certification.verified = (
        certification_data.verified
    )

    db.commit()
    db.refresh(certification)

    return {
        "certification_id": str(
            certification.certification_id
        ),
        "employee_id": certification.employee_id,
        "certification_name":
            certification.certification_name,
        "issuer": certification.issuer,
        "issue_date": str(
            certification.issue_date
        ),
        "expiry_date": str(
            certification.expiry_date
        ) if certification.expiry_date else None,
        "verified": certification.verified
    }