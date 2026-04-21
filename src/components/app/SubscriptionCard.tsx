import { Calendar, Clock, Pencil, Trash2 } from 'lucide-react';
import { formatGbp } from '@/lib/format-currency';
import type { Subscription } from '@/types/types';
import React from 'react';

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const SubscriptionCard = ({
  subscription,
  onEdit,
  onDelete,
}: SubscriptionCardProps) => {
  const costPerHour =
    subscription.usageHours > 0
      ? subscription.monthlyCost / subscription.usageHours
      : 0;
  const renewalDate = new Date(subscription.renewalDate);
  const daysUntilRenewal = Math.max(
    0,
    Math.ceil(
      (renewalDate.getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <div className="glass-card hover:bg-white/10 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${subscription.color}20` }}
          >
            {subscription.logo}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {subscription.name}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              {subscription.category}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-foreground">
            {formatGbp(subscription.monthlyCost)}
          </p>
          <p className="text-xs text-muted-foreground">per month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground">Cost/Hour</p>
            <p className="font-semibold text-foreground">
              {formatGbp(costPerHour)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground">Renews in</p>
            <p className="font-semibold text-foreground">
              {daysUntilRenewal} days
            </p>
          </div>
        </div>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-white/10">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-destructive/15 text-destructive transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

