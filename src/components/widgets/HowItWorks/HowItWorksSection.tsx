'use client';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Add Your Subscriptions',
      description:
        'Manually track all your streaming, productivity, and other recurring services in one place.',
    },
    {
      number: '02',
      title: 'Track Your Usage',
      description:
        'Log how many hours you actually use each service to calculate real value.',
    },
    {
      number: '03',
      title: 'Make Smart Decisions',
      description:
        'Get insights on cost-per-hour, renewal alerts, and cancellation recommendations.',
    },
  ];

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="relative glass-card text-center hover:bg-white/10 transition-all">
                <div className="text-6xl font-bold gradient-text mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

