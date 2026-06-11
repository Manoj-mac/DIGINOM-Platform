from app.interview_pipeline import InterviewPipeline
from datetime import datetime


def create_pipeline(
    db,
    recruiter_email,
    employee_id,
    remarks=None
):

    pipeline = InterviewPipeline(
        recruiter_email=recruiter_email,
        employee_id=employee_id,
        stage="SHORTLISTED",
        remarks=remarks
    )

    db.add(pipeline)
    db.commit()
    db.refresh(pipeline)

    return pipeline


def get_pipelines(db):

    return db.query(
        InterviewPipeline
    ).all()


def get_pipeline_by_id(
    db,
    pipeline_id
):

    return db.query(
        InterviewPipeline
    ).filter(
        InterviewPipeline.pipeline_id == pipeline_id
    ).first()


def update_pipeline_stage(
    db,
    pipeline_id,
    stage,
    remarks=None
):

    pipeline = db.query(
        InterviewPipeline
    ).filter(
        InterviewPipeline.pipeline_id == pipeline_id
    ).first()

    if not pipeline:
        return None

    pipeline.stage = stage

    if remarks:
        pipeline.remarks = remarks

    pipeline.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(pipeline)

    return pipeline