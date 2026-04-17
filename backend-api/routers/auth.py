from fastapi import APIRouter, Body, HTTPException, status
from datetime import timedelta
from core.config import AUTH_EMAIL, AUTH_PASSWORD, ACCESS_TOKEN_EXPIRE_MINUTES
from core.security import create_access_token

router = APIRouter(prefix="/api", tags=["auth"])

@router.post("/login")
def login(data: dict = Body(...)):
    email = data.get("email")
    password = data.get("password")
    
    if email == AUTH_EMAIL and password == AUTH_PASSWORD:
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
