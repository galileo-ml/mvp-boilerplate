export interface Subscription {
    id: string;
    status: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid' | 'paused';
    price_id: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
  }
  
  export interface UserMetadata {
    name?: string
    avatar_url?: string
    full_name?: string
  }
  
  export interface User {
    id: string
    email: string
    user_metadata?: UserMetadata
    last_sign_in_at?: string
    created_at: string
  }
  
  export interface AppUser extends User {
    name: string | null
    avatar_url?: string
    subscription: Subscription
  }