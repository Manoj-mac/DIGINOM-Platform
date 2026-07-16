from app.models import Employee
from app.skills import Skill
from app.certifications import Certification
from app.documents import Document
from app.resume import Resume
from app.employment_history import EmploymentHistory


def get_profile_completion(
    db,
    employee_id
):

    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

    if not employee:
        return None

    checks = {

        "Personal Information":

            bool(
                employee.first_name
                and
                employee.last_name
                and
                employee.email
            ),

        "Employment History":

            db.query(
                EmploymentHistory
            ).filter(

                EmploymentHistory.employee_id
                ==
                employee_id

            ).count() > 0,

        "Skills":

            db.query(
                Skill
            ).filter(

                Skill.employee_id
                ==
                employee_id

            ).count() > 0,

        "Certifications":

            db.query(
                Certification
            ).filter(

                Certification.employee_id
                ==
                employee_id

            ).count() > 0,

        "Resume":

            db.query(
                Resume
            ).filter(

                Resume.employee_id
                ==
                employee_id

            ).count() > 0,

        "Documents":

            db.query(
                Document
            ).filter(

                Document.employee_id
                ==
                employee_id

            ).count() > 0,

        "Profile Photo":

            bool(
                employee.photo_url
            ),

        "Primary Device":

            bool(
                employee.primary_device_verified
            )

    }

    completed = sum(checks.values())

    total = len(checks)

    percentage = round(

        completed
        /
        total
        *
        100

    )

    return {

        "percentage":
            percentage,

        "checks":
            checks

    }