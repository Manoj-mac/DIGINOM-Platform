from app.skills import Skill


def create_skill(db, skill):
    new_skill = Skill(
        employee_id=skill.employee_id,
        skill_name=skill.skill_name,
        skill_level=skill.skill_level
    )

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return  {
    "skill_id": str(new_skill.skill_id),
    "employee_id": new_skill.employee_id,
    "skill_name": new_skill.skill_name,
    "skill_level": new_skill.skill_level,
    "verified": new_skill.verified
}


def get_skills(db):
    return db.query(Skill).all()


def get_skill_by_id(db, skill_id):
    return db.query(Skill).filter(
        Skill.skill_id == skill_id
    ).first()


def delete_skill(db, skill_id):
    skill = get_skill_by_id(db, skill_id)

    if not skill:
        return None

    db.delete(skill)
    db.commit()

    return {"message": "Skill deleted successfully"}

def update_skill(db, skill_id, skill_data):
    skill = get_skill_by_id(db, skill_id)

    if not skill:
        return None

    skill.skill_name = skill_data.skill_name
    skill.skill_level = skill_data.skill_level
    skill.verified = skill_data.verified

    db.commit()
    db.refresh(skill)

    return  {
    "skill_id": str(skill.skill_id),
    "employee_id": skill.employee_id,
    "skill_name": skill.skill_name,
    "skill_level": skill.skill_level,
    "verified": skill.verified
}