import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  /** Omit for neutral (muted) trend styling. */
  trendUp?: boolean;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: StatCardProps) => {
  return (
    <div className="glass-card hover:bg-white/10 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      {trend && (
        <p
          className={`text-sm ${
            trendUp === undefined
              ? 'text-muted-foreground'
              : trendUp
                ? 'text-green-400'
                : 'text-red-400'
          }`}
        >
          {trend}
        </p>
      )}
    </div>
  );
}

