import { AppLayout } from "@/components/containers/Layout/AppLayout";
import { StatCard } from "@/components/elements/StatCard";
import { mockSubscriptions, calculateDashboardStats } from "@/lib/mock-data";
import { DollarSign, CreditCard, Calendar, Clock } from "lucide-react";

export default function AppDashboardPage() {
  const { totalMonthlyCost, activeSubscriptions, upcomingRenewals, costPerHour } =
    calculateDashboardStats();

  return (
    <AppLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Overview
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s a quick snapshot of your subscriptions this month.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Monthly Cost"
            value={`$${totalMonthlyCost.toFixed(2)}`}
            icon={DollarSign}
            trend="-5% vs last month"
            trendUp={false}
          />
          <StatCard
            title="Active Subscriptions"
            value={activeSubscriptions}
            icon={CreditCard}
            trend="+2 new this month"
            trendUp
          />
          <StatCard
            title="Upcoming Renewals"
            value={upcomingRenewals}
            icon={Calendar}
            trend="Next 7 days"
          />
          <StatCard
            title="Avg Cost / Hour"
            value={`$${costPerHour.toFixed(2)}`}
            icon={Clock}
            trend="Based on logged usage"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Recent subscriptions
          </h2>
          <p className="text-sm text-muted-foreground">
            This is a simple placeholder list. You&apos;ll be able to manage, edit
            and cancel subscriptions from here.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockSubscriptions.slice(0, 3).map((sub) => (
              <div
                key={sub.id}
                className="glass-card border-dashed border-white/10 text-sm text-muted-foreground"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{sub.logo}</span>
                    <span className="font-medium text-foreground">
                      {sub.name}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${sub.monthlyCost.toFixed(2)}
                  </span>
                </div>
                <p>Category: {sub.category}</p>
                <p>Hours / month: {sub.usageHours}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

