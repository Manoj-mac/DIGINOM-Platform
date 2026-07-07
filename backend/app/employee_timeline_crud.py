from app.employee_timeline import (
    EmployeeTimeline
)


def create_timeline_event(

    db,

    employee_id,

    event_type,

    event_description
):

    event = EmployeeTimeline(

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


def get_employee_timeline(

    db,

    employee_id
):

    return db.query(
        EmployeeTimeline
    ).filter(
        EmployeeTimeline.employee_id
        ==
        employee_id
    ).order_by(
        EmployeeTimeline.created_at.desc()
    ).all()