from datetime import datetime

from app.offer import Offer

from app.employee_timeline_crud import (
    create_timeline_event
)
from app.notification_crud import (
    create_notification
)

from app.crud import (
    get_employee_by_id
)


def create_offer(
    db,
    offer
):

    new_offer = Offer(

        employee_id=offer.employee_id,

        job_id=offer.job_id,

        offered_salary=offer.offered_salary,

        joining_date=datetime.strptime(
            offer.joining_date,
            "%Y-%m-%d"
        ).date(),

        status="PENDING"
    )

    db.add(new_offer)

    db.commit()

    db.refresh(new_offer)

    create_timeline_event(

        db,

        str(
            new_offer.employee_id
        ),

        "OFFER_SENT",

        "Offer sent to candidate"
    )

    employee = get_employee_by_id(

        db,

        str(
            new_offer.employee_id
        )
    )

    if employee:

        create_notification(

            db,

            employee.email,

            "Offer Generated",

            "A new offer has been generated."
        )

    return {

        "offer_id":
            str(
                new_offer.offer_id
            ),

        "employee_id":
            str(
                new_offer.employee_id
            ),

        "job_id":
            str(
                new_offer.job_id
            ),

        "offered_salary":
            float(
                new_offer.offered_salary
            ),

        "joining_date":
            str(
                new_offer.joining_date
            ),

        "status":
            new_offer.status
    }
    db,
    offer


    new_offer = Offer(

        employee_id=offer.employee_id,

        job_id=offer.job_id,

        offered_salary=offer.offered_salary,

        joining_date=datetime.strptime(
            offer.joining_date,
            "%Y-%m-%d"
        ).date(),

        status="PENDING"
    )

    db.add(new_offer)

    db.commit()

    db.refresh(new_offer)
    

    create_timeline_event(

    db,

    new_offer.employee_id,

    "OFFER_SENT",

    "Offer sent to candidate"
)

    return {

        "offer_id":
            str(new_offer.offer_id),

        "employee_id":
            str(new_offer.employee_id),

        "job_id":
            str(new_offer.job_id),

        "offered_salary":
            float(
                new_offer.offered_salary
            ),

        "joining_date":
            str(
                new_offer.joining_date
            ),

        "status":
            new_offer.status
    }


def get_offers(db):

    return db.query(
        Offer
    ).all()


def get_offer_by_id(
    db,
    offer_id
):

    return db.query(
        Offer
    ).filter(
        Offer.offer_id ==
        offer_id
    ).first()


def update_offer(
    db,
    offer_id,
    offer_data
):

    offer = get_offer_by_id(
        db,
        offer_id
    )

    if not offer:
        return None

    offer.status = (
        offer_data.status
    )

    db.commit()

    db.refresh(offer)

    return {

        "offer_id":
            str(offer.offer_id),

        "employee_id":
            str(offer.employee_id),

        "job_id":
            str(offer.job_id),

        "offered_salary":
            float(
                offer.offered_salary
            ),

        "joining_date":
            str(
                offer.joining_date
            ),

        "status":
            offer.status
    }


def delete_offer(
    db,
    offer_id
):

    offer = get_offer_by_id(
        db,
        offer_id
    )

    if not offer:
        return None

    db.delete(offer)

    db.commit()

    return {
        "message":
        "Offer deleted successfully"
    }