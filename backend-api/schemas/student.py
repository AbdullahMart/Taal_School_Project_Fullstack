from pydantic import BaseModel
from typing import Optional

class StudentBase(BaseModel):
    first_name: str
    last_name: str
    country: str
    age: int
    gender: str
    education_level: str
    field_of_study: Optional[str] = None

class StudentCreate(StudentBase):
    pass

class StudentUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    country: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    education_level: Optional[str] = None
    field_of_study: Optional[str] = None

class Student(StudentBase):
    student_id: int

    class Config:
        from_attributes = True
