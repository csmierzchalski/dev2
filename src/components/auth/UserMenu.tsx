'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
          <span className="text-lg">{user.avatar || '👤'}</span>
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 glass border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-[60] animate-slide-down">
          <div className="p-4 border-b border-white/10">
            <p className="font-semibold text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {user.university && (
              <p className="text-xs text-muted-foreground mt-1">
                🎓 {user.university}
              </p>
            )}
          </div>

          <div className="p-2">
            <Link
              href="/app/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-foreground hover:bg-white/5 transition-all"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </Link>
            <Link
              href="/app/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-foreground hover:bg-white/5 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </Link>
          </div>

          <div className="p-2 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

