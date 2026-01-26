
import { Subscription, InsightsSummary, User, Category, Alert } from '../types';
import { INITIAL_MOCK_SUBS } from '../constants';

const STORAGE_KEY = 'cusub_data';
const ALERTS_KEY = 'cusub_alerts';
const USER_KEY = 'cusub_user';

class ApiService {
  private getStorage(): Subscription[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_MOCK_SUBS;
    return JSON.parse(data);
  }

  private setStorage(subs: Subscription[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  }

  async login(email: string, name?: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user: User = { 
      id: 'user_1', 
      email, 
      name: name || email.split('@')[0], 
      token: 'mock_jwt_' + Date.now(),
      preferences: {
        default_currency: 'USD',
        alert_sensitivity: 'aggressive'
      }
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(USER_KEY);
  }

  async deleteAccount(): Promise<void> {
    localStorage.clear();
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return this.getStorage();
  }

  async addSubscription(sub: Omit<Subscription, 'id' | 'is_active'>): Promise<Subscription> {
    const newSub: Subscription = {
      ...sub,
      id: Math.random().toString(36).substr(2, 9),
      is_active: true,
      usage_score: Math.floor(Math.random() * 100)
    };
    const subs = this.getStorage();
    const updated = [...subs, newSub];
    this.setStorage(updated);
    return newSub;
  }

  async updateSubscription(id: string, updates: Partial<Subscription>): Promise<Subscription> {
    const subs = this.getStorage();
    const index = subs.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Not found');
    subs[index] = { ...subs[index], ...updates };
    this.setStorage(subs);
    return subs[index];
  }

  async deleteSubscription(id: string): Promise<void> {
    const subs = this.getStorage();
    this.setStorage(subs.filter(s => s.id !== id));
  }

  async bulkDeleteSubscriptions(ids: string[]): Promise<void> {
    const subs = this.getStorage();
    this.setStorage(subs.filter(s => !ids.includes(s.id)));
  }

  async bulkUpdateSubscriptions(ids: string[], updates: Partial<Subscription>): Promise<void> {
    const subs = this.getStorage();
    const updated = subs.map(s => ids.includes(s.id) ? { ...s, ...updates } : s);
    this.setStorage(updated);
  }

  async syncBankIntelligence(): Promise<Subscription[]> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newSub: Subscription = {
      id: 'zombie_' + Date.now(),
      name: 'Unused VPN Pro',
      cost: 12.99,
      shared_count: 1,
      seat_count: 1,
      usage_score: 5,
      currency: 'USD',
      billing_cycle: 'monthly',
      next_due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: Category.SaaS,
      is_active: true
    };
    const subs = this.getStorage();
    const updated = [...subs, newSub];
    this.setStorage(updated);
    
    const alerts = await this.getAlerts();
    const newAlert: Alert = {
      id: 'alert_' + Date.now(),
      type: 'usage',
      severity: 'high',
      title: 'Low Usage Asset Detected',
      description: 'Institutional sync identified "Unused VPN Pro" with 5% utilization score. Recommend tactical churn.',
      timestamp: new Date().toISOString(),
      relatedAssetId: newSub.id,
      isRead: false
    };
    localStorage.setItem(ALERTS_KEY, JSON.stringify([newAlert, ...alerts]));
    
    return updated;
  }

  async getAlerts(): Promise<Alert[]> {
    const data = localStorage.getItem(ALERTS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  }

  async markAlertAsRead(id: string): Promise<void> {
    const alerts = await this.getAlerts();
    const updated = alerts.map(a => a.id === id ? { ...a, isRead: true } : a);
    localStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
  }

  async exportSovereignData(): Promise<string> {
    const data = {
      user: JSON.parse(localStorage.getItem(USER_KEY) || '{}'),
      assets: this.getStorage(),
      alerts: await this.getAlerts(),
      audit_timestamp: new Date().toISOString(),
      encryption_protocol: 'AES-256-GCM',
      compliance_status: 'GDPR_VERIFIED'
    };
    return JSON.stringify(data, null, 2);
  }

  async getInsights(): Promise<InsightsSummary> {
    const subs = this.getStorage().filter(s => s.is_active);
    const personalMonthly = subs.reduce((acc, s) => {
      const monthlyCost = s.billing_cycle === 'yearly' ? s.cost / 12 : s.cost;
      return acc + (monthlyCost / (s.shared_count || 1));
    }, 0);

    const totalUsage = subs.reduce((acc, s) => acc + (s.usage_score || 0), 0);
    const teamEfficiency = subs.length > 0 ? totalUsage / subs.length : 100;

    return {
      total_monthly_spend: subs.reduce((acc, s) => acc + (s.billing_cycle === 'yearly' ? s.cost / 12 : s.cost), 0),
      personal_monthly_spend: personalMonthly,
      upcoming_payments_count: subs.length,
      top_category: 'Software',
      team_efficiency: teamEfficiency,
      monthly_trend: [
        { month: 'Jun', amount: personalMonthly * 0.85 },
        { month: 'Jul', amount: personalMonthly * 0.92 },
        { month: 'Aug', amount: personalMonthly },
      ],
      category_distribution: []
    };
  }
}

export const api = new ApiService();
