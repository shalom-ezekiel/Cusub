
import React, { useState, useEffect } from 'react';
import { Subscription } from '../types';
import { api } from '../services/apiService';
import { Trash, Plus, AlertCircle } from './Icons';
import { CURRENCY_SYMBOLS } from '../constants';

interface SubscriptionListProps {
  onEdit: (sub: Subscription) => void;
  onRefresh: () => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ onEdit, onRefresh }) => {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'cost' | 'date' | 'name'>('date');
  const [conciergeLoading, setConciergeLoading] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  useEffect(() => {
    loadSubs();
  }, [onRefresh]);

  const loadSubs = async () => {
    const data = await api.getSubscriptions();
    setSubs(data);
  };

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSubs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubs.map(s => s.id));
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Archive this asset and stop monitoring?')) {
      await api.deleteSubscription(id);
      loadSubs();
      onRefresh();
    }
  };

  const handleBulkArchive = async () => {
    if (window.confirm(`Archive ${selectedIds.length} assets permanently?`)) {
      setIsBulkProcessing(true);
      await api.bulkDeleteSubscriptions(selectedIds);
      setSelectedIds([]);
      await loadSubs();
      onRefresh();
      setIsBulkProcessing(false);
    }
  };

  const handleBulkDeactivate = async () => {
    setIsBulkProcessing(true);
    await api.bulkUpdateSubscriptions(selectedIds, { is_active: false });
    setSelectedIds([]);
    await loadSubs();
    onRefresh();
    setIsBulkProcessing(false);
  };

  const handleConcierge = (sub: Subscription, e: React.MouseEvent) => {
    e.stopPropagation();
    setConciergeLoading(sub.id);
    setTimeout(() => {
      const emailDraft = `To: ${sub.name} Support\nSubject: Cancellation of Account\n\nI am writing to formally request the immediate cancellation of my ${sub.name} subscription effective today. Please confirm receipt of this request and that no further charges will be applied.`;
      alert(`CONCIERGE DRAFT GENERATED:\n\n${emailDraft}`);
      setConciergeLoading(null);
    }, 1500);
  };

  const filteredSubs = subs
    .filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) || s.category.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'cost') return b.cost - a.cost;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(a.next_due_date).getTime() - new Date(b.next_due_date).getTime();
    });

  return (
    <div className="relative bg-zinc-900/40 rounded-[3rem] shadow-sm border border-zinc-800 overflow-hidden animate-in slide-in-from-bottom-4 duration-700">
      
      {/* Bulk Action Bar - Sticky */}
      {selectedIds.length > 0 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-fit px-8 py-5 bg-zinc-950/90 backdrop-blur-xl border border-emerald-500/30 rounded-full flex items-center gap-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-300">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">{selectedIds.length} Assets Targeted</span>
          </div>
          <div className="h-4 w-px bg-zinc-800"></div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBulkDeactivate}
              disabled={isBulkProcessing}
              className="text-[10px] font-black text-zinc-100 uppercase tracking-widest hover:text-emerald-400 transition-colors disabled:opacity-50"
            >
              Mark Inactive
            </button>
            <button 
              onClick={handleBulkArchive}
              disabled={isBulkProcessing}
              className="px-6 py-2 bg-red-500 text-zinc-950 font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-red-400 transition-all active:scale-95 disabled:opacity-50"
            >
              Archive Group
            </button>
          </div>
          <button 
            onClick={() => setSelectedIds([])}
            className="p-2 text-zinc-600 hover:text-zinc-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      <div className="p-10 border-b border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-zinc-900/20">
        <div>
          <h3 className="text-2xl font-black text-zinc-100 italic uppercase">Asset Inventory</h3>
          <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mt-1">Institutional Audit Layer</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search assets..."
            className="px-6 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-1 focus:ring-emerald-500 outline-none transition-all w-full sm:w-64 text-zinc-200 placeholder:text-zinc-700 font-bold"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <select 
            className="px-6 py-3 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded-2xl focus:ring-1 focus:ring-emerald-500 outline-none font-black text-[10px] uppercase tracking-widest"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
          >
            <option value="date">Billing Timeline</option>
            <option value="cost">Liability Depth</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-zinc-950/50 text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
            <tr>
              <th className="px-10 py-6 w-10">
                <div 
                  onClick={toggleSelectAll}
                  className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-all ${
                    selectedIds.length === filteredSubs.length && filteredSubs.length > 0
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'border-zinc-800 bg-zinc-900'
                  }`}
                >
                  {selectedIds.length === filteredSubs.length && filteredSubs.length > 0 && (
                    <svg className="w-3 h-3 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
              </th>
              <th className="px-10 py-6">Asset Entity</th>
              <th className="px-10 py-6">Exposure</th>
              <th className="px-10 py-6">Share</th>
              <th className="px-10 py-6">Next Settlement</th>
              <th className="px-10 py-6 text-right">Operation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {filteredSubs.map((sub) => {
              const isUrgent = new Date(sub.next_due_date).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;
              const hasHike = sub.last_cost && sub.cost > sub.last_cost;
              const isSelected = selectedIds.includes(sub.id);
              const isInactive = !sub.is_active;

              return (
                <tr 
                  key={sub.id} 
                  onClick={() => onEdit(sub)}
                  className={`hover:bg-zinc-800/30 cursor-pointer transition-colors group ${isSelected ? 'bg-emerald-500/5' : ''} ${isInactive ? 'opacity-40 grayscale' : ''}`}
                >
                  <td className="px-10 py-8" onClick={(e) => toggleSelect(sub.id, e)}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-800 bg-zinc-900'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>
                      )}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-black text-zinc-600 group-hover:text-emerald-500 transition-all text-xl">
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-zinc-100 text-lg uppercase italic flex items-center gap-2">
                          {sub.name}
                          {hasHike && <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[8px] font-black rounded-full border border-red-500/20">PRICE HIKE</span>}
                        </div>
                        <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1">{sub.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="font-black text-zinc-100 text-lg">
                      {CURRENCY_SYMBOLS[sub.currency]}{sub.cost.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{sub.billing_cycle}</div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(sub.shared_count, 3))].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-950 flex items-center justify-center text-[8px] text-zinc-500 font-black">
                            {i < 2 ? 'U' : `+${sub.shared_count - 2}`}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                        Your part: ${ (sub.cost / sub.shared_count).toFixed(2) }
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className={`text-sm font-black ${isUrgent ? 'text-amber-400' : 'text-zinc-400'}`}>
                      {new Date(sub.next_due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right space-x-2">
                    <button 
                      onClick={(e) => handleConcierge(sub, e)}
                      disabled={conciergeLoading === sub.id}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-zinc-700"
                    >
                      {conciergeLoading === sub.id ? 'Drafting...' : 'Concierge Exit'}
                    </button>
                    <button 
                      onClick={(e) => handleDelete(sub.id, e)}
                      className="p-3 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionList;
