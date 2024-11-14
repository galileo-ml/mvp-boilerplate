from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client
from typing import List, Optional
from datetime import datetime

from config import settings

router = APIRouter()
security = HTTPBearer()

# Initialize Supabase client
supabase: Client = create_client(
    supabase_url=settings.SUPABASE_URL,
    supabase_key=settings.SUPABASE_KEY
)

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    metadata: Optional[dict] = None

class User(BaseModel):
    id: str
    email: EmailStr
    metadata: Optional[dict] = None
    last_sign_in_at: Optional[datetime] = None
    created_at: datetime

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: User

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        response = supabase.auth.get_user(credentials.credentials)

        return response.user
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.post("/users/create", response_model=User)
async def create_user(user_data: UserCreate):
    try:
        response = supabase.auth.admin.create_user({
            "email": user_data.email,
            "password": user_data.password,
            "email_confirm": True,
            "user_metadata": user_data.metadata
        })

        user = User(
            id=response.user.id,
            email=response.user.email,
            metadata=response.user.user_metadata,
            last_sign_in_at=response.user.last_sign_in_at,
            created_at=response.user.created_at
        )

        return user

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to create user: {str(e)}"
        )

@router.get("/users/", response_model=List[User])
async def get_users():
    try:
        response = supabase.auth.admin.list_users()
        
        return [
            User(
                id=user.id,
                email=user.email,
                metadata=user.user_metadata,
                last_sign_in_at=user.last_sign_in_at,
                created_at=user.created_at
            )
            for user in response.users
        ]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/auth/login", response_model=LoginResponse)
async def login(login_data: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": login_data.email,
            "password": login_data.password
        })
        
        return LoginResponse(
            access_token=response.session.access_token,
            refresh_token=response.session.refresh_token,
            user=User(
                id=response.user.id,
                email=response.user.email,
                metadata=response.user.user_metadata,
                last_sign_in_at=response.user.last_sign_in_at,
                created_at=response.user.created_at
            )
        )
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid credentials.")

@router.post("/auth/logout")
async def logout(current_user: User = Depends(get_current_user)):
    try:
        supabase.auth.sign_out()
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/auth/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return User(
        id=current_user.id,
        email=current_user.email,
        metadata=current_user.user_metadata,
        last_sign_in_at=current_user.last_sign_in_at,
        created_at=current_user.created_at
    )