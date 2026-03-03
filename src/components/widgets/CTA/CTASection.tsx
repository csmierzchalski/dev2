'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Heading } from '@/components/elements/Heading/Heading';

export function CTASection() {
  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="glass-card text-center p-12 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-600/10" />

          <div className="relative space-y-8">
            <Heading
              variant="h2"
              className="text-4xl md:text-5xl lg:text-6xl"
            >
              Ready to take control of your{' '}
              <span className="gradient-text">subscriptions?</span>
            </Heading>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of students who are saving money and reducing digital
              waste with SubWise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/app"
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 glass rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


