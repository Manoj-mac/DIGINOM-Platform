from app.certifications import Certification

from app.employee_timeline_crud import (
    create_timeline_event
)

from app.notification_crud import (
    create_notification
)
from app.models import Employee

from app.crud import (
    get_employee_by_id
)
def create_certification(
    db,
    certification
):

    new_certification = Certification(

        employee_id=
            certification.employee_id,

        certification_name=
            certification.certification_name,

        issuer=
            certification.issuer,

        issue_date=
            certification.issue_date,

        expiry_date=
            certification.expiry_date
    )

    db.add(
        new_certification
    )

    db.commit()

    db.refresh(
        new_certification
    )

    create_timeline_event(

        db,

        certification.employee_id,

        "CERTIFICATION_ADDED",

        f"Certification added: {certification.certification_name}"
    )

    employee = get_employee_by_id(

        db,

        certification.employee_id
    )

    if employee:

        create_notification(

            db,

            employee.email,

            "Certification Added",

            f"{certification.certification_name} added successfully."
        )

    return {

        "certification_id":
            str(
                new_certification.certification_id
            ),

        "employee_id":
            new_certification.employee_id,

        "certification_name":
            new_certification.certification_name,

        "issuer":
            new_certification.issuer,

        "issue_date":
            str(
                new_certification.issue_date
            ),

        "expiry_date":
            str(
                new_certification.expiry_date
            ) if new_certification.expiry_date else None,

        "verified":
            new_certification.verified
    }



def get_certifications(db):

    certifications = db.query(
        Certification
    ).all()

    result = []

    for certification in certifications:

        employee = db.query(Employee).filter(
            Employee.employee_id ==
            certification.employee_id
        ).first()

        result.append({

            "certification_id":
                str(certification.certification_id),

            "employee_id":
                str(certification.employee_id),

            "employee_name":
                f"{employee.first_name} {employee.last_name}"
                if employee else "Unknown",

            "certification_name":
                certification.certification_name,

            "issuer":
                certification.issuer,

            "issue_date":
                str(certification.issue_date),

            "expiry_date":
                str(certification.expiry_date)
                if certification.expiry_date
                else None,

            "verified":
                certification.verified
        })

    return result

def get_certification_by_id(
    db,
    certification_id
):

    return db.query(
        Certification
    ).filter(
        Certification.certification_id
        ==
        certification_id
    ).first()


def delete_certification(
    db,
    certification_id
):

    certification = get_certification_by_id(
            db,
            certification_id
        )

    if not certification:
        return None

    db.delete(
        certification
    )

    db.commit()

    return {
        "message":
        "Certification deleted successfully"
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

    db.refresh(
        certification
    )

    return {

        "certification_id":
            str(
                certification.certification_id
            ),

        "employee_id":
            certification.employee_id,

        "certification_name":
            certification.certification_name,

        "issuer":
            certification.issuer,

        "issue_date":
            str(
                certification.issue_date
            ),

        "expiry_date":
            str(
                certification.expiry_date
            ) if certification.expiry_date else None,

        "verified":
            certification.verified
    }