'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { pricingTiers } from '@/lib/mock-data';

export function PricingPageContent() {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free, upgrade when you need more power. No hidden fees, cancel
            anytime.
          </p>

          <div className="inline-flex items-center space-x-4 glass p-2 rounded-xl">
            <button
              onClick={() => setBillingPeriod('month')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                billingPeriod === 'month'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('year')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                billingPeriod === 'year'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-primary/20 px-2 py-0.5 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => {
            const price =
              billingPeriod === 'year' && tier.price > 0
                ? (tier.price * 12 * 0.8).toFixed(2)
                : tier.price;
            const period = billingPeriod === 'year' ? 'year' : 'month';

            return (
              <div
                key={tier.name}
                className={`glass-card relative ${
                  tier.highlighted
                    ? 'border-2 border-primary shadow-2xl shadow-primary/20'
                    : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {tier.name}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {tier.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold gradient-text">
                        ${price}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        /{period}
                      </span>
                    </div>
                    {billingPeriod === 'year' && tier.price > 0 && (
                      <p className="text-sm text-primary mt-2">
                        Save ${(tier.price * 12 * 0.2).toFixed(2)} per year
                      </p>
                    )}
                  </div>

                  <Link
                    href="/app"
                    className={`block w-full py-3 rounded-lg font-semibold transition-all ${
                      tier.highlighted
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'glass hover:bg-white/10'
                    }`}
                  >
                    {tier.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                  </Link>
                </div>

                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions about pricing?
          </p>
          <Link
            href="/contact"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Contact our team →
          </Link>
        </div>
      </div>
    </div>
  );
}

