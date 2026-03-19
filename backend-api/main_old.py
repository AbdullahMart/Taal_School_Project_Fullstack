from fastapi import FastAPI, Depends, HTTPException, Body, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from database import get_db, Question, StudentStats, Student
from dotenv import load_dotenv

load_dotenv()

# JWT and Security Settings
SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()

# Helper Functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/questions")
def read_questions(db: Session = Depends(get_db)):
    questions = db.query(Question).all()
    return questions

@app.get("/api/student-stats")
def read_student_stats(db: Session = Depends(get_db)):
    stats = db.query(StudentStats).all()
    return stats

@app.get("/api/students")
def read_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return students

@app.post("/api/login")
def login(data: dict = Body(...)):
    email = data.get("email")
    password = data.get("password")
    
    env_email = os.getenv("AUTH_EMAIL")
    env_password = os.getenv("AUTH_PASSWORD")
    
    if email == env_email and password == env_password:
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": email}, expires_delta=access_token_expires
        )
        return {
            "status": "success", 
            "access_token": access_token, 
            "token_type": "bearer",
            "user": {
                "full_name": "John Doe",
                "email": email
            },
            "message": "Login successful"
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
