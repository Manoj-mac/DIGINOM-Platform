from pydantic import BaseModel


class RecruiterNoteCreate(
    BaseModel
):

    employee_id: str

    note: str