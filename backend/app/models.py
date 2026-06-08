from sqlalchemy import Column, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Employee(Base):
    __tablename__ = "Employee"

    employee_id = Column(String, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)