from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from db import Base

class Question(Base):
    __tablename__ = "app_question_body"

    question_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    created_at = Column(DateTime)
    level = Column(String(10))
    skill = Column(String(50))
    code = Column(String(50))
    title = Column(String(255))
    paragraphs = Column(Integer)
    question_count = Column(Integer)
    status = Column(String(50))

class StudentStats(Base):
    __tablename__ = "student_stats"

    student_stats_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    country = Column(String(100))
    field_of_study = Column(String(100))
    platform_used = Column(String(100))
    device_used = Column(String(50))
    learning_mode = Column(String(50))
    enrollment_date = Column(String(50))
    daily_learning_hours = Column(String(20))
    quizzes_attempted = Column(Integer)
    assignments_submitted = Column(Integer)
    course_completion_rate = Column(String(20))
    satisfaction_score = Column(Integer)

class Student(Base):
    __tablename__ = "students"

    student_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    country = Column(String(100))
    age = Column(Integer)
    gender = Column(String(50))
    education_level = Column(String(100))
    field_of_study = Column(String(100))
