from app.roles import admin_required
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.auth import router as auth_router
from app.dependencies import verify_token
from app.user_routes import router as user_router

from app.database import SessionLocal


from app.crud import (
    create_employee,
    get_employees,
    get_employee_by_id,
    update_employee,
    delete_employee
)

from app.schemas import (
    EmployeeCreate,
    EmployeeUpdate,
    CompanyCreate,
    CompanyUpdate,
    CertificationCreate,
    CertificationUpdate,
    DocumentCreate,
    DocumentUpdate
)

from app.company_crud import (
    create_company,
    get_companies,
    get_company_by_id,
    update_company,
    delete_company
)

from app.audit_crud import (
    create_audit_log,
    get_audit_logs
)
from app.skill_crud import (
    create_skill,
    get_skills,
    get_skill_by_id,
    delete_skill,
    update_skill
)
from app.schemas import (
    EmployeeCreate,
    EmployeeUpdate,
    CompanyCreate,
    CompanyUpdate,
    EmploymentHistoryCreate,
    EmploymentHistoryUpdate,
    SkillCreate,
    SkillUpdate,
    VerificationRequestCreate,
    VerificationDecision
)

from app.employment_history_crud import (
    create_employment_history,
    get_employment_history,
    get_employment_history_by_id
)

from app.certification_crud import (
    create_certification,
    get_certifications,
    get_certification_by_id,
    delete_certification,
    update_certification
    
)

from app.document_crud import (
    create_document,
    get_documents,
    get_document_by_id,
    delete_document
)

from fastapi import UploadFile, File
import shutil
import os

from fastapi import UploadFile, File, Form
import os
import shutil

from app.verification_crud import (
    create_verification_request,
    get_verification_requests,
    get_verification_request_by_id
)

from app.certifications import Certification
from datetime import datetime

from fastapi.responses import FileResponse
app = FastAPI()

from app.skills import Skill
from app.documents import Document

app.include_router(auth_router)
app.include_router(user_router)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CREATE EMPLOYEE (ADMIN ONLY)
@app.post("/employees")
def add_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    return create_employee(db, employee)

@app.post("/employees")
def add_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    new_employee = create_employee(db, employee)

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "EMPLOYEE",
        new_employee["employee_id"]
    )

    return new_employee

@app.post("/employment-history")
def add_employment_history(
    history: EmploymentHistoryCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    new_history = create_employment_history(
        db,
        history
    )

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "EMPLOYMENT_HISTORY",
        new_history.history_id
    )

    return new_history

@app.post("/skills")
def add_skill(
    skill: SkillCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    new_skill = create_skill(db, skill)

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "SKILL",
        new_skill.skill_id
    )

    return new_skill

@app.post("/certifications")
def add_certification(
    certification: CertificationCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    new_certification = create_certification(
        db,
        certification
    )

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "CERTIFICATION",
        new_certification["certification_id"]
    )

    return new_certification

@app.post("/documents")
def add_document(
    document: DocumentCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    new_document = create_document(
        db,
        document
    )

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "DOCUMENT",
        new_document["document_id"]
    )

    return new_document

@app.post("/upload-file")
def upload_file(
    file: UploadFile = File(...)
):
    upload_dir = "uploads"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {
        "filename": file.filename,
        "file_path": file_path
    }

@app.post("/documents/upload")
def upload_document(
    employee_id: str = Form(...),
    document_name: str = Form(...),
    document_type: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    upload_dir = "uploads"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    document_data = DocumentCreate(
        employee_id=employee_id,
        document_name=document_name,
        document_type=document_type,
        file_path=file_path
    )

    new_document = create_document(
        db,
        document_data
    )

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "DOCUMENT",
        new_document["document_id"]
    )

    return new_document

@app.post("/verification-requests")
def add_verification_request(
    request: VerificationRequestCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    new_request = (
        create_verification_request(
            db,
            request,
            token["sub"]
        )
    )

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "VERIFICATION_REQUEST",
        new_request["verification_id"]
    )

    return new_request
# GET ALL EMPLOYEES (LOGGED-IN USERS)
@app.get("/employees")
def list_employees(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    employees = get_employees(db)

    return [
        {
            "employee_id": str(emp.employee_id),
            "diginom_id": emp.diginom_id,
            "first_name": emp.first_name,
            "last_name": emp.last_name,
            "email": emp.email
        }
        for emp in employees
    ]


# GET SINGLE EMPLOYEE (LOGGED-IN USERS)
@app.get("/employees/{employee_id}")
def get_employee(
    employee_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    employee = get_employee_by_id(db, employee_id)

    if not employee:
        return {"message": "Employee not found"}

    return {
        "employee_id": str(employee.employee_id),
        "diginom_id": employee.diginom_id,
        "first_name": employee.first_name,
        "last_name": employee.last_name,
        "email": employee.email
    }

@app.get("/employment-history")
def list_employment_history(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_employment_history(db)

@app.get("/certifications")
def list_certifications(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_certifications(db)

@app.get("/certifications/{certification_id}")
def get_certification(
    certification_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    certification = get_certification_by_id(
        db,
        certification_id
    )

    if not certification:
        return {
            "message": "Certification not found"
        }

    return certification

@app.get("/documents/download/{document_id}")
def download_document(
    document_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        return {
            "message": "Document not found"
        }

    create_audit_log(
        db,
        token["sub"],
        "DOWNLOAD",
        "DOCUMENT",
        document_id
    )

    return FileResponse(
        path=document.file_path,
        filename=document.document_name
    )
@app.post("/companies")
def add_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    new_company = create_company(db, company)

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "COMPANY",
        new_company.company_id
    )

    return new_company

@app.get("/companies")
def list_companies(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_companies(db)

@app.get("/companies/{company_id}")
def get_company(
    company_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    company = get_company_by_id(db, company_id)

    if not company:
        return {"message": "Company not found"}

    return company

@app.get("/employment-history/{history_id}")
def get_history(
    history_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    history = get_employment_history_by_id(
        db,
        history_id
    )

    if not history:
        return {
            "message": "Employment history not found"
        }

    return history

@app.get("/skills")
def list_skills(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_skills(db)

@app.get("/skills/{skill_id}")
def get_skill(
    skill_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    skill = get_skill_by_id(db, skill_id)

    if not skill:
        return {"message": "Skill not found"}

    return skill

@app.get("/documents")
def list_documents(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_documents(db)

@app.get("/documents/{document_id}")
def get_document(
    document_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        return {
            "message": "Document not found"
        }

    return document

@app.get("/verification-requests")
def list_verification_requests(
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    return get_verification_requests(db)
@app.get("/employee-profile/{employee_id}")
def employee_profile(
    employee_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    employee = get_employee_by_id(
        db,
        employee_id
    )

    if not employee:
        return {
            "message": "Employee not found"
        }

    skills = [
        skill for skill in get_skills(db)
        if str(skill.employee_id) == employee_id
        and skill.verified
    ]

    certifications = [
        cert for cert in get_certifications(db)
        if str(cert.employee_id) == employee_id
        and cert.verified
    ]

    documents = [
        doc for doc in get_documents(db)
        if str(doc.employee_id) == employee_id
        and doc.verified
    ]

    return {
        "employee": employee,
        "verified_skills": skills,
        "verified_certifications":
            certifications,
        "verified_documents":
            documents
    }

@app.get("/verified-employees")
def verified_employees(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    employees = get_employees(db)

    return [
        {
            "employee_id":
            str(emp.employee_id),

            "name":
            emp.first_name,

            "email":
            emp.email
        }
        for emp in employees
    ]
@app.get("/dashboard-summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    return {
        "employees": len(get_employees(db)),
        "companies": len(get_companies(db)),
        "skills": len(get_skills(db)),
        "certifications": len(get_certifications(db)),
        "documents": len(get_documents(db))
    }

@app.get("/search-employees")
def search_employees(
    name: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    employees = get_employees(db)

    results = []

    for emp in employees:
        if name.lower() in emp.first_name.lower():

            results.append({
                "employee_id":
                str(emp.employee_id),

                "name":
                emp.first_name,

                "email":
                emp.email
            })

    return results

@app.get("/search-skill")
def search_skill(
    skill: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    skills = get_skills(db)

    results = []

    for s in skills:

        if (
            skill.lower() in s.skill_name.lower()
            and s.verified
        ):

            employee = get_employee_by_id(
                db,
                str(s.employee_id)
            )

            if employee:

                results.append({
                    "employee_id":
                    str(employee.employee_id),

                    "employee_name":
                    employee.first_name,

                    "email":
                    employee.email,

                    "skill":
                    s.skill_name,

                    "level":
                    s.skill_level
                })

    return results

@app.get("/search-certification")
def search_certification(
    certification: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    certifications = get_certifications(db)

    results = []

    for cert in certifications:

        if (
            certification.lower()
            in cert.certification_name.lower()
            and cert.verified
        ):

            employee = get_employee_by_id(
                db,
                str(cert.employee_id)
            )

            if employee:

                results.append({
                    "employee_id":
                    str(employee.employee_id),

                    "employee_name":
                    employee.first_name,

                    "email":
                    employee.email,

                    "certification":
                    cert.certification_name
                })

    return results

@app.get("/verified-talent")
def verified_talent(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    employees = get_employees(db)

    results = []

    for emp in employees:

        skills = [
            s for s in get_skills(db)
            if str(s.employee_id)
            == str(emp.employee_id)
            and s.verified
        ]

        certifications = [
            c for c in get_certifications(db)
            if str(c.employee_id)
            == str(emp.employee_id)
            and c.verified
        ]

        documents = [
            d for d in get_documents(db)
            if str(d.employee_id)
            == str(emp.employee_id)
            and d.verified
        ]

        if (
            skills
            or certifications
            or documents
        ):

            results.append({
                "employee_id":
                str(emp.employee_id),

                "name":
                emp.first_name,

                "email":
                emp.email,

                "verified_skills":
                len(skills),

                "verified_certifications":
                len(certifications),

                "verified_documents":
                len(documents)
            })

    return results

@app.put("/companies/{company_id}")
def edit_company(
    company_id: str,
    company: CompanyUpdate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    updated_company = update_company(
        db,
        company_id,
        company
    )

    if not updated_company:
        return {"message": "Company not found"}

    return updated_company


# UPDATE EMPLOYEE (ADMIN ONLY)
@app.put("/employees/{employee_id}")
def edit_employee(
    employee_id: str,
    employee: EmployeeUpdate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    updated_employee = update_employee(
        db,
        employee_id,
        employee
    )

    if not updated_employee:
        return {"message": "Employee not found"}

    return {
        "employee_id": str(updated_employee.employee_id),
        "diginom_id": updated_employee.diginom_id,
        "first_name": updated_employee.first_name,
        "email": updated_employee.email
    }

@app.put("/skills/{skill_id}")
def edit_skill(
    skill_id: str,
    skill: SkillUpdate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    updated_skill = update_skill(
        db,
        skill_id,
        skill
    )

    if not updated_skill:
        return {"message": "Skill not found"}

    create_audit_log(
        db,
        token["sub"],
        "UPDATE",
        "SKILL",
        skill_id
    )

    return updated_skill

@app.put("/certifications/{certification_id}")
def edit_certification(
    certification_id: str,
    certification: CertificationUpdate,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    updated_certification = (
        update_certification(
            db,
            certification_id,
            certification
        )
    )

    if not updated_certification:
        return {
            "message":
            "Certification not found"
        }

    create_audit_log(
        db,
        token["sub"],
        "UPDATE",
        "CERTIFICATION",
        certification_id
    )

    return updated_certification

@app.put(
    "/verification-requests/{verification_id}/approve"
)
def approve_verification(
    verification_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    request = get_verification_request_by_id(
        db,
        verification_id
    )

    if not request:
        return {
            "message":
            "Verification request not found"
        }

    if request.verification_type == "CERTIFICATION":

        certification = db.query(
            Certification
        ).filter(
            Certification.certification_id ==
            request.entity_id
        ).first()

        if certification:
            certification.verified = True
    elif request.verification_type == "DOCUMENT":

     document = db.query(
        Document
    ).filter(
        Document.document_id ==
        request.entity_id
    ).first()

    if document:
        document.verified = True

    request.status = "APPROVED"
    request.verified_by = token["sub"]
    request.verified_at = datetime.utcnow()

    db.commit()

    create_audit_log(
        db,
        token["sub"],
        "APPROVE",
        "VERIFICATION_REQUEST",
        verification_id
    )

    return {
        "message":
        "Verification approved successfully"
    }


# DELETE EMPLOYEE (ADMIN ONLY)
@app.delete("/companies/{company_id}")
def remove_company(
    company_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    result = delete_company(db, company_id)

    if not result:
        return {"message": "Company not found"}

    create_audit_log(
        db,
        token["sub"],
        "DELETE",
        "COMPANY",
        company_id
    )

    return result

@app.delete("/skills/{skill_id}")
def remove_skill(
    skill_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    result = delete_skill(db, skill_id)

    if not result:
        return {"message": "Skill not found"}

    create_audit_log(
        db,
        token["sub"],
        "DELETE",
        "SKILL",
        skill_id
    )

    return result

@app.delete("/certifications/{certification_id}")
def remove_certification(
    certification_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    result = delete_certification(
        db,
        certification_id
    )

    if not result:
        return {
            "message": "Certification not found"
        }

    create_audit_log(
        db,
        token["sub"],
        "DELETE",
        "CERTIFICATION",
        certification_id
    )

    return result

@app.delete("/documents/{document_id}")
def remove_document(
    document_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    result = delete_document(
        db,
        document_id
    )

    if not result:
        return {
            "message": "Document not found"
        }

    create_audit_log(
        db,
        token["sub"],
        "DELETE",
        "DOCUMENT",
        document_id
    )

    return result

@app.get("/audit-logs")
def list_audit_logs(
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    return get_audit_logs(db)