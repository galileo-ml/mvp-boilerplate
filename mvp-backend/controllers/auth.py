from fastapi import APIRouter, HTTPException, Depends
from models.user import User
from utils.supabase import get_current_user

router = APIRouter()

@router.get("/auth/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return User(
        id=current_user.id,
        email=current_user.email,
        metadata=current_user.user_metadata,
        last_sign_in_at=current_user.last_sign_in_at,
        created_at=current_user.created_at
    )