from app.models import Employee


def verify_employee(db, diginom_id):

    employee = (
        db.query(Employee)
        .filter(Employee.diginom_id == diginom_id)
        .first()
    )

    if employee is None:
        return None

    return {

        "verified": True,

        "employee_name":
            f"{employee.first_name} {employee.last_name}",

        "diginom_id":
            employee.diginom_id,

        "status":
            employee.status,

        "trust_score":
            94,

        "verification_time":
            "Verified Successfully"

    }