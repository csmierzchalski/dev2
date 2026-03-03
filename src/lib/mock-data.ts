import { Subscription, Testimonial, Feature, PricingTier, FAQ } from '@/types/types';

export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'streaming',
    monthlyCost: 15.49,
    usageHours: 28,
    renewalDate: '2026-03-15',
    logo: '🎬',
    color: '#E50914',
  },
  {
    id: '2',
    name: 'Spotify',
    category: 'streaming',
    monthlyCost: 10.99,
    usageHours: 45,
    renewalDate: '2026-03-08',
    logo: '🎵',
    color: '#1DB954',
  },
  {
    id: '3',
    name: 'Notion',
    category: 'productivity',
    monthlyCost: 8.0,
    usageHours: 62,
    renewalDate: '2026-03-20',
    logo: '📝',
    color: '#000000',
  },
  {
    id: '4',
    name: 'Duolingo',
    category: 'education',
    monthlyCost: 6.99,
    usageHours: 12,
    renewalDate: '2026-03-25',
    logo: '🦉',
    color: '#58CC02',
  },
  {
    id: '5',
    name: 'Canva',
    category: 'design',
    monthlyCost: 12.99,
    usageHours: 18,
    renewalDate: '2026-03-10',
    logo: '🎨',
    color: '#00C4CC',
  },
  {
    id: '6',
    name: 'GitHub Copilot',
    category: 'productivity',
    monthlyCost: 10.0,
    usageHours: 35,
    renewalDate: '2026-03-18',
    logo: '💻',
    color: '#6e40c9',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Computer Science Student',
    university: 'MIT',
    content:
      "I was paying for 8 subscriptions but only using 4 regularly. SubWise helped me identify $47/month in waste. That's textbook money!",
    avatar: '👩‍💻',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Business Major',
    university: 'Stanford',
    content:
      'The cost-per-hour analytics changed how I think about subscriptions. Now I only keep services I actually use. Saved over $100 last semester.',
    avatar: '👨‍🎓',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Design Student',
    university: 'RISD',
    content:
      'As a design student on a tight budget, every dollar counts. SubWise made it easy to see which subscriptions were worth keeping.',
    avatar: '👩‍🎨',
  },
];

export const features: Feature[] = [
  {
    id: '1',
    title: 'Dashboard Overview',
    description:
      'See all your subscriptions in one place. Track spending, renewals, and get a clear picture of where your money goes each month.',
    icon: 'LayoutDashboard',
  },
  {
    id: '2',
    title: 'Smart Renewal Reminders',
    description:
      'Never get surprised by unexpected charges. Get notified before renewals so you can decide whether to keep or cancel.',
    icon: 'Bell',
  },
  {
    id: '3',
    title: 'Cost-Per-Hour Analytics',
    description:
      "Discover the true value of your subscriptions. See how much you're paying per hour of actual usage to make smarter decisions.",
    icon: 'TrendingUp',
  },
  {
    id: '4',
    title: 'Eco Impact Awareness',
    description:
      'Understand the environmental impact of digital consumption. Reduce waste in line with UN Sustainable Development Goal 12.',
    icon: 'Leaf',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    period: 'month',
    description: 'Perfect for students just starting to track subscriptions',
    features: [
      'Track up to 5 subscriptions',
      'Manual subscription entry',
      'Basic renewal reminders',
      'Simple dashboard view',
      'Monthly spending overview',
    ],
  },
  {
    name: 'Premium',
    price: 4.99,
    period: 'month',
    description: 'For students serious about managing their budget',
    features: [
      'Unlimited subscriptions',
      'Cost-per-hour analytics',
      'Advanced usage tracking',
      'Smart cancellation insights',
      'Export reports',
      'Priority email support',
      'Future: Bank integrations',
      'Future: Shared family plans',
    ],
    highlighted: true,
  },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How does SubWise work?',
    answer:
      "SubWise helps you track all your digital subscriptions in one place. Simply add your subscriptions manually, and we'll help you analyze your spending, remind you of upcoming renewals, and show you which services offer the best value based on your usage.",
  },
  {
    id: '2',
    question: 'Is my payment information secure?',
    answer:
      "Currently, SubWise requires manual entry of subscription data—we don't connect to your bank or store payment information. You simply track costs manually, making it completely secure and private.",
  },
  {
    id: '3',
    question: 'Can SubWise automatically cancel subscriptions?',
    answer:
      "Not yet. SubWise provides insights and reminders, but you'll need to cancel subscriptions directly with each service provider. We're working on partnerships to make this easier in the future.",
  },
  {
    id: '4',
    question: 'What makes SubWise different from other budgeting apps?',
    answer:
      'SubWise is built specifically for students and focuses exclusively on subscription management. We provide unique features like cost-per-hour analytics and align with sustainable consumption goals (SDG 12).',
  },
  {
    id: '5',
    question: 'Do I need to upgrade to Premium?',
    answer:
      'Not at all! Our Free tier is perfect for students tracking basic subscriptions. Upgrade to Premium if you want deeper insights, unlimited tracking, and advanced analytics to maximize your savings.',
  },
];

export const calculateDashboardStats = () => {
  const totalMonthlyCost = mockSubscriptions.reduce(
    (sum, sub) => sum + sub.monthlyCost,
    0,
  );
  const activeSubscriptions = mockSubscriptions.length;

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingRenewals = mockSubscriptions.filter((sub) => {
    const renewalDate = new Date(sub.renewalDate);
    return renewalDate >= today && renewalDate <= nextWeek;
  }).length;

  const totalHours = mockSubscriptions.reduce(
    (sum, sub) => sum + sub.usageHours,
    0,
  );
  const costPerHour = totalHours > 0 ? totalMonthlyCost / totalHours : 0;

  return {
    totalMonthlyCost,
    activeSubscriptions,
    upcomingRenewals,
    costPerHour,
  };
};

