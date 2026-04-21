// pages/about-us.tsx
import { Containers } from "@/components";
import type { Metadata } from "next";
import { Target, Users, Heart, Globe } from "lucide-react";
import { SDG_INFO } from "@/lib/constants";
import { formatGbp } from "@/lib/format-currency";

export const metadata: Metadata = {
  title: "About SubWise - Our Mission",
  description:
    "Learn about SubWise's mission to help students reduce financial and digital waste through smart subscription management.",
};

export default function AboutUs() {
  const values = [
    {
      icon: Target,
      title: "Student-First",
      description:
        "Built specifically for students navigating tight budgets and multiple subscriptions.",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description:
        "Aligned with UN SDG 12 to promote responsible consumption and reduce waste.",
    },
    {
      icon: Heart,
      title: "Transparency",
      description:
        "Clear insights into your spending with no hidden fees or surprise charges.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Empowering a community of conscious consumers making informed decisions.",
    },
  ];

  return (
    <Containers.Layout>
      <Containers.Section
        el={
          <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-20">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8">
                  <span className="text-sm font-medium text-primary">
                    Our Mission
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                  Helping students make{" "}
                  <span className="gradient-text">smarter choices</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  SubWise was born from a simple observation: students are paying
                  for too many subscriptions they barely use, and nobody is
                  helping them make sense of it all.
                </p>
              </div>

              <div className="glass-card mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  The Problem
                </h2>
                <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                  <p>
                    The average student now manages 12+ digital subscriptions,
                    spending over {formatGbp(273)} per month. Yet research shows that 42% of
                    this spending goes toward services they rarely or never use.
                  </p>
                  <p>
                    That&apos;s not just a financial problem—it&apos;s a
                    sustainability issue. Digital waste contributes to
                    overconsumption and takes a toll on both personal budgets and
                    the planet.
                  </p>
                  <p>
                    SubWise exists to change this. We give students the tools to
                    see exactly what they&apos;re paying for, understand the real
                    value of each subscription, and make informed decisions about
                    what to keep and what to cancel.
                  </p>
                </div>
              </div>

              <div className="glass-card mb-16 bg-gradient-to-br from-primary/10 to-transparent">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl">
                    🌍
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      UN Sustainable Development Goal {SDG_INFO.number}
                    </h2>
                    <p className="text-lg text-primary font-medium">
                      {SDG_INFO.title}
                    </p>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  {SDG_INFO.description} By helping students understand their
                  consumption patterns and eliminate unnecessary subscriptions,
                  we&apos;re contributing to a more sustainable future.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                  Our Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value) => (
                    <div
                      key={value.title}
                      className="glass-card hover:bg-white/10 transition-all"
                    >
                      <value.icon className="w-10 h-10 text-primary mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card text-center bg-gradient-to-br from-card to-secondary/50">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                  We envision a world where students have complete financial
                  clarity and control over their digital lives. Where every
                  pound spent is intentional, every subscription is valued, and
                  waste—both financial and digital—is a thing of the past.
                </p>
              </div>
            </div>
          </div>
        }
      />
    </Containers.Layout>
  );
}
