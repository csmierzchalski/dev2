export const BRAND = {
  name: "SubWise",
  tagline: "See What You Pay. Cancel What You Don't.",
  description:
    "Smart subscription management for students who care about their budget and the planet.",
} as const;

export const STATS = {
  averageSubscriptions: 12,
  wastagePercentage: 42,
  averageMonthlySpend: 273,
  unusedSubscriptionsPercentage: 35,
} as const;

export const SDG_INFO = {
  number: 12,
  title: "Responsible Consumption and Production",
  description:
    "SubWise helps students make informed decisions about their digital subscriptions, reducing financial waste and promoting mindful consumption.",
} as const;

export const NAVIGATION = {
  marketing: [
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  app: [
    { name: "Dashboard", href: "/app", icon: "LayoutDashboard" },
    {
      name: "Subscriptions",
      href: "/app/subscriptions",
      icon: "CreditCard",
    },
    { name: "Analytics", href: "/app/analytics", icon: "BarChart3" },
    { name: "Settings", href: "/app/settings", icon: "Settings" },
  ],
} as const;

export const CONTACT_INFO = {
  email: "hello@subwise.app",
  twitter: "@subwise_app",
  instagram: "@subwise",
} as const;

