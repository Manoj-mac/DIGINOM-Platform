import re
import pdfplumber
import uuid

from app.resume import Resume


def parse_resume(file_path):

    text = ""

    with pdfplumber.open(file_path) as pdf:

        for page in pdf.pages:

            extracted_text = page.extract_text()

            if extracted_text:

                text += extracted_text + "\n"

    email_match = re.search(
        r'[\w\.-]+@[\w\.-]+\.\w+',
        text
    )

    phone_match = re.search(
        r'\b\d{10}\b',
        text
    )

    skills_list = [
        "AWS",
        "Python",
        "Docker",
        "Kubernetes",
        "Linux",
        "FastAPI",
        "React",
        "SQL",
        "PostgreSQL"
    ]

    found_skills = []

    for skill in skills_list:

        if skill.lower() in text.lower():

            found_skills.append(skill)

    lines = text.split("\n")

    name = lines[0] if lines else "Unknown"

    return {

        "name": name,

        "email":
            email_match.group()
            if email_match
            else "",

        "phone":
            phone_match.group()
            if phone_match
            else "",

        "skills":
            found_skills
    }



def create_resume(
    db,
    file_name,
    candidate_name,
    email,
    phone,
    skills,
    file_path
):

    new_resume = Resume(

        resume_id=uuid.uuid4(),

        file_name=file_name,

        candidate_name=candidate_name,

        email=email,

        phone=phone,

        skills=",".join(skills),

        file_path=file_path
    )

    db.add(
        new_resume
    )

    db.commit()

    db.refresh(
        new_resume
    )

    return new_resume