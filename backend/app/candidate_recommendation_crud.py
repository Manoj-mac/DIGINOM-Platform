from app.crud import get_employees
from app.job_requisition_crud import get_job_by_id

from app.skills import Skill
from app.certifications import Certification
from app.interview import Interview
from app.offer import Offer



def get_candidate_recommendations(
    db,
    job_id
):

    job = get_job_by_id(
        db,
        job_id
    )

    if not job:
        return []

    employees = get_employees(
        db
    )

    recommendations = []

    for employee in employees:

        score = 0

        employee_id = str(
            employee.employee_id
        )

        # Skill Match (40)

        employee_skills = db.query(
            Skill
        ).filter(
            Skill.employee_id
            ==
            employee_id
        ).all()

        skill_names = [

            skill.skill_name.lower()

            for skill in employee_skills
        ]

        if (
            job.required_skill
            and
            job.required_skill.lower()
            in skill_names
        ):
            score += 40

        # Trust Score (25)

        trust_score = getattr(
            employee,
            "trust_score",
            0
        )

        score += min(
            int(
                trust_score / 4
            ),
            25
        )

        # Certifications (15)

        certifications = db.query(
            Certification
        ).filter(
            Certification.employee_id
            ==
            employee_id
        ).all()

        if certifications:
            score += 15

        # Interview Score (10)

        interviews = db.query(
            Interview
        ).filter(
            Interview.employee_id
            ==
            employee_id
        ).all()

        for interview in interviews:

            if (
                interview.status
                ==
                "PASSED"
            ):
                score += 10
                break

        # Offer Score (10)

        offers = db.query(
            Offer
        ).filter(
            Offer.employee_id
            ==
            employee_id
        ).all()

        for offer in offers:

            if (
                offer.status
                ==
                "ACCEPTED"
            ):
                score += 10
                break

        recommendations.append({

            "employee_id":
                employee_id,

            "employee_name":
                employee.first_name,

            "email":
                employee.email,

            "score":
                score
        })

    recommendations.sort(

        key=lambda x:
        x["score"],

        reverse=True
    )

    return recommendations