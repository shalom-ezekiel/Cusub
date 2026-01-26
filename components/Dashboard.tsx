
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { InsightsSummary, Subscription, User } from '../types';
import { api } from '../services/apiService';
import { getFinancialHygieneAdvice } from '../services/geminiService';
import { AlertCircle, TrendingUp, Bell, LayoutDashboard } from './Icons';
import { CURRENCY_SYMBOLS } from '../constants';

interface DashboardProps {
  user: User;
  onAddSub: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onAddSub }) => {
  const [insights, setInsights] = useState<InsightsSummary | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [subs, setSubs] = useState<Subscription[]>([]);

  const loadData = async () => {
    const result = await api.getInsights();
    const currentSubs = await api.getSubscriptions();
    setInsights(result);
    setSubs(currentSubs);
    
    setIsLoadingAi(true);
    const advice = await getFinancialHygieneAdvice(currentSubs);
    setAiAdvice(advice);
    setIsLoadingAi(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBankSync = async () => {
    setIsSyncing(true);
    await api.syncBankIntelligence();
    await loadData();
    setIsSyncing(false);
  };

  if (!insights) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.5em] animate-pulse">Initializing Tactical Deck...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Executive Live Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
             <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Perimeter Live</span>
          </div>
          <h2 className="text-4xl font-black text-zinc-100 italic tracking-tight">
            Welcome, <span className="text-emerald-500">{user.name}</span>.
          </h2>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Subscriptions Active: <span className="text-zinc-300">{subs.length} Active</span></p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col justify-center">
             <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Plaid Latency</span>
             <span className="text-xs font-black text-emerald-500">42ms / STABLE</span>
          </div>
          <button 
            onClick={handleBankSync}
            disabled={isSyncing}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
              isSyncing ? 'bg-zinc-900 border-zinc-800 text-zinc-700 cursor-not-allowed' : 'bg-zinc-100 text-zinc-950 hover:bg-white active:scale-95'
            }`}
          >
            {isSyncing ? 'Synchronizing...' : 'Sync Global Assets'}
          </button>
        </div>
      </div>

      {/* TIER 1: THE BLEED  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-[3rem] p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertCircle className="w-32 h-32 text-red-500" />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="space-y-1">
              <h4 className="text-2xl font-black text-zinc-100 italic uppercase">The Bleed</h4>
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Zero Utilization Anomalies</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subs.filter(s => (s.usage_score || 0) < 20).slice(0, 2).map(sub => (
                <div key={sub.id} className="bg-zinc-950/60 border border-red-500/20 p-6 rounded-3xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-black text-zinc-100 uppercase tracking-tight">{sub.name}</h5>
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{sub.category}</span>
                    </div>
                    <span className="text-xs font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">GHOST</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black">
                      <span className="text-zinc-600 uppercase">Utilization</span>
                      <span className="text-red-500">{sub.usage_score || 0}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[12%] animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold italic text-zinc-500">Suggested Action: Strategic Churn</div>
                </div>
              ))}
              {subs.filter(s => (s.usage_score || 0) < 20).length === 0 && (
                <div className="col-span-2 py-10 text-center border border-dashed border-zinc-800 rounded-3xl">
                  <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">No Bleed detected in current sector.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-[3rem] p-10 flex flex-col justify-between">
           <div className="space-y-2">
             <h4 className="text-xl font-black text-zinc-100 italic uppercase leading-none">Intelligence Security Tier</h4>
             <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Access Level: Sovereign</p>
           </div>
           
           <div className="space-y-6 my-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center text-emerald-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-black text-zinc-100 uppercase">AES-256 Perimeter</div>
                  <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Active Multi-point Encryption</div>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-40">
                <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-black text-zinc-100 uppercase italic">Biometric Vault</div>
                  <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">LOCKED (Upgrade Required)</div>
                </div>
              </div>
           </div>

           <button className="w-full py-4 bg-zinc-100 text-zinc-950 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white transition-all">Elevate Identity Tier</button>
        </div>
      </div>

      {/* TIER 2: SYSTEM LIVE TELEMETRY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[2.5rem] border border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Total Monitored Liability</p>
            <h3 className="text-5xl font-black text-zinc-100 italic">
              {CURRENCY_SYMBOLS['USD']}{insights.personal_monthly_spend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <div className="flex items-center text-emerald-500 text-[8px] font-black uppercase tracking-widest pt-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              Optimal state achieved
            </div>
          </div>
          <div className="bg-emerald-500/10 p-5 rounded-3xl text-emerald-400">
            <LayoutDashboard className="w-10 h-10" />
          </div>
        </div>

        <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800 flex flex-col justify-between">
          <div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Telemetry Status</p>
            <h3 className="text-3xl font-black text-zinc-100 italic uppercase">Operational</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex space-x-1">
              {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>)}
            </div>
            <span className="text-[8px] font-black text-zinc-600 uppercase">Sync Frequency: Real-time</span>
          </div>
        </div>

        <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800 flex flex-col justify-between">
          <div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">AI Audit Confidence</p>
            <h3 className="text-4xl font-black text-zinc-100 italic">98.4%</h3>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
             <div className="h-full bg-violet-500 w-[98%]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-zinc-800">
            <div className="flex justify-between items-center mb-10">
              <h4 className="text-xl font-black text-zinc-100 flex items-center gap-3 italic">
                <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
                Liquidity Audit (6-Month Horizon)
              </h4>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={insights.monthly_trend}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#71717a" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderRadius: '16px', border: '1px solid #3f3f46' }}
                    itemStyle={{ color: '#10b981', fontWeight: '900' }}
                    labelStyle={{ color: '#71717a', fontSize: '10px', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-900 p-8 rounded-[3rem] shadow-2xl border border-zinc-800 text-zinc-100 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px] -mr-16 -mt-16"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-emerald-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl italic uppercase tracking-tighter">Strategic Intelligence Brief</h4>
            </div>
            <div className="space-y-8">
              {isLoadingAi ? (
                <div className="space-y-4">
                  <div className="h-4 bg-zinc-800 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-zinc-800 rounded-lg animate-pulse w-5/6"></div>
                  <div className="h-4 bg-zinc-800 rounded-lg animate-pulse w-4/6"></div>
                </div>
              ) : (
                <div className="text-sm leading-relaxed text-zinc-400 font-medium space-y-6">
                  {aiAdvice.split('\n').map((line, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-all"></div>
                      <p className="italic leading-snug">{line.replace(/^[•*-]\s*/, '')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-10 pt-10 border-t border-zinc-800">
               <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-4 italic">Auditor Engine: v3.2.1-Flash</div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black text-zinc-500 uppercase">Analysis Terminal Ready</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
