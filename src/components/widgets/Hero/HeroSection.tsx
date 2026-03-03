'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BRAND, STATS } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center pt-32 pb-24">
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">
              Aligned with UN SDG 12
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="block text-foreground">See What You Pay.</span>
            <span className="block gradient-text mt-2">
              Cancel What You Don&apos;t.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {BRAND.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/app"
              className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Tracking Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 glass rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
            >
              View Pricing
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="glass-card text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {STATS.wastagePercentage}%
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Subscription Waste
              </div>
            </div>
            <div className="glass-card text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                ${STATS.averageMonthlySpend}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Avg Monthly Spend
              </div>
            </div>
            <div className="glass-card text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {STATS.averageSubscriptions}+
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Avg Subscriptions
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 animate-slide-up">
          <div className="glass-card p-8 max-w-5xl mx-auto">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-card to-secondary/50 border border-white/10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
                  <span className="text-4xl">📊</span>
                </div>
                <p className="text-lg text-muted-foreground">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

