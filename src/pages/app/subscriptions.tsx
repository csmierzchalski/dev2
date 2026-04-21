'use client';

import { useState } from 'react';
import { Plus, AlertCircle, Loader2 } from 'lucide-react';
import { AppLayout } from '@/components/containers/Layout/AppLayout';
import { SubscriptionCard } from '@/components/app/SubscriptionCard';
import { SubscriptionEditorModal } from '@/components/app/SubscriptionEditorModal';
import { useSubscriptionsQuery } from '@/hooks/useSubscriptionsQuery';
import type { Subscription } from '@/types/types';

export default function SubscriptionsPage() {
  const { subscriptions, loading, error, refetch, add, update, remove } =
    useSubscriptionsQuery();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editing, setEditing] = useState<Subscription | null>(null);

  const openCreate = () => {
    setEditing(null);
    setEditorMode('create');
    setEditorOpen(true);
  };

  const openEdit = (sub: Subscription) => {
    setEditing(sub);
    setEditorMode('edit');
    setEditorOpen(true);
  };

  const handleDelete = async (sub: Subscription) => {
    const ok = window.confirm(
      `Delete “${sub.name}”? This cannot be undone.`,
    );
    if (!ok) return;
    const { error: err } = await remove(sub.id);
    if (err) {
      window.alert(err.message);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Subscriptions</h1>
            <p className="text-muted-foreground mt-1">
              Add, edit, or remove subscriptions. Amounts are in GBP.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shrink-0"
          >
            <Plus className="w-5 h-5" />
            Add subscription
          </button>
        </div>

        {error && (
          <div className="glass-card border-destructive/30 bg-destructive/10 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Could not load subscriptions</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
              <p className="text-sm text-muted-foreground mt-2">
                If the table is missing, run <code className="text-xs bg-secondary px-1 rounded">supabase/migrations/001_subscriptions.sql</code> in the Supabase SQL Editor, then retry.
              </p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-3 text-sm text-primary hover:underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {loading && !error && (
          <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading subscriptions…</span>
          </div>
        )}

        {!loading && !error && subscriptions.length === 0 && (
          <div className="glass-card text-center py-16 px-6 border-dashed border-white/15">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No subscriptions yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Track your monthly spend in GBP. Add your first subscription to see it here and on the dashboard.
            </p>
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
            >
              <Plus className="w-5 h-5" />
              Add subscription
            </button>
          </div>
        )}

        {!loading && !error && subscriptions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                onEdit={() => openEdit(sub)}
                onDelete={() => void handleDelete(sub)}
              />
            ))}
          </div>
        )}

        <SubscriptionEditorModal
          open={editorOpen}
          mode={editorMode}
          initial={editing}
          onClose={() => setEditorOpen(false)}
          onSubmitCreate={async (data) => add(data)}
          onSubmitEdit={async (id, patch) => update(id, patch)}
        />
      </div>
    </AppLayout>
  );
}
