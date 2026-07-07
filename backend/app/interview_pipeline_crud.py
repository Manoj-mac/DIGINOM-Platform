from app.interview import Interview


def get_pipeline_stats(
    db
):

    interviews = db.query(
        Interview
    ).all()

    stats = {

        "Applied": 0,
        "Screening": 0,
        "Technical": 0,
        "HR": 0,
        "Selected": 0,
        "Rejected": 0
    }

    for interview in interviews:

        status = (
            interview.status
            or ""
        ).upper()

        if status == "APPLIED":
            stats["Applied"] += 1

        elif status == "SCREENING":
            stats["Screening"] += 1

        elif status == "TECHNICAL":
            stats["Technical"] += 1

        elif status == "HR":
            stats["HR"] += 1

        elif status == "SELECTED":
            stats["Selected"] += 1

        elif status == "REJECTED":
            stats["Rejected"] += 1

    return stats

def create_pipeline(
    db,
    pipeline_data
):
    return {
        "message":
        "Pipeline created"
    }


def get_pipelines(
    db
):
    return []


def update_pipeline_stage(
    db,
    pipeline_id,
    stage
):
    return {
        "message":
        "Pipeline updated"
    }