import type { ReactNode } from 'react';
import { Elements } from '@/components';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Elements.AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Elements.AppTopBar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

