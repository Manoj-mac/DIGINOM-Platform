from app.job_requisition import JobRequisition


def create_job(
    db,
    recruiter_email,
    job_title,
    required_skill,
    minimum_experience,
    openings
):

    job = JobRequisition(
        recruiter_email=recruiter_email,
        job_title=job_title,
        required_skill=required_skill,
        minimum_experience=minimum_experience,
        openings=openings,
        status="OPEN"
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return job


def get_jobs(db):

    return db.query(
        JobRequisition
    ).all()


def get_job_by_id(
    db,
    job_id
):

    return db.query(
        JobRequisition
    ).filter(
        JobRequisition.job_id == job_id
    ).first()


def update_job_status(
    db,
    job_id,
    status
):

    job = db.query(
        JobRequisition
    ).filter(
        JobRequisition.job_id == job_id
    ).first()

    if not job:
        return None

    job.status = status

    db.commit()
    db.refresh(job)

    return job


def delete_job(
    db,
    job_id
):

    job = db.query(
        JobRequisition
    ).filter(
        JobRequisition.job_id == job_id
    ).first()

    if not job:
        return None

    db.delete(job)
    db.commit()

    return {
        "message": "Job deleted successfully"
    }