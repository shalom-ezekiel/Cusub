import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SubscriptionList from './components/SubscriptionList';
import SubscriptionForm from './components/SubscriptionForm';
import SecurityView from './components/SecurityView';
import AlertsView from './components/AlertsView';
import SettingsView from './components/SettingsView';
import AuthPage from './components/AuthPage';
import { User, Subscription } from './types';
import { api } from './services/apiService';
import { auth, onAuthStateChanged, firebaseSignOut } from './services/firebase';

const ControlCenter: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const [view, setView] = useState<'dashboard' | 'inventory' | 'security' | 'alerts' | 'settings'>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentUser, setCurrentUser] = useState<User>(user);

  const handleAddOrUpdateSub = async (data: Omit<Subscription, 'id' | 'is_active'>) => {
    if (editingSub) {
      await api.updateSubscription(editingSub.id, data);
    } else {
      await api.addSubscription(data);
    }
    setIsFormOpen(false);
    setEditingSub(undefined);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    localStorage.setItem('cusub_user', JSON.stringify(updated));
  };

  return (
    <Layout
      activeView={view}
      onViewChange={setView}
      onAddClick={() => {
        setEditingSub(undefined);
        setIsFormOpen(true);
      }}
      onLogout={onLogout}
      user={currentUser}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={view + refreshTrigger}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          {view === 'dashboard' ? (
            <Dashboard user={currentUser} onAddSub={() => setIsFormOpen(true)} />
          ) : view === 'inventory' ? (
            <SubscriptionList 
              onEdit={(sub) => {
                setEditingSub(sub);
                setIsFormOpen(true);
              }}
              onRefresh={() => setRefreshTrigger(prev => prev + 1)}
            />
          ) : view === 'security' ? (
            <SecurityView onPurge={onLogout} />
          ) : view === 'settings' ? (
            <SettingsView user={currentUser} onUpdate={handleUpdateUser} />
          ) : (
            <AlertsView />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isFormOpen && (
          <SubscriptionForm
            initialData={editingSub}
            onClose={() => setIsFormOpen(false)}
            onSave={handleAddOrUpdateSub}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      try {
        if (firebaseUser) {
          const appUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Agent',
            preferences: {
              default_currency: 'USD',
              alert_sensitivity: 'aggressive',
            },
          };

          // Merge with any saved preferences from localStorage
          const savedUser = localStorage.getItem('cusub_user');
          if (savedUser) {
            try {
              const parsed = JSON.parse(savedUser);
              if (parsed.id === firebaseUser.uid && parsed.preferences) {
                appUser.preferences = parsed.preferences;
              }
              if (parsed.name && parsed.name !== 'Agent') {
                appUser.name = parsed.name;
              }
            } catch {
              // Ignore parse errors — use defaults
            }
          }

          localStorage.setItem('cusub_user', JSON.stringify(appUser));
          setUser(appUser);
          setShowAuth(false);
        } else {
          setUser(null);
          localStorage.removeItem('cusub_user');
        }
      } catch (error) {
        // Never crash on auth state errors
        console.error('Auth state error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch {
      // If Firebase sign-out fails, still clear local state
      console.error('Logout error — clearing local state');
    }
    await api.logout();
    setUser(null);
    setShowAuth(false);
  };

  // Show a loading spinner while Firebase checks session
  if (isLoading) {
    return (
      <div className="antialiased text-zinc-100 bg-zinc-950 min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-emerald-500 rounded-[1.4rem] flex items-center justify-center text-zinc-950 font-black text-3xl shadow-[0_0_60px_rgba(16,185,129,0.2)] mb-6 animate-pulse">
          C
        </div>
        <div className="w-8 h-8 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
      <AnimatePresence mode="wait">
        {!user && !showAuth ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="antialiased text-zinc-100 bg-zinc-950 min-h-screen"
          >
            <LandingPage onGetStarted={() => setShowAuth(true)} />
          </motion.div>
        ) : !user && showAuth ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="antialiased text-zinc-100 bg-zinc-950 min-h-screen" 
          >
            <AuthPage 
              onAuthSuccess={handleAuthSuccess} 
              onExit={() => setShowAuth(false)} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="antialiased text-zinc-100 bg-zinc-950 min-h-screen"
          >
            <ControlCenter user={user!} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
  );
};

export default App;
