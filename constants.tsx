
import { Category, Subscription } from './types';

export const CATEGORIES = Object.values(Category);

export const INITIAL_MOCK_SUBS: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    cost: 15.99,
    // Fix: Added missing required shared_count property
    shared_count: 1,
    currency: 'USD',
    billing_cycle: 'monthly',
    next_due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: Category.Entertainment,
    is_active: true
  },
  {
    id: '2',
    name: 'Adobe Creative Cloud',
    cost: 54.99,
    // Fix: Added missing required shared_count property
    shared_count: 1,
    currency: 'USD',
    billing_cycle: 'monthly',
    next_due_date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: Category.Software,
    is_active: true
  },
  {
    id: '3',
    name: 'Spotify Family',
    cost: 16.99,
    // Fix: Added missing required shared_count property
    shared_count: 1,
    currency: 'USD',
    billing_cycle: 'monthly',
    next_due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: Category.Entertainment,
    is_active: true
  },
  {
    id: '4',
    name: 'ChatGPT Plus',
    cost: 20.00,
    // Fix: Added missing required shared_count property
    shared_count: 1,
    currency: 'USD',
    billing_cycle: 'monthly',
    next_due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: Category.SaaS,
    is_active: true
  }
];

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£'
};
