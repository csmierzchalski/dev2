import type { DashboardStats, Subscription } from '@/types/types';

export function calculateDashboardStats(
  subscriptions: Subscription[],
): DashboardStats {
  const totalMonthlyCost = subscriptions.reduce(
    (sum, sub) => sum + sub.monthlyCost,
    0,
  );
  const activeSubscriptions = subscriptions.length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcomingRenewals = subscriptions.filter((sub) => {
    const renewalDate = new Date(sub.renewalDate);
    renewalDate.setHours(0, 0, 0, 0);
    return renewalDate >= today && renewalDate <= nextWeek;
  }).length;

  const totalHours = subscriptions.reduce(
    (sum, sub) => sum + sub.usageHours,
    0,
  );
  const costPerHour = totalHours > 0 ? totalMonthlyCost / totalHours : 0;

  return {
    totalMonthlyCost,
    activeSubscriptions,
    upcomingRenewals,
    costPerHour,
  };
}
