from app.documents import Document
from app.models import Employee


def create_document(db, document):
    new_document = Document(
        employee_id=document.employee_id,
        document_name=document.document_name,
        document_type=document.document_type,
        file_path=document.file_path
    )

    db.add(new_document)
    db.commit()
    db.refresh(new_document)

    return {
        "document_id": str(new_document.document_id),
        "employee_id": new_document.employee_id,
        "document_name": new_document.document_name,
        "document_type": new_document.document_type,
        "file_path": new_document.file_path,
        "verified": new_document.verified
    }



def get_documents(db):

    documents = db.query(Document).all()

    result = []

    for document in documents:

        employee = db.query(Employee).filter(
            Employee.employee_id ==
            document.employee_id
        ).first()

        result.append({
            "document_id": str(document.document_id),
            "employee_id": str(document.employee_id),
            "employee_name":
                f"{employee.first_name} {employee.last_name}"
                if employee else "Unknown",
            "document_name": document.document_name,
            "document_type": document.document_type,
            "file_path": document.file_path,
            "verified": document.verified
        })

    return result


def get_document_by_id(db, document_id):
    return db.query(Document).filter(
        Document.document_id == document_id
    ).first()

def update_document(
    db,
    document_id,
    document_data
):
    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        return None

    document.document_name = (
        document_data.document_name
    )

    document.document_type = (
        document_data.document_type
    )

    document.file_path = (
        document_data.file_path
    )

    document.verified = (
        document_data.verified
    )

    db.commit()
    db.refresh(document)

    return {
        "document_id":
            str(document.document_id),

        "employee_id":
            document.employee_id,

        "document_name":
            document.document_name,

        "document_type":
            document.document_type,

        "file_path":
            document.file_path,

        "verified":
            document.verified
    }


def delete_document(db, document_id):
    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        return None

    db.delete(document)
    db.commit()

    return {
        "message": "Document deleted successfully"
    }