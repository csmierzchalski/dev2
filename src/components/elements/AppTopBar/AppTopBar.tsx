'use client';

import { Bell } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserMenu } from '@/components/auth/UserMenu';

export function AppTopBar() {
  const { user } = useAuth();

  return (
    <header className="h-16 glass border-b border-white/10 flex items-center justify-between px-6 relative z-[80]">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user?.name || 'Student'}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        <UserMenu />
      </div>
    </header>
  );
}

