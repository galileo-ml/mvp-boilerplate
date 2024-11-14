from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from config import settings

from api.main import api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.all_cors_origins,  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)