from datetime import datetime

from app.offer import Offer


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