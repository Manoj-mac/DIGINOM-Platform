from app.recruiter_notes import RecruiterNote


def create_note(
    db,
    recruiter_email,
    employee_id,
    note_text
):
    note = RecruiterNote(
        recruiter_email=recruiter_email,
        employee_id=employee_id,
        note=note_text
    )

    db.add(note)
    db.commit()
    db.refresh(note)

    return {
        "note_id": str(note.note_id),
        "employee_id": note.employee_id,
        "note": note.note
    }


def get_notes(
    db,
    recruiter_email
):
    return db.query(
        RecruiterNote
    ).filter(
        RecruiterNote.recruiter_email ==
        recruiter_email
    ).all()