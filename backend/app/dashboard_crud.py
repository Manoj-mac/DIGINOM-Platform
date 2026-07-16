from app.models import Employee

from app.skills import Skill

from app.certifications import Certification

from app.documents import Document

from app.trust_score_crud import calculate_trust_score


def get_employee_dashboard_summary(
    db,
    employee_id
):

    employee = db.query(Employee).filter(

        Employee.employee_id == employee_id

    ).first()

    if not employee:

        return None

    verified_skills = db.query(Skill).filter(

        Skill.employee_id == employee_id,

        Skill.verified == True

    ).count()

    verified_certifications = db.query(

        Certification

    ).filter(

        Certification.employee_id == employee_id,

        Certification.verified == True

    ).count()

    verified_documents = db.query(Document).filter(

        Document.employee_id == employee_id,

        Document.verified == True

    ).count()

    trust_score = calculate_trust_score(

        db,

        employee_id

    )

    return {

        "employee_id":
            str(employee.employee_id),

        "name":
            f"{employee.first_name} {employee.last_name}",

        "verified_skills":
            verified_skills,

        "verified_certifications":
            verified_certifications,

        "verified_documents":
            verified_documents,

        "employment_status":
            employee.status,

        "trust_score":
            trust_score

    }