from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from services import data_service
from schemas.student import StudentCreate, StudentUpdate

router = APIRouter(prefix="/api", tags=["data"])

@router.get("/questions")
def read_questions(db: Session = Depends(get_db)):
    return data_service.get_questions(db)

@router.get("/student_stats")
def read_student_stats(db: Session = Depends(get_db)):
    return data_service.get_student_stats(db)

@router.get("/students")
def read_students(db: Session = Depends(get_db)):
    return data_service.get_students(db)

@router.get("/students/{student_id}")
def read_student(student_id: int, db: Session = Depends(get_db)):
    student = data_service.get_student(db, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.post("/students")
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    return data_service.create_student(db, student)

@router.put("/students/{student_id}")
def update_student(student_id: int, student: StudentUpdate, db: Session = Depends(get_db)):
    updated = data_service.update_student(db, student_id, student.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Student not found")
    return updated

@router.delete("/students/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    deleted = data_service.delete_student(db, student_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student deleted"}
