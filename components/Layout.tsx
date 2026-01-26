
import React from 'react';
import { LayoutDashboard, List, Bell, Plus } from './Icons';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: 'dashboard' | 'inventory' | 'security' | 'alerts' | 'settings';
  onViewChange: (view: 'dashboard' | 'inventory' | 'security' | 'alerts' | 'settings') => void;
  onAddClick: () => void;
  onLogout: () => void;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, onAddClick, onLogout, user }) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row selection:bg-emerald-500/30">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-80 bg-zinc-950 border-r border-zinc-900 p-8 flex flex-col">
        <div className="flex items-center gap-4 mb-16 px-2">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-zinc-950 font-black text-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            C
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-zinc-100 italic">Cusub.</h1>
        </div>

        <nav className="space-y-4 flex-grow">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[2.5rem] transition-all duration-500 ${
              activeView === 'dashboard' 
                ? 'bg-emerald-500 text-zinc-950 font-black shadow-lg shadow-emerald-500/10' 
                : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900'
            }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-sm font-black uppercase tracking-[0.1em]">Intelligence Deck</span>
          </button>
          <button
            onClick={() => onViewChange('inventory')}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[2.5rem] transition-all duration-500 ${
              activeView === 'inventory' 
                ? 'bg-emerald-500 text-zinc-950 font-black shadow-lg shadow-emerald-500/10' 
                : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900'
            }`}
          >
            <List className="w-6 h-6" />
            <span className="text-sm font-black uppercase tracking-[0.1em]">Asset Inventory</span>
          </button>
          <button
            onClick={() => onViewChange('security')}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[2.5rem] transition-all duration-500 ${
              activeView === 'security' 
                ? 'bg-emerald-500 text-zinc-950 font-black shadow-lg shadow-emerald-500/10' 
                : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span className="text-sm font-black uppercase tracking-[0.1em]">Security Tiers</span>
          </button>
          <button
            onClick={() => onViewChange('settings')}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[2.5rem] transition-all duration-500 ${
              activeView === 'settings' 
                ? 'bg-emerald-500 text-zinc-950 font-black shadow-lg shadow-emerald-500/10' 
                : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="text-sm font-black uppercase tracking-[0.1em]">Preferences</span>
          </button>
          
          <div className="pt-10">
            <h5 className="px-6 text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-6">Operations</h5>
            <button 
              onClick={() => onViewChange('alerts')}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-[2rem] transition-all duration-500 ${
                activeView === 'alerts' 
                  ? 'bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/10' 
                  : 'text-zinc-600 hover:text-zinc-100 hover:bg-zinc-900'
              }`}
            >
              <Bell className="w-6 h-6" />
              <span className="text-sm font-black uppercase tracking-[0.1em]">Anomaly Stream</span>
            </button>
          </div>
        </nav>

        <div className="mt-auto pt-10 border-t border-zinc-900 flex flex-col gap-6">
          <div className="flex items-center gap-4 px-2">
            <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center text-zinc-700 font-black uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-sm font-black text-zinc-100 truncate italic">{user.name}</p>
              <p className="text-[10px] font-bold text-zinc-600 truncate uppercase tracking-widest">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full py-4 px-2 text-left text-zinc-600 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-3"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Secure Exit
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 md:p-16 overflow-y-auto">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] mb-3">Sovereign Control Node</div>
            <h2 className="text-5xl font-black text-zinc-100 tracking-tighter uppercase italic">
              {activeView === 'dashboard' ? 'Strategic Intelligence' : 
               activeView === 'inventory' ? 'Asset Inventory' : 
               activeView === 'security' ? 'Security Perimeter' : 
               activeView === 'settings' ? 'Executive Settings' : 'Perimeter Alerts'}
            </h2>
          </div>
          <button 
            onClick={onAddClick}
            className="flex items-center gap-3 bg-zinc-100 text-zinc-950 px-10 py-5 rounded-3xl font-black text-lg shadow-2xl hover:bg-white hover:-translate-y-1 transition-all active:scale-95"
          >
            <Plus className="w-6 h-6" />
            Ingest Asset
          </button>
        </header>

        <div className="max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
