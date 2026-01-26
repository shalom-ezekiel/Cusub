
import React, { useState } from 'react';
import { User } from '../types';
import { api } from '../services/apiService';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
  onExit: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onExit }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string || email.split('@')[0];
    const password = formData.get('password') as string;

    try {
      // For this high-fidelity mock, we simulate network latency and security handshake
      const user = await api.login(email, name);
      onAuthSuccess(user);
    } catch (err) {
      setError('Handshake failed. Verify credentials and perimeter access.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md relative z-10 space-y-10 animate-in fade-in zoom-in-95 duration-1000">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 bg-emerald-500 rounded-[1.8rem] flex items-center justify-center text-zinc-950 font-black text-4xl shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            C
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-zinc-100 tracking-tighter uppercase italic">
              {isLogin ? 'Secure Access' : 'Identity Initialization'}
            </h1>
            <p className="text-zinc-500 font-black uppercase text-[8px] tracking-[0.4em]">Role Assignment</p>
          </div>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800 p-10 rounded-[3rem] shadow-2xl relative">
          {error && (
            <div className="absolute -top-4 left-10 right-10 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full text-center">
              <span className="text-red-500 font-black text-[10px] uppercase tracking-widest">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-2">Cusub Hub</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-2xl outline-none transition-all text-sm font-bold text-zinc-100 placeholder:text-zinc-800"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-2">Asset Identifier (Email)</label>
              <input
                required
                name="email"
                type="email"
                placeholder="name@company.com"
                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-2xl outline-none transition-all text-sm font-bold text-zinc-100 placeholder:text-zinc-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-2">Access Cipher (Password)</label>
              <input
                required
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-2xl outline-none transition-all text-sm font-bold text-zinc-100 placeholder:text-zinc-800"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-5 bg-emerald-500 text-zinc-950 font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/10 transition-all hover:bg-emerald-400 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (isLogin ? 'Authorize Session' : 'Create Identity')}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-zinc-500 hover:text-emerald-400 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <span>{isLogin ? 'Want to track your subscriptions?' : 'Already have an identity?'}</span>
              <span className="text-zinc-100 italic">{isLogin ? 'Initialize' : 'Access'}</span>
            </button>
          </div>
        </div>

        <button 
          onClick={onExit}
          className="w-full text-zinc-700 font-black uppercase text-[10px] tracking-[0.5em] hover:text-zinc-400 transition-colors"
        >
          ← Abort Session
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
