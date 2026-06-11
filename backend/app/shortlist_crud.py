from app.shortlists import Shortlist


def create_shortlist(
    db,
    recruiter_email,
    employee_id
):
    shortlist = Shortlist(
        recruiter_email=recruiter_email,
        employee_id=employee_id
    )

    db.add(shortlist)
    db.commit()
    db.refresh(shortlist)

    return {
    "shortlist_id": str(shortlist.shortlist_id),
    "recruiter_email": shortlist.recruiter_email,
    "employee_id": shortlist.employee_id,
    "created_at": shortlist.created_at
}


def get_shortlists(
    db,
    recruiter_email
):
    return db.query(
        Shortlist
    ).filter(
        Shortlist.recruiter_email ==
        recruiter_email
    ).all()