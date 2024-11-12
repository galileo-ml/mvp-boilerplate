from fastapi import APIRouter

from controllers import auth

# Your backend routes will be registered here.
api_router = APIRouter()

api_router.include_router(auth.router, tags=["users"])