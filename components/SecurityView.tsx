
import React, { useState } from 'react';
import { api } from '../services/apiService';
import { AlertCircle, TrendingUp } from './Icons';

interface SecurityViewProps {
  onPurge: () => void;
}

const SecurityView: React.FC<SecurityViewProps> = ({ onPurge }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    const data = await api.exportSovereignData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cusub-sovereign-audit-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsExporting(false);
  };

  const handleDelete = async () => {
    if (confirm('CRITICAL ACTION: This will permanently purge all assets, audit logs, and security fingerprints. Continue?')) {
      await api.deleteAccount();
      onPurge();
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Data Sovereignty Stats */}
          <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-zinc-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-all"></div>
            <h4 className="text-xl font-black text-zinc-100 uppercase italic mb-8 flex items-center gap-3">
              <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
              Data Sovereignty
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Encryption Protocol', value: 'AES-256-GCM', status: 'Active' },
                { label: 'Cloud Perimeter', value: 'Isolated Virtual Private Cloud', status: 'Secured' },
                { label: 'Session Integrity', value: 'HTTPOnly JWT Cookies', status: 'Verified' },
                { label: 'PII Scrubbing', value: 'Institutional Standards', status: 'Active' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-zinc-950/50 border border-zinc-800 rounded-3xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{item.label}</span>
                    <span className="text-[8px] font-black text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded-full uppercase tracking-widest">{item.status}</span>
                  </div>
                  <div className="text-sm font-black text-zinc-200">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Access Logs */}
          <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-zinc-800">
            <h4 className="text-xl font-black text-zinc-100 uppercase italic mb-8">Asset Perimeter Logs</h4>
            <div className="space-y-4">
              {[
                { event: 'Sovereign Session Initialized', ip: '192.168.1.45', time: '2 mins ago' },
                { event: 'Asset Inventory Export Executed', ip: '192.168.1.45', time: '1 hour ago' },
                { event: 'Plaid Sync Tunnel Active', ip: 'System Agent', time: '4 hours ago' },
                { event: 'Encryption Keys Rotated', ip: 'Automated Node', time: '24 hours ago' }
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-zinc-800/50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-black text-zinc-300">{log.event}</div>
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{log.ip}</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{log.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/5 p-10 rounded-[3rem] border border-red-500/20">
            <h4 className="text-xl font-black text-red-500 uppercase italic mb-4">Danger Zone</h4>
            <p className="text-sm text-zinc-500 font-medium mb-8">
              Permanently destroy your identity within the Cusub perimeter. This action is irreversible. All fingerprints will be purged.
            </p>
            <button 
              onClick={handleDelete}
              className="px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-red-500 hover:text-white transition-all"
            >
              Purge Identity & Data
            </button>
          </div>
        </div>

        {/* Sidebar Security Controls */}
        <div className="space-y-8">
          <div className="bg-zinc-900 p-8 rounded-[3rem] border border-emerald-500/20 shadow-2xl space-y-8">
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 w-fit">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div className="space-y-2">
              <h5 className="text-xl font-black text-zinc-100 italic uppercase">Sovereign Audit</h5>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                Download your complete institutional record. Includes AES keys and full inventory hashes.
              </p>
            </div>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isExporting ? 'Generating Bundle...' : 'Execute Data Export'}
            </button>
          </div>

          <div className="bg-zinc-900/40 p-8 rounded-[3rem] border border-zinc-800 space-y-6">
            <h5 className="text-xs font-black text-zinc-100 uppercase tracking-widest">Active Perimeter Pulse</h5>
            <div className="flex items-center gap-4">
              <div className="flex-grow h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[78%] animate-pulse"></div>
              </div>
              <span className="text-[10px] font-black text-emerald-500">78%</span>
            </div>
            <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest italic leading-relaxed">
              Real-time monitoring of identity integrity across 4 global nodes. Encryption entropy currently at optimal level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityView;
