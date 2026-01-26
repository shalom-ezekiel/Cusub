
export type Currency = 'USD' | 'EUR' | 'GBP';
export type BillingCycle = 'monthly' | 'yearly';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  last_cost?: number;
  shared_count: number;
  seat_count?: number;
  usage_score?: number;
  currency: Currency;
  billing_cycle: BillingCycle;
  next_due_date: string;
  category: string;
  is_active: boolean;
  icon?: string;
}

export interface User {
  id: string;
  email: string;
  name: string; // Phase 4: Personalized greetings
  token?: string;
  preferences: {
    default_currency: Currency;
    alert_sensitivity: 'conservative' | 'aggressive';
  };
}

export interface Alert {
  id: string;
  type: 'renewal' | 'price_hike' | 'usage' | 'security' | 'system';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  timestamp: string;
  relatedAssetId?: string;
  isRead: boolean;
}

export interface InsightsSummary {
  total_monthly_spend: number;
  personal_monthly_spend: number;
  upcoming_payments_count: number;
  top_category: string;
  team_efficiency?: number;
  monthly_trend: { month: string; amount: number }[];
  category_distribution: { name: string; value: number }[];
}

export enum Category {
  Entertainment = 'Entertainment',
  Utilities = 'Utilities',
  SaaS = 'SaaS',
  Software = 'Software',
  Health = 'Health',
  Financial = 'Financial',
  Other = 'Other'
}
