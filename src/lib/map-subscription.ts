import type { Subscription } from '@/types/types';

export type SubscriptionRow = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  monthly_cost: number | string;
  usage_hours: number | string;
  renewal_date: string;
  logo: string;
  color: string;
};

export function mapRowToSubscription(row: SubscriptionRow): Subscription {
  const renewal =
    typeof row.renewal_date === 'string'
      ? row.renewal_date.slice(0, 10)
      : String(row.renewal_date);

  return {
    id: row.id,
    name: row.name,
    category: row.category as Subscription['category'],
    monthlyCost: Number(row.monthly_cost),
    usageHours: Number(row.usage_hours),
    renewalDate: renewal,
    logo: row.logo,
    color: row.color,
  };
}
