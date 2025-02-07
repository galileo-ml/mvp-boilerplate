'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    getToken: () => Promise<string | null>;
    login: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
    signup: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
    updateUserProfile: (name: string) => Promise<{ message: string }>;
  };
  
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user && !error) {
          setUser({
            id: user.id,
            email: user.email || '',
            user_metadata: user.user_metadata,
            created_at: user.created_at,
            last_sign_in_at: user.last_sign_in_at
          });
        }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              user_metadata: session.user.user_metadata,
              created_at: session.user.created_at,
              last_sign_in_at: session.user.last_sign_in_at
            })
          } else {
            setUser(null)
          }
          setLoading(false)
        }
      )

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const login = async (formData: FormData): Promise<{ error?: string; success?: boolean }> => {
    // type-cast inputs – ideally add validation here
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: error.message };
    }

    router.push('/');
    return { success: true };
  };

  const signup = async (formData: FormData): Promise<{ error?: string; success?: boolean }> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });
    if (error) {
      router.push('/error');
      return { error: error.message };
    }
    router.push('/');
    return { success: true };
  };
  
  const updateUserProfile = async (name: string): Promise<{ message: string }> => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    });
    if (error) {
      throw error;
    }

    return { message: 'Profile updated successfully' };
  };

  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, getToken, login, signup, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};