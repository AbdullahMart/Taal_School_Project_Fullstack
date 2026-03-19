from sqlalchemy import Column, Integer, String, DateTime, Text, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import urllib.parse
from dotenv import load_dotenv

# .env dosyasını yükle
load_dotenv()

db_user = os.getenv("DB_USER", "root")
db_password = urllib.parse.quote_plus(os.getenv("DB_PASSWORD", ""))
db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", "3306")
db_name = os.getenv("DB_NAME", "app_db")

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Question(Base):
    __tablename__ = "app_question_body"

    id = Column(Integer, primary_key=True, index=True)
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

    student_id = Column(Integer, primary_key=True, index=True)
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

    student_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    country = Column(String(100))
    age = Column(Integer)
    gender = Column(String(50))
    education_level = Column(String(100))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
