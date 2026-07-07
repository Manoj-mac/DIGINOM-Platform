from app.employment_history import EmploymentHistory



def create_employment_history(db, history):
    new_history = EmploymentHistory(
        employee_id=history.employee_id,
        company_id=history.company_id,
        role=history.role,
        start_date=history.start_date,
        end_date=history.end_date,
        status=history.status
    )

    db.add(new_history)
    db.commit()
    db.refresh(new_history)

    return new_history


def get_employment_history(db):
    return db.query(EmploymentHistory).all()


def get_employment_history_by_id(
    db,
    history_id
):
    return db.query(
        EmploymentHistory
    ).filter(
        EmploymentHistory.history_id == history_id
    ).first()


def create_history_event(

    db,

    employee_id,

    event_type,

    event_description
):

    event = EmploymentHistory(

        employee_id=
            employee_id,

        event_type=
            event_type,

        event_description=
            event_description
    )

    db.add(
        event
    )

    db.commit()

    return event


