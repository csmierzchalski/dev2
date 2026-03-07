'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const supabase = supabaseBrowserClient;
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the user is already logged in (e.g. they hit /login manually),
  // immediately send them to the app dashboard.
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      window.location.replace('/app');
    }
  }, [authLoading, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: supabaseError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (supabaseError) {
      setError(
        supabaseError.message ||
          'Could not sign in. Please check your credentials and try again.',
      );
      setIsLoading(false);
      return;
    }

    // Full page nav so middleware sees session cookies on the next request
    window.location.href = '/app';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Login to SubWise
          </h1>
          <p className="text-muted-foreground">
            Sign in with your email and password.
          </p>
        </div>

        {error && (
          <div className="glass-card bg-destructive/10 border-destructive/20 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-card space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="student@university.edu"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-secondary border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}

