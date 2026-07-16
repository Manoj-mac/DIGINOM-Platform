from app.models import Employee


def get_employee_identity(db, employee_id):

    employee = (
        db.query(Employee)
        .filter(Employee.employee_id == employee_id)
        .first()
    )

    if employee is None:
        return None

    return {

        "employee": {

            "employee_id": str(employee.employee_id),

            "diginom_id": employee.diginom_id,

            "name": f"{employee.first_name} {employee.last_name}",

            "email": employee.email,

            "mobile": employee.mobile,

            "photo_url": employee.photo_url,

            "location": {

                "city": employee.city,

                "state": employee.state,

                "country": employee.country

            },

            "status": employee.status

        },

        "trust_score": 94,

        "profile_completion": 92,

        "verification": {

            "identity": True,

            "documents": True,

            "skills": True,

            "certifications": False

        },

        "security": {

            "primary_device": True,

            "device_name": "Windows 11",

            "last_login": "Today"

        }

    }