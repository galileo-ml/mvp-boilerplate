from fastapi import APIRouter, HTTPException, Depends
from models.user import User
from utils.supabase import get_current_user, get_supabase_client

router = APIRouter()
@router.get("/auth/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    supabase = get_supabase_client()
    
    # Get subscription data from subscriptions table
    subscription = supabase.table('subscriptions')\
        .select('id, status, price_id, current_period_end, cancel_at_period_end')\
        .eq('user_id', current_user.id)\
        .order('created', desc=True)\
        .limit(1)\
        .execute()

    subscription_data = None
    if subscription.data:
        subscription_data = StripeSubscription(**subscription.data[0])

    return User(
        id=current_user.id,
        email=current_user.email,
        user_metadata=current_user.user_metadata,
        last_sign_in_at=current_user.last_sign_in_at,
        created_at=current_user.created_at,
        subscription=subscription_data
    )