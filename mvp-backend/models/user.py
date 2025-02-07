from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

class StripeSubscription(BaseModel):
    id: str
    status: str  # One of: 'trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'paused'
    price_id: str
    current_period_end: datetime
    cancel_at_period_end: bool

class User(BaseModel):
    id: str
    email: str
    user_metadata: Optional[Dict] = None
    last_sign_in_at: Optional[datetime] = None
    created_at: datetime
    subscription: Optional[StripeSubscription] = None

    @property
    def is_pro(self) -> bool:
        if not self.subscription:
            return False
        return self.subscription.status in ['trialing', 'active'] and not self.subscription.cancel_at_period_end