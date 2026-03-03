import { AppLayout } from "@/components/containers/Layout/AppLayout";

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
            <span className="text-4xl">📊</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Analytics</h1>
          <p className="text-muted-foreground">
            Advanced analytics and insights coming soon
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

