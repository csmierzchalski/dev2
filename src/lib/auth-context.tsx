'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { User, AuthState } from '@/types/auth';
import { supabaseBrowserClient } from '@/utils/supabase/client';

interface AuthContextType extends AuthState {
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUserFromSupabase = async () => {
      try {
        const {
          data: { user: supabaseUser },
        } = await supabaseBrowserClient.auth.getUser();

        if (!isMounted) return;

        if (supabaseUser) {
          const metadata = supabaseUser.user_metadata as {
            full_name?: string;
            university?: string;
          } | null;

          const mappedUser: User = {
            id: supabaseUser.id,
            email: supabaseUser.email ?? '',
            name:
              metadata?.full_name ??
              supabaseUser.email?.split('@')[0] ??
              'User',
            university: metadata?.university,
            avatar: '👤',
            createdAt: supabaseUser.created_at ?? new Date().toISOString(),
          };

          setUser(mappedUser);
        } else {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadUserFromSupabase();

    return () => {
      isMounted = false;
    };
  }, []);

  const logout = async () => {
    await supabaseBrowserClient.auth.signOut();
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

