from app.documents import Document


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
    return db.query(Document).all()


def get_document_by_id(db, document_id):
    return db.query(Document).filter(
        Document.document_id == document_id
    ).first()


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