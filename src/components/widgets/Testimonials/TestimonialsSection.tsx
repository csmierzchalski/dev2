'use client';

import { testimonials } from '@/lib/mock-data';
import { Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Loved by <span className="gradient-text">students</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how SubWise is helping students save money and reduce waste
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-card hover:bg-white/10 transition-all"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Quote className="w-8 h-8 text-primary mb-4" />

              <p className="text-foreground/90 leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.university}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

