
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { Currency, BillingCycle, Subscription } from '../types';

interface SubscriptionFormProps {
  onClose: () => void;
  onSave: (sub: Omit<Subscription, 'id' | 'is_active'>) => void;
  initialData?: Subscription;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    cost: initialData?.cost || 0,
    shared_count: initialData?.shared_count || 1,
    seat_count: initialData?.seat_count || 1,
    currency: initialData?.currency || 'USD' as Currency,
    billing_cycle: initialData?.billing_cycle || 'monthly' as BillingCycle,
    next_due_date: initialData?.next_due_date || new Date().toISOString().split('T')[0],
    category: initialData?.category || CATEGORIES[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-10 py-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h3 className="text-2xl font-black text-zinc-100 tracking-tight">{initialData ? 'Audit Asset' : 'Ingest Asset'}</h3>
            <p className="text-zinc-500 text-sm">Phase 3: Institutional Monitoring Active</p>
          </div>
          <button onClick={onClose} className="p-3 bg-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 rounded-2xl transition-all">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">Service Entity</label>
            <input
              required
              type="text"
              placeholder="e.g. Netflix Elite"
              className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-700 font-bold"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Liability</label>
              <input
                required
                type="number"
                step="0.01"
                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold"
                value={formData.cost}
                onChange={e => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">License Seats</label>
              <input
                required
                type="number"
                min="1"
                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold"
                value={formData.seat_count}
                onChange={e => setFormData({ ...formData, seat_count: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">Cycle</label>
              <select
                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold"
                value={formData.billing_cycle}
                onChange={e => setFormData({ ...formData, billing_cycle: e.target.value as BillingCycle })}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">Classification</label>
              <select
                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">Next Settlement Date</label>
            <input
              required
              type="date"
              className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold [color-scheme:dark]"
              value={formData.next_due_date}
              onChange={e => setFormData({ ...formData, next_due_date: e.target.value })}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black py-5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1 active:scale-[0.98]"
            >
              {initialData ? 'Apply Strategic Audit' : 'Initialize Monitoring'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
