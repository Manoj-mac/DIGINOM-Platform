print("TRUST SCORE MODULE LOADED")
from app.skills import Skill
from app.certifications import Certification
from app.documents import Document


def calculate_trust_score(
    db,
    employee_id
):

    score = 0

    verified_skills = db.query(
        Skill
    ).filter(
        Skill.employee_id == employee_id,
        Skill.verified == True
    ).count()

    verified_certifications = db.query(
        Certification
    ).filter(
        Certification.employee_id == employee_id,
        Certification.verified == True
    ).count()

    verified_documents = db.query(
        Document
    ).filter(
        Document.employee_id == employee_id,
        Document.verified == True
    ).count()

    score += verified_skills * 10
    score += verified_certifications * 15
    score += verified_documents * 20

    if score > 100:
        score = 100

    print("SKILLS:", verified_skills)
    print("CERTIFICATIONS:", verified_certifications)
    print("DOCUMENTS:", verified_documents)
    print("FINAL SCORE:", score)

    return int(score)