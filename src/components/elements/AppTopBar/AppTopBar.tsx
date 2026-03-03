'use client';

import { Bell, User } from 'lucide-react';

export function AppTopBar() {
  return (
    <header className="h-16 glass border-b border-white/10 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Welcome back to SubWise
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">Student</span>
        </button>
      </div>
    </header>
  );
}

