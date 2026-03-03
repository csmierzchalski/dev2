export interface Subscription {
    id: string;
    name: string;
    category: 'streaming' | 'productivity' | 'education' | 'design' | 'other';
    monthlyCost: number;
    usageHours: number;
    renewalDate: string;
    logo: string;
    color: string;
  }
  
  export interface DashboardStats {
    totalMonthlyCost: number;
    activeSubscriptions: number;
    upcomingRenewals: number;
    costPerHour: number;
  }
  
  export interface Testimonial {
    id: string;
    name: string;
    role: string;
    university: string;
    content: string;
    avatar: string;
  }
  
  export interface Feature {
    id: string;
    title: string;
    description: string;
    icon: string;
  }
  
  export interface PricingTier {
    name: string;
    price: number;
    period: 'month' | 'year';
    description: string;
    features: string[];
    highlighted?: boolean;
  }
  
 export interface FAQ {
   id: string;
   question: string;
   answer: string;
 }
 