from app.roles import admin_required
from fastapi import FastAPI,Depends
from app.database import (
    Base,
    engine
)

from app.notification import (
    Notification
)

app = FastAPI(
    title="DIGINOM",
    description="Digital Identity & Recruitment Management Platform",
    version="1.0.0"
)
from sqlalchemy.orm import Session
from app.models import Employee
from app.resume import Resume

from app.auth import router as auth_router
from app.dependencies import verify_token
from app.user_routes import router as user_router

from app.database import SessionLocal
from datetime import datetime

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
    VerificationDecision,
    PipelineCreate,
    PipelineUpdate,
    JobCreate,
    JobUpdate,
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
from app.identity_verification_crud import verify_employee

from app.certifications import Certification
from datetime import datetime
from app.notification import Notification

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.responses import FileResponse
from app.email_service import (
    send_email
)
from fastapi import UploadFile
from fastapi import File

from app.resume_crud import (
    parse_resume,
    create_resume
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from app.skills import Skill
from app.documents import Document

from app.schemas import ShortlistCreate
from app.shortlist_crud import (
    create_shortlist,
    get_shortlists
)
from app.schemas import RecruiterNoteCreate
from app.recruiter_notes_crud import (
    create_note,
    get_notes
)

from app.recruiter_note_schema import (
    RecruiterNoteCreate
)

from app.recruiter_note_crud import (
    create_note,
    get_notes
)

from app.interview_pipeline_crud import (
    get_pipeline_stats,
    create_pipeline,
    get_pipelines,
    update_pipeline_stage
)


from app.interview_pipeline_crud import (
    get_pipeline_stats
)

from app.job_requisition_crud import (
    create_job,
    get_jobs,
    get_job_by_id,
    update_job_status,
    delete_job
)

from app.interview import Interview

from app.interview_schema import (
    InterviewCreate,
    InterviewUpdate
)

from app.interview_crud import (
    create_interview,
    get_interviews,
    get_interview_by_id,
    update_interview,
    delete_interview
)

from app.offer import Offer

from app.offer_schema import (
    OfferCreate,
    OfferUpdate
)

from app.offer_crud import (
    create_offer,
    get_offers,
    get_offer_by_id,
    update_offer,
    delete_offer
)

from app.pdf_service import (
    generate_offer_letter
)
from app.candidate_recommendation_crud import (
    get_candidate_recommendations
)

from app.interview_pipeline import InterviewPipeline
from app.interview_pipeline_crud import get_pipeline_stats

from datetime import datetime

from app.employee_timeline_crud import (
    create_timeline_event,
    get_employee_timeline
)

from app.recruiter_notes_crud import (
    create_note,
    get_notes
)

from app.recruiter_note_schema import (
    RecruiterNoteCreate
)

from app.notification import Notification

from app.notification_schema import (
    NotificationCreate
)

from app.notification_crud import (

    create_notification,

    get_notifications,

    mark_as_read
)

from app.trust_score_crud import (
    calculate_trust_score
)

from app.roles import (
    hr_required
)
from app.dashboard_crud import (
    get_employee_dashboard_summary
)
from app.profile_completion_crud import (
    get_profile_completion
)

from fastapi import HTTPException
from app.identity_crud import get_employee_identity

from app.device_routes import router as device_router





Base.metadata.create_all(
    bind=engine
)




app.include_router(auth_router)
app.include_router(user_router)
app.include_router(
    device_router,
    prefix="/devices",
    tags=["Devices"]
)


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

@app.post("/shortlists")
def shortlist_candidate(
    shortlist: ShortlistCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    result = create_shortlist(
        db,
        token["sub"],
        shortlist.employee_id
    )

    create_audit_log(
        db,
        token["sub"],
        "SHORTLIST",
        "EMPLOYEE",
        shortlist.employee_id
    )

    return result

@app.post("/recruiter-notes")
def add_note(
    note: RecruiterNoteCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return create_note(
        db,
        token["sub"],
        note.employee_id,
        note.note
    )

@app.post("/pipeline")
def add_pipeline(
    pipeline: PipelineCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    result = create_pipeline(
        db,
        token["sub"],
        pipeline.employee_id,
        pipeline.remarks
    )

    return {
        "pipeline_id": str(result.pipeline_id),
        "employee_id": result.employee_id,
        "stage": result.stage,
        "remarks": result.remarks
    }
@app.post("/interviews")
def add_interview(
    interview: InterviewCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):

    new_interview = create_interview(
        db,
        interview,
        token["sub"]
    )

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "INTERVIEW",
        new_interview["interview_id"]
    )

    return new_interview

@app.post("/offers")
def add_offer(
    offer: OfferCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):

    new_offer = create_offer(
        db,
        offer
    )

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "OFFER",
        new_offer["offer_id"]
    )

    return new_offer

@app.post(
    "/offers/{offer_id}/send-email"
)
def send_offer_email(
    offer_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(
        verify_token
    )
):

    offer = get_offer_by_id(
        db,
        offer_id
    )

    if not offer:

        return {
            "message":
            "Offer not found"
        }

    employee = db.query(
        Employee
    ).filter(
        Employee.employee_id
        ==
        offer.employee_id
    ).first()

    if not employee:

        return {
            "message":
            "Employee not found"
        }

    send_email(

        employee.email,

        "Offer Letter",

        f"""
Dear {employee.first_name},

Congratulations!

An offer has been created for you.

Salary:
₹{offer.offered_salary}

Joining Date:
{offer.joining_date}

Regards,
DIGINOM HR
"""
    )

    return {
        "message":
        "Offer email sent"
    }

@app.post(
    "/interviews/{interview_id}/send-email"
)
def send_interview_email(
    interview_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(
        verify_token
    )
):

    interview = get_interview_by_id(
            db,
            interview_id
        )

    if not interview:

        return {
            "message":
            "Interview not found"
        }

    employee = db.query(
        Employee
    ).filter(
        Employee.employee_id
        ==
        interview.employee_id
    ).first()

    if not employee:

        return {
            "message":
            "Employee not found"
        }

    send_email(

        employee.email,

        "Interview Schedule",

        f"""
Dear {employee.first_name},

Your interview has been scheduled.

Date:
{interview.interview_date}

Type:
{interview.interview_type}

Regards,
DIGINOM Recruitment Team
"""
    )

    return {
        "message":
        "Interview email sent"
    }

@app.post("/resume/upload")
async def upload_resume(

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    token: dict = Depends(
        verify_token
    )
):

    file_location = (
        f"uploads/{file.filename}"
    )

    with open(
        file_location,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    parsed_data = parse_resume(
        file_location
    )

    saved_resume = create_resume(

        db,

        file.filename,

        parsed_data["name"],

        parsed_data["email"],

        parsed_data["phone"],

        parsed_data["skills"],

        file_location
    )

    return {

        "message":
            "Resume uploaded successfully",

        "resume":
            saved_resume
    }

    file: UploadFile = File(...),

    token: dict = Depends(
        verify_token
    )


    file_location = (
        f"uploads/{file.filename}"
    )

    with open(
        file_location,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    result = parse_resume(
        file_location
    )

    return result

@app.post(
    "/recruiter-notes"
)
def add_recruiter_note(

    note_data: RecruiterNoteCreate,

    db: Session = Depends(
        get_db
    ),

    token: dict = Depends(
        verify_token
    )
):

    return create_note(

        db,

        token["sub"],

        note_data.employee_id,

        note_data.note
    )

@app.post("/notifications")
def add_notification(

    data: NotificationCreate,

    db: Session = Depends(get_db),

    token: dict = Depends(
        verify_token
    )
):

    return create_notification(

        db,

        data.user_email,

        data.title,

        data.message
    )
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
@app.get("/employee-experience/{employee_id}")
def employee_experience(
    employee_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    histories = get_employment_history(db)

    total_days = 0

    for history in histories:

        if str(history.employee_id) == employee_id:

            start = history.start_date

            end = (
                history.end_date
                if history.end_date
                else datetime.utcnow().date()
            )

            total_days += (
                end - start
            ).days

    years = round(
        total_days / 365,
        2
    )

    return {
        "employee_id": employee_id,
        "experience_years": years
    }

@app.get("/search-experience")
def search_experience(
    minimum_years: float,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    employees = get_employees(db)

    results = []

    for emp in employees:

        histories = get_employment_history(db)

        total_days = 0

        for history in histories:

            if str(history.employee_id) == str(emp.employee_id):

                start = history.start_date

                end = (
                    history.end_date
                    if history.end_date
                    else datetime.utcnow().date()
                )

                total_days += (
                    end - start
                ).days

        years = round(
            total_days / 365,
            2
        )

        if years >= minimum_years:

            results.append({
                "employee_id":
                str(emp.employee_id),

                "name":
                emp.first_name,

                "email":
                emp.email,

                "experience_years":
                years
            })

    return results

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

@app.post("/jobs")
def add_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    result = create_job(
        db,
        token["sub"],
        job.job_title,
        job.required_skill,
        job.minimum_experience,
        job.openings
    )

    create_audit_log(
        db,
        token["sub"],
        "CREATE",
        "JOB_REQUISITION",
        str(result.job_id)
    )

    return {
        "job_id": str(result.job_id),
        "job_title": result.job_title,
        "required_skill": result.required_skill,
        "minimum_experience": float(result.minimum_experience),
        "openings": result.openings,
        "status": result.status
    }

@app.post("/recruiter-notes")
def add_recruiter_note(

    data: RecruiterNoteCreate,

    db: Session = Depends(get_db),

    token: dict = Depends(verify_token)
):

    return create_note(

        db,

        data.recruiter_email,

        data.employee_id,

        data.note
    )

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


@app.get(
    "/recruiter-notes"
)
def list_recruiter_notes(

    db: Session = Depends(
        get_db
    ),

    token: dict = Depends(
        verify_token
    )
):

    notes = get_notes(

        db,

        token["sub"]
    )

    result = []

    for note in notes:

        result.append({

            "note_id":
                str(
                    note.note_id
                ),

            "employee_id":
                note.employee_id,

            "recruiter_email":
                note.recruiter_email,

            "note":
                note.note,

            "created_at":
                str(
                    note.created_at
                )
        })

    return result


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
                str(
    s.employee_id
)
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

@app.get("/search-company")
def search_company(
    company_name: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    companies = get_companies(db)

    company_ids = []

    for company in companies:
        if company_name.lower() in company.company_name.lower():
            company_ids.append(
                str(company.company_id)
            )

    results = []

    histories = get_employment_history(db)

    for history in histories:

        if str(history.company_id) in company_ids:

            employee = get_employee_by_id(
                db,
                str(history.employee_id)
            )

            if employee:

                results.append({
                    "employee_id":
                    str(employee.employee_id),

                    "employee_name":
                    employee.first_name,

                    "email":
                    employee.email,

                    "role":
                    history.role,

                    "status":
                    history.status
                })

    return results

@app.get("/candidate-ranking")
def candidate_ranking(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    employees = get_employees(db)

    rankings = []

    for emp in employees:

        score = 0

        skills = [
            s for s in get_skills(db)
            if str(s.employee_id) ==
            str(emp.employee_id)
            and s.verified
        ]

        score += len(skills) * 20

        certifications = [
            c for c in get_certifications(db)
            if str(c.employee_id) ==
            str(emp.employee_id)
            and c.verified
        ]

        score += len(certifications) * 30

        documents = [
            d for d in get_documents(db)
            if str(d.employee_id) ==
            str(emp.employee_id)
            and d.verified
        ]

        score += len(documents) * 10

        histories = get_employment_history(db)

        total_days = 0

        for history in histories:

            if str(history.employee_id) == str(emp.employee_id):

                start = history.start_date

                end = (
                    history.end_date
                    if history.end_date
                    else datetime.utcnow().date()
                )

                total_days += (
                    end - start
                ).days

        years = round(
            total_days / 365,
            2
        )

        if years >= 2:
            score += 20

        rankings.append({
            "employee_id":
            str(emp.employee_id),

            "name":
            emp.first_name,

            "email":
            emp.email,

            "experience_years":
            years,

            "score":
            score
        })

    rankings.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return rankings

@app.get("/shortlists")
def my_shortlists(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_shortlists(
        db,
        token["sub"]
    )

@app.get("/recruiter-notes")
def list_notes(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_notes(
        db,
        token["sub"]
    )

@app.get("/pipeline-summary")
def pipeline_summary(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    pipelines = get_pipelines(db)

    return {
        "shortlisted":
        len([p for p in pipelines if p.stage == "SHORTLISTED"]),

        "screening":
        len([p for p in pipelines if p.stage == "SCREENING"]),

        "technical":
        len([p for p in pipelines if p.stage == "TECHNICAL"]),

        "hr":
        len([p for p in pipelines if p.stage == "HR"]),

        "offer":
        len([p for p in pipelines if p.stage == "OFFER"]),

        "hired":
        len([p for p in pipelines if p.stage == "HIRED"])
    }
    

@app.get("/jobs")
def list_jobs(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_jobs(db)

@app.get("/jobs/{job_id}")
def get_job(
    job_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    job = get_job_by_id(
        db,
        job_id
    )

    if not job:
        return {
            "message": "Job not found"
        }

    return job

@app.get("/jobs/{job_id}/matches")
def match_candidates(
    job_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    job = get_job_by_id(
        db,
        job_id
    )

    if not job:
        return {
            "message": "Job not found"
        }

    employees = get_employees(db)

    matches = []

    for employee in employees:

        score = 0

        employee_skills = [
            s for s in get_skills(db)
            if str(s["employee_id"])
            == str(employee.employee_id)
        ]

        for skill in employee_skills:

            if (
                skill["skill_name"].lower()
                ==
                job.required_skill.lower()
            ):

                score += 50

                if skill["verified"]:
                    score += 20

        employee_certifications = [
            c for c in get_certifications(db)
            if str(c.employee_id)
            == str(employee.employee_id)
        ]

        for cert in employee_certifications:

            if cert.verified:
                score += 10

        experience_years = 0

        if experience_years >= float(job.minimum_experience):
            score += 20

        if score > 0:

            matches.append({

                "employee_id":
                    str(employee.employee_id),

                "name":
                    f"{employee.first_name} {employee.last_name}",

                "email":
                    employee.email,

                "match_score":
                    score

            })

    matches.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return matches

@app.get(
    "/jobs/{job_id}/recommendations"
)
def job_recommendations(

    job_id: str,

    db: Session = Depends(
        get_db
    ),

    token: dict = Depends(
        verify_token
    )
):

    return get_candidate_recommendations(
        db,
        job_id
    )

@app.get("/dashboard/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return {
        "employees": len(get_employees(db)),
        "skills": len(get_skills(db)),
        "certifications": len(get_certifications(db)),
        "documents": len(get_documents(db)),
        "jobs": len(get_jobs(db)),
        "verifications": len(get_verification_requests(db))
    }


@app.get("/recruiter-dashboard")
def recruiter_dashboard(

    db: Session = Depends(get_db),

    token: dict = Depends(
        verify_token
    )
):

    jobs = get_jobs(db)

    employees = get_employees(db)

    skills = get_skills(db)

    interviews = get_interviews(db)

    offers = get_offers(db)

    total_trust_score = 0

    for employee in employees:

        try:

            total_trust_score += (
                calculate_trust_score(
                    db,
                    str(
                        employee.employee_id
                    )
                )
            )

        except:

            pass

    average_trust_score = 0

    if len(employees) > 0:

        average_trust_score = round(

            total_trust_score /

            len(employees),

            2
        )

    return {

        "total_jobs":
            len(jobs),

        "open_jobs":
            len([
                j for j in jobs
                if j.status == "OPEN"
            ]),

        "total_employees":
            len(employees),

        "verified_skills":
            len([
                s for s in skills
                if s["verified"]
            ]),

        "total_interviews":
            len(interviews),

        "total_offers":
            len(offers),

        "average_trust_score":
            average_trust_score
    }
@app.get("/interviews")
def list_interviews(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_interviews(db)

@app.get("/offers")
def list_offers(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return get_offers(db)

@app.get("/analytics")
def analytics(
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):

    return {

        "employees":
            len(get_employees(db)),

        "skills":
            len(get_skills(db)),

        "certifications":
            len(get_certifications(db)),

        "documents":
            len(get_documents(db)),

        "companies":
            len(get_companies(db)),

        "jobs":
            len(get_jobs(db)),

        "interviews":
            len(get_interviews(db)),

        "offers":
            len(get_offers(db))
    }


@app.get(
    "/offers/{offer_id}/pdf"
)
def generate_offer_pdf(
    offer_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(
        verify_token
    )
):

    offer = get_offer_by_id(
            db,
            offer_id
        )

    if not offer:

        return {
            "message":
            "Offer not found"
        }

    filename = (
        f"offer_{offer_id}.pdf"
    )

    generate_offer_letter(

        filename,

        "Employee",

        "Software Engineer",

        offer.offered_salary,

        offer.joining_date
    )

    return FileResponse(
        filename,
        media_type=
        "application/pdf",
        filename=filename
    )

@app.get("/resumes")
def get_resumes(

    db: Session = Depends(get_db),

    token: dict = Depends(
        verify_token
    )
):

    resumes = db.query(
        Resume
    ).all()

    result = []

    for resume in resumes:

        result.append({

            "resume_id":
                str(
                    resume.resume_id
                ),

            "file_name":
                resume.file_name,

            "candidate_name":
                resume.candidate_name,

            "email":
                resume.email,

            "phone":
                resume.phone,

            "skills":
                resume.skills,

            "file_path":
                resume.file_path
        })

    return result

@app.get("/recruiter-notes/{recruiter_email}")
def recruiter_notes(

    recruiter_email: str,

    db: Session = Depends(get_db),

    token: dict = Depends(verify_token)
):

    return get_notes(

        db,

        recruiter_email
    )


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

@app.get("/employees/{employee_id}/timeline")
def employee_timeline(

    employee_id: str,

    db: Session = Depends(get_db),

    token: dict = Depends(verify_token)

):

    events = get_employee_timeline(

        db,

        employee_id

    )

    return [

        {

            "timeline_id":
                str(event.timeline_id),

            "event_type":
                event.event_type,

            "event_description":
                event.event_description,

            "created_at":
                event.created_at

        }

        for event in events

    ]

@app.get(
    "/notifications/{user_email}"
)
def notifications(

    user_email: str,

    db: Session = Depends(
        get_db
    ),

    token: dict = Depends(
        verify_token
    )
):

    return get_notifications(

        db,

        user_email
    )

@app.get("/employees/{employee_id}/trust-score")
def get_trust_score(
    employee_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):

    score = calculate_trust_score(
        db,
        employee_id
    )

    print("ROUTE SCORE =", score)

    return {
        "employee_id": employee_id,
        "trust_score": score
    }

@app.get(
    "/notifications/{user_email}/count"
)
def notification_count(

    user_email: str,

    db: Session = Depends(
        get_db
    ),

    token: dict = Depends(
        verify_token
    )
):

    notifications = get_notifications(

        db,

        user_email
    )

    return {

        "count":
            len(notifications)
    }
@app.get("/hr-dashboard")
def hr_dashboard(
    db: Session = Depends(get_db),
    token: dict = Depends(hr_required)
):

    total_employees = len(
        get_employees(db)
    )

    pending_documents = len([
        d for d in get_documents(db)
        if not d["verified"]
    ])

    pending_certifications = len([
        c for c in get_certifications(db)
        if not c.verified
    ])

    verified_employees = len([
        e for e in get_employees(db)
        if e.status == "ACTIVE"
    ])

    return {

        "total_employees":
            total_employees,

        "pending_documents":
            pending_documents,

        "pending_certifications":
            pending_certifications,

        "verified_employees":
            verified_employees
    }
@app.get(
    "/employee-dashboard-summary/{employee_id}"
)
def employee_dashboard_summary(

    employee_id: str,

    db: Session = Depends(get_db),

    token: dict = Depends(verify_token)

):

    summary = get_employee_dashboard_summary(

        db,

        employee_id

    )

    if not summary:

        return {

            "message":
                "Employee not found"

        }

    return summary

@app.get(
    "/profile-completion/{employee_id}"
)
def profile_completion(

    employee_id: str,

    db: Session = Depends(get_db),

    token: dict = Depends(
        verify_token
    )

):

    return get_profile_completion(
        db,
        employee_id
    )


@app.get("/pipeline/dashboard")
def pipeline_dashboard(

    db: Session = Depends(get_db),

    token: dict = Depends(verify_token)

):

    return get_pipeline_stats(db)
    


@app.get("/identity/{employee_id}")
def get_identity(

    employee_id: str,

    db: Session = Depends(get_db),

    token: dict = Depends(verify_token)

):

    identity = get_employee_identity(

        db,

        employee_id

    )

    if identity is None:

        raise HTTPException(

            status_code=404,

            detail="Employee not found"

        )

    return identity

@app.get("/verify/{diginom_id}")

def verify_identity(

    diginom_id: str,

    db: Session = Depends(get_db)

):

    employee = verify_employee(

        db,

        diginom_id

    )

    if employee is None:

        raise HTTPException(

            status_code=404,

            detail="Invalid DIGINOM ID"

        )

    return employee

    return get_pipeline_stats(db)
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

@app.put("/pipeline/{pipeline_id}")
def move_pipeline(
    pipeline_id: str,
    pipeline: PipelineUpdate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    result = update_pipeline_stage(
        db,
        pipeline_id,
        pipeline.stage,
        pipeline.remarks
    )

    if not result:
        return {
            "message": "Pipeline not found"
        }

    create_audit_log(
        db,
        token["sub"],
        "PIPELINE_UPDATE",
        "INTERVIEW_PIPELINE",
        pipeline_id
    )

    return {
        "pipeline_id": str(result.pipeline_id),
        "stage": result.stage,
        "remarks": result.remarks
    }

@app.put("/jobs/{job_id}")
def update_job(
    job_id: str,
    job: JobUpdate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    result = update_job_status(
        db,
        job_id,
        job.status
    )

    if not result:
        return {
            "message": "Job not found"
        }

    return {
        "job_id": str(result.job_id),
        "status": result.status
    }
@app.put("/interviews/{interview_id}")
def edit_interview(
    interview_id: str,
    interview: InterviewUpdate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):

    updated_interview = update_interview(
        db,
        interview_id,
        interview
    )

    if not updated_interview:
        return {
            "message":
            "Interview not found"
        }

    create_audit_log(
        db,
        token["sub"],
        "UPDATE",
        "INTERVIEW",
        interview_id
    )

    return updated_interview

@app.put("/offers/{offer_id}")
def edit_offer(
    offer_id: str,
    offer: OfferUpdate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):

    updated_offer = update_offer(
        db,
        offer_id,
        offer
    )

    if not updated_offer:
        return {
            "message":
            "Offer not found"
        }

    return updated_offer

@app.put(
    "/notifications/{notification_id}/read"
)
def read_notification(

    notification_id: str,

    db: Session = Depends(
        get_db
    ),

    token: dict = Depends(
        verify_token
    )
):

    return mark_as_read(

        db,

        notification_id
    )

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

@app.delete("/jobs/{job_id}")
def remove_job(
    job_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    return delete_job(
        db,
        job_id
    )
@app.delete("/employees/{employee_id}")
def remove_employee(
    employee_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):
    employee = get_employee_by_id(
        db,
        employee_id
    )

    if not employee:
        return {
            "message": "Employee not found"
        }

    delete_employee(
        db,
        employee_id
    )

    return {
        "message": "Employee deleted successfully"
    }
@app.delete("/interviews/{interview_id}")
def remove_interview(
    interview_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):

    result = delete_interview(
        db,
        interview_id
    )

    if not result:
        return {
            "message":
            "Interview not found"
        }

    create_audit_log(
        db,
        token["sub"],
        "DELETE",
        "INTERVIEW",
        interview_id
    )

    return result

@app.delete("/offers/{offer_id}")
def remove_offer(
    offer_id: str,
    db: Session = Depends(get_db),
    token: dict = Depends(admin_required)
):

    result = delete_offer(
        db,
        offer_id
    )

    if not result:
        return {
            "message":
            "Offer not found"
        }

    return result