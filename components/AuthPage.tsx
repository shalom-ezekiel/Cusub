
import React, { useState } from 'react';
import { User } from '../types';
import {
  firebaseSignInWithGoogle,
  firebaseSignInWithEmail,
  firebaseSignUpWithEmail,
  type FirebaseUser,
} from '../services/firebase';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
  onExit: () => void;
}

/** Convert a Firebase user into the app's User type */
function mapFirebaseUser(fbUser: FirebaseUser): User {
  return {
    id: fbUser.uid,
    email: fbUser.email || '',
    name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Agent',
    token: undefined,
    preferences: {
      default_currency: 'USD',
      alert_sensitivity: 'aggressive',
    },
  };
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onExit }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsGoogleProcessing(true);
    setError(null);
    try {
      const fbUser = await firebaseSignInWithGoogle();
      const user = mapFirebaseUser(fbUser);
      localStorage.setItem('cusub_user', JSON.stringify(user));
      onAuthSuccess(user);
    } catch (err: any) {
      setError(err?.message || 'Google sign-in failed. Please try again.');
    } finally {
      setIsGoogleProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = (formData.get('name') as string) || email.split('@')[0];
    const password = formData.get('password') as string;

    try {
      let fbUser: FirebaseUser;
      if (isLogin) {
        fbUser = await firebaseSignInWithEmail(email, password);
      } else {
        fbUser = await firebaseSignUpWithEmail(email, password, name);
      }
      const user = mapFirebaseUser(fbUser);
      localStorage.setItem('cusub_user', JSON.stringify(user));
      onAuthSuccess(user);
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please try again.');
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
            <div className="absolute -top-4 left-6 right-6 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full text-center">
              <span className="text-red-500 font-black text-[10px] uppercase tracking-widest">{error}</span>
            </div>
          )}

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleProcessing || isProcessing}
            className="w-full py-4 mb-6 bg-zinc-950 border border-zinc-700 hover:border-zinc-500 text-zinc-100 font-bold text-sm rounded-2xl transition-all hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isGoogleProcessing ? (
              <div className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {/* Google "G" icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-zinc-800"></div>
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-zinc-800"></div>
          </div>

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
                minLength={6}
                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-2xl outline-none transition-all text-sm font-bold text-zinc-100 placeholder:text-zinc-800"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing || isGoogleProcessing}
              className="w-full py-5 bg-emerald-500 text-zinc-950 font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/10 transition-all hover:bg-emerald-400 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (isLogin ? 'Authorize Session' : 'Create Identity')}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
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
