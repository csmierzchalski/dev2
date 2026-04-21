'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  validateSubscriptionInput,
  validateSubscriptionPatch,
} from '@/lib/subscription-validation';
import type { Subscription } from '@/types/types';

const CATEGORIES: Subscription['category'][] = [
  'streaming',
  'productivity',
  'education',
  'design',
  'other',
];

type Mode = 'create' | 'edit';

export function SubscriptionEditorModal({
  open,
  mode,
  initial,
  onClose,
  onSubmitCreate,
  onSubmitEdit,
}: {
  open: boolean;
  mode: Mode;
  initial: Subscription | null;
  onClose: () => void;
  onSubmitCreate: (data: {
    name: string;
    category: Subscription['category'];
    monthlyCost: number;
    usageHours: number;
    renewalDate: string;
    logo: string;
    color: string;
  }) => Promise<{ error: Error | null }>;
  onSubmitEdit: (
    id: string,
    patch: Partial<{
      name: string;
      category: Subscription['category'];
      monthlyCost: number;
      usageHours: number;
      renewalDate: string;
      logo: string;
      color: string;
    }>,
  ) => Promise<{ error: Error | null }>;
}) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Subscription['category']>('other');
  const [monthlyCost, setMonthlyCost] = useState('');
  const [usageHours, setUsageHours] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [logo, setLogo] = useState('📦');
  const [color, setColor] = useState('#6366f1');
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setFormError(null);
    if (mode === 'edit' && initial) {
      setName(initial.name);
      setCategory(initial.category);
      setMonthlyCost(String(initial.monthlyCost));
      setUsageHours(String(initial.usageHours));
      setRenewalDate(initial.renewalDate.slice(0, 10));
      setLogo(initial.logo);
      setColor(initial.color);
    } else {
      setName('');
      setCategory('other');
      setMonthlyCost('');
      setUsageHours('');
      const t = new Date();
      setRenewalDate(t.toISOString().slice(0, 10));
      setLogo('📦');
      setColor('#6366f1');
    }
  }, [open, mode, initial]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    try {
      if (mode === 'create') {
        const parsed = validateSubscriptionInput({
          name,
          category,
          monthlyCost,
          usageHours,
          renewalDate,
          logo,
          color,
        });
        if (!parsed.ok) {
          setFormError(parsed.error);
          setSaving(false);
          return;
        }
        const { error } = await onSubmitCreate(parsed.data);
        if (error) {
          setFormError(error.message);
        } else {
          onClose();
        }
      } else if (initial) {
        const parsed = validateSubscriptionPatch({
          name,
          category,
          monthlyCost,
          usageHours,
          renewalDate,
          logo,
          color,
        });
        if (!parsed.ok) {
          setFormError(parsed.error);
          setSaving(false);
          return;
        }
        const { error } = await onSubmitEdit(initial.id, parsed.data);
        if (error) {
          setFormError(error.message);
        } else {
          onClose();
        }
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscription-editor-title"
    >
      <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2
            id="subscription-editor-title"
            className="text-xl font-semibold text-foreground"
          >
            {mode === 'create' ? 'Add subscription' : 'Edit subscription'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {formError && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sub-name" className="block text-sm font-medium text-foreground mb-1">
              Name
            </label>
            <input
              id="sub-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="sub-cat" className="block text-sm font-medium text-foreground mb-1">
              Category
            </label>
            <select
              id="sub-cat"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Subscription['category'])
              }
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sub-cost" className="block text-sm font-medium text-foreground mb-1">
              Monthly cost (GBP)
            </label>
            <input
              id="sub-cost"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={monthlyCost}
              onChange={(e) => setMonthlyCost(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="sub-hours" className="block text-sm font-medium text-foreground mb-1">
              Usage hours / month
            </label>
            <input
              id="sub-hours"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.5"
              value={usageHours}
              onChange={(e) => setUsageHours(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="sub-renewal" className="block text-sm font-medium text-foreground mb-1">
              Renewal date
            </label>
            <input
              id="sub-renewal"
              type="date"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sub-logo" className="block text-sm font-medium text-foreground mb-1">
                Logo (emoji)
              </label>
              <input
                id="sub-logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={8}
              />
            </div>
            <div>
              <label htmlFor="sub-color" className="block text-sm font-medium text-foreground mb-1">
                Accent colour
              </label>
              <div className="flex gap-2">
                <input
                  id="sub-color"
                  type="color"
                  value={color.length === 7 ? color : '#6366f1'}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-11 w-14 rounded cursor-pointer border border-white/10 bg-secondary"
                />
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-white/10 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  pattern="^#[0-9A-Fa-f]{6}$"
                  placeholder="#6366f1"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-white/10 text-foreground hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : mode === 'create' ? 'Add' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
