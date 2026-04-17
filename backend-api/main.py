from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import data, auth
from db import engine, Base
from models import models  # noqa: F401 - ensure models are registered

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(data.router)
app.include_router(auth.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
