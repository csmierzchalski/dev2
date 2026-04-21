'use client';

import { AppLayout } from "@/components/containers/Layout/AppLayout";
import { StatCard } from "@/components/elements/StatCard";
import { formatGbp } from "@/lib/format-currency";
import { calculateDashboardStats } from "@/lib/dashboard-stats";
import { useSubscriptionsQuery } from "@/hooks/useSubscriptionsQuery";
import { PoundSterling, CreditCard, Calendar, Clock, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AppDashboardPage() {
  const { subscriptions, loading, error, refetch } = useSubscriptionsQuery();

  const { totalMonthlyCost, activeSubscriptions, upcomingRenewals, costPerHour } =
    calculateDashboardStats(subscriptions);

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

        {error && (
          <div className="glass-card border-destructive/30 bg-destructive/10 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Could not load data</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {loading && !error && (
          <div className="flex items-center gap-2 text-muted-foreground py-4">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading dashboard…
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Monthly Cost"
            value={formatGbp(totalMonthlyCost)}
            icon={PoundSterling}
            trend="Live total (GBP)"
          />
          <StatCard
            title="Active Subscriptions"
            value={activeSubscriptions}
            icon={CreditCard}
            trend={
              activeSubscriptions === 0
                ? "Add some on Subscriptions"
                : "From your library"
            }
          />
          <StatCard
            title="Upcoming Renewals"
            value={upcomingRenewals}
            icon={Calendar}
            trend="Next 7 days"
          />
          <StatCard
            title="Avg Cost / Hour"
            value={formatGbp(costPerHour)}
            icon={Clock}
            trend="Based on logged usage"
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-xl font-semibold text-foreground">
              Recent subscriptions
            </h2>
            <Link
              href="/app/subscriptions"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Manage all →
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Latest entries from your list (up to three).
          </p>
          {!loading && !error && subscriptions.length === 0 && (
            <div className="glass-card border-dashed border-white/15 py-10 text-center text-muted-foreground">
              <p className="mb-3">No subscriptions yet.</p>
              <Link
                href="/app/subscriptions"
                className="inline-flex text-primary font-medium hover:underline"
              >
                Add your first subscription
              </Link>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {!loading &&
              subscriptions.slice(0, 3).map((sub) => (
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
                      {formatGbp(sub.monthlyCost)}
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
