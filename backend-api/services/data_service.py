from sqlalchemy.orm import Session
from models.models import  Question, Student, StudentStats
from schemas.student import StudentCreate

def get_questions(db: Session):
    return db.query(Question).all()

def get_student_stats(db: Session):
    return db.query(StudentStats).all()

def get_students(db: Session):
    return db.query(Student).all()

def create_student(db: Session, student: StudentCreate):
    db_student = Student(
        first_name=student.first_name,
        last_name=student.last_name,
        country=student.country,
        age=student.age,
        gender=student.gender,
        education_level=student.education_level,
        field_of_study=student.field_of_study
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def get_student(db: Session, student_id: int):
    return db.query(Student).filter(Student.student_id == student_id).first()

def update_student(db: Session, student_id: int, student_data: dict):
    db_student = db.query(Student).filter(Student.student_id == student_id).first()
    if not db_student:
        return None
    for key, value in student_data.items():
        if value is not None:
            setattr(db_student, key, value)
    db.commit()
    db.refresh(db_student)
    return db_student

def delete_student(db: Session, student_id: int):
    db_student = db.query(Student).filter(Student.student_id == student_id).first()
    if not db_student:
        return None
    db.delete(db_student)
    db.commit()
    return db_student
