from sqlalchemy.orm import Session
from models.models import Question, StudentStats, Student

def get_questions(db: Session):
    return db.query(Question).all()

def get_student_stats(db: Session):
    return db.query(StudentStats).all()

def get_students(db: Session):
    return db.query(Student).all()
