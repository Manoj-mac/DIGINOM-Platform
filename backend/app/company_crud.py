from app.companies import Company


def create_company(db, company):
    new_company = Company(
        company_name=company.company_name,
        email=company.email,
        phone=company.phone,
        website=company.website,
        address=company.address,
        city=company.city,
        state=company.state,
        country=company.country,
        status="active"
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company


def get_companies(db):
    return db.query(Company).all()


def get_company_by_id(db, company_id):
    return db.query(Company).filter(
        Company.company_id == company_id
    ).first()


def delete_company(db, company_id):
    company = get_company_by_id(db, company_id)

    if not company:
        return None

    db.delete(company)
    db.commit()

    return {"message": "Company deleted successfully"}

def update_company(db, company_id, company_data):
    company = get_company_by_id(db, company_id)

    if not company:
        return None

    company.company_name = company_data.company_name
    company.email = company_data.email
    company.phone = company_data.phone
    company.website = company_data.website
    company.address = company_data.address
    company.city = company_data.city
    company.state = company_data.state
    company.country = company_data.country
    company.status = company_data.status

    db.commit()
    db.refresh(company)

    return company