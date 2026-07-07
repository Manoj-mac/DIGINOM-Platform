from datetime import datetime

from app.interview import Interview

from app.employee_timeline_crud import (
    create_timeline_event
)

from app.notification_crud import (
    create_notification
)

from app.crud import (
    get_employee_by_id
)


def create_interview(
    db,
    interview,
    recruiter_email
):

    new_interview = Interview(

        employee_id=interview.employee_id,

        job_id=interview.job_id,

        interviewer_email=recruiter_email,

        interview_date=datetime.strptime(
            interview.interview_date,
            "%Y-%m-%d"
        ).date(),

        interview_type=interview.interview_type,

        status="SCHEDULED",

        feedback=""
    )

    db.add(new_interview)

    db.commit()

    db.refresh(new_interview)

    create_timeline_event(

        db,

        new_interview.employee_id,

        "INTERVIEW_SCHEDULED",

        "Interview scheduled"
    )

    employee = get_employee_by_id(

        db,

        str(new_interview.employee_id)
    )

    if employee:

        create_notification(

            db,

            employee.email,

            "Interview Scheduled",

            "Your interview has been scheduled."
        )

    return {

        "interview_id":
            str(new_interview.interview_id),

        "employee_id":
            str(new_interview.employee_id),

        "job_id":
            str(new_interview.job_id),

        "interviewer_email":
            new_interview.interviewer_email,

        "interview_date":
            str(new_interview.interview_date),

        "interview_type":
            new_interview.interview_type,

        "status":
            new_interview.status,

        "feedback":
            new_interview.feedback
    }


def get_interviews(db):

    return db.query(
        Interview
    ).all()


def get_interview_by_id(
    db,
    interview_id
):

    return db.query(
        Interview
    ).filter(
        Interview.interview_id ==
        interview_id
    ).first()


def update_interview(
    db,
    interview_id,
    interview_data
):

    interview = get_interview_by_id(
        db,
        interview_id
    )

    if not interview:
        return None

    interview.status = (
        interview_data.status
    )

    interview.feedback = (
        interview_data.feedback
    )

    db.commit()

    db.refresh(interview)

    return {

        "interview_id":
            str(interview.interview_id),

        "employee_id":
            str(interview.employee_id),

        "job_id":
            str(interview.job_id),

        "interviewer_email":
            interview.interviewer_email,

        "interview_date":
            str(interview.interview_date),

        "interview_type":
            interview.interview_type,

        "status":
            interview.status,

        "feedback":
            interview.feedback
    }


def delete_interview(
    db,
    interview_id
):

    interview = get_interview_by_id(
        db,
        interview_id
    )

    if not interview:
        return None

    db.delete(interview)

    db.commit()

    return {

        "message":
        "Interview deleted successfully"
    }