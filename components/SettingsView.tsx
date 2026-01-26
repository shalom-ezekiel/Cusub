
import React, { useState } from 'react';
import { User } from '../types';

interface SettingsViewProps {
  user: User;
  onUpdate: (updates: Partial<User>) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ name, email });
    alert('Executive Preferences Synchronized.');
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-zinc-800 max-w-2xl">
        <h4 className="text-xl font-black text-zinc-100 uppercase italic mb-10 flex items-center gap-3">
          <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
          Profile Parameters
        </h4>
        
        <form onSubmit={handleSave} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-2">Executive Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-8 py-5 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-3xl outline-none transition-all font-bold text-zinc-100"
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-8 py-5 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-3xl outline-none transition-all font-bold text-zinc-100"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="px-10 py-5 bg-emerald-500 text-zinc-950 font-black rounded-3xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10"
            >
              Update Protocol
            </button>
          </div>
        </form>
      </div>

      <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-zinc-800 max-w-2xl">
        <h4 className="text-xl font-black text-zinc-100 uppercase italic mb-10 flex items-center gap-3">
          <div className="w-2 h-6 bg-violet-500 rounded-full"></div>
                      System Preferences
        </h4>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-6 bg-zinc-950/50 border border-zinc-800 rounded-3xl">
            <div>
              <div className="text-sm font-black text-zinc-100 uppercase">Alert Sensitivity</div>
              <div className="text-xs text-zinc-600 uppercase font-black tracking-widest mt-1">Notification Frequency</div>
            </div>
            <select className="bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl text-emerald-400 outline-none">
              <option>Aggressive</option>
              <option>Conservative</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-6 bg-zinc-950/50 border border-zinc-800 rounded-3xl">
            <div>
              <div className="text-sm font-black text-zinc-100 uppercase">Default Currency</div>
              <div className="text-xs text-zinc-600 uppercase font-black tracking-widest mt-1">Audit Unit Basis</div>
            </div>
            <select className="bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl text-emerald-400 outline-none">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
