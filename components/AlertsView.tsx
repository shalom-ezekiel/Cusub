
import React, { useState, useEffect } from 'react';
import { api } from '../services/apiService';
import { Alert } from '../types';
// Fixed: Added TrendingUp to the imports
import { Bell, AlertCircle, Trash, TrendingUp } from './Icons';

const AlertsView: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAlerts = async () => {
    const data = await api.getAlerts();
    setAlerts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await api.markAlertAsRead(id);
    loadAlerts();
  };

  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  if (isLoading) return <div className="p-8 text-center text-zinc-500 animate-pulse font-black uppercase text-xs tracking-widest">Scanning Perimeter...</div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Perimeter Integrity</p>
            <h3 className="text-4xl font-black text-zinc-100">Healthy</h3>
          </div>
          <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
        </div>

        <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800 flex flex-col justify-between">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Active Alerts</p>
          <h3 className="text-4xl font-black text-zinc-100">{alerts.filter(a => !a.isRead).length}</h3>
        </div>

        <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800 flex flex-col justify-between">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Muted Systems</p>
          <h3 className="text-4xl font-black text-zinc-100 italic">0</h3>
        </div>
      </div>

      <div className="bg-zinc-900/40 rounded-[3rem] border border-zinc-800 overflow-hidden">
        <div className="p-10 border-b border-zinc-800 bg-zinc-900/20 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-zinc-100 uppercase italic">Threat Stream</h3>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Real-time Fiscal Anomalies</p>
          </div>
          <button className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-zinc-100 transition-colors">Acknowledge All</button>
        </div>

        <div className="divide-y divide-zinc-800/50">
          {alerts.length === 0 ? (
            <div className="p-20 text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-800 rounded-3xl flex items-center justify-center text-zinc-700 mx-auto">
                <Bell className="w-8 h-8" />
              </div>
              <p className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Perimeter clear. No anomalies detected.</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-10 flex gap-8 group transition-all hover:bg-zinc-800/20 ${alert.isRead ? 'opacity-40' : ''}`}
              >
                <div className={`shrink-0 w-16 h-16 rounded-3xl border flex items-center justify-center ${getSeverityStyles(alert.severity)}`}>
                  {alert.type === 'renewal' && <Bell className="w-8 h-8" />}
                  {alert.type === 'price_hike' && <TrendingUp className="w-8 h-8" />}
                  {alert.type === 'usage' && <AlertCircle className="w-8 h-8" />}
                  {alert.type === 'security' && <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                </div>
                
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border mb-2 inline-block ${getSeverityStyles(alert.severity)}`}>
                        {alert.severity} Priority
                      </span>
                      <h4 className="text-xl font-black text-zinc-100 italic uppercase leading-none">{alert.title}</h4>
                    </div>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed max-w-3xl italic">{alert.description}</p>
                </div>

                <div className="shrink-0 flex items-center gap-4">
                  {!alert.isRead && (
                    <button 
                      onClick={() => handleMarkAsRead(alert.id)}
                      className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                    >
                      Acknowledge
                    </button>
                  )}
                  <button className="p-3 text-zinc-800 hover:text-red-500 transition-colors">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="p-10 bg-zinc-900 p-8 rounded-[3rem] border border-zinc-800 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-violet-500/10 rounded-2xl text-violet-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-black text-zinc-100 uppercase italic">Subscription Alerts</h4>
        </div>
        <p className="text-sm text-zinc-500 font-medium leading-relaxed italic max-w-2xl mb-8">
          Notifications are generated by the core tracking engine. The system monitors subscription renewal dates, usage anomalies, and seat utilization scores in real-time.        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
             <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Email Routing: Secured</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
             <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Push Notifications: Active</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
             <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Slack Integration: Enabled</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsView;
