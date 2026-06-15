from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)


def generate_offer_letter(
    filename,
    employee_name,
    job_title,
    salary,
    joining_date
):

    pdf = SimpleDocTemplate(
        filename
    )

    styles = getSampleStyleSheet()

    content = [

        Paragraph(
            "DIGINOM OFFER LETTER",
            styles["Title"]
        ),

        Spacer(
            1,
            20
        ),

        Paragraph(
            f"Dear {employee_name},",
            styles["Normal"]
        ),

        Spacer(
            1,
            10
        ),

        Paragraph(
            f"We are pleased to offer you the position of {job_title}.",
            styles["Normal"]
        ),

        Spacer(
            1,
            10
        ),

        Paragraph(
            f"Annual Compensation: ₹{salary}",
            styles["Normal"]
        ),

        Spacer(
            1,
            10
        ),

        Paragraph(
            f"Joining Date: {joining_date}",
            styles["Normal"]
        ),

        Spacer(
            1,
            20
        ),

        Paragraph(
            "Welcome to DIGINOM.",
            styles["Normal"]
        )
    ]

    pdf.build(content)

    return filename