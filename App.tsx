
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import LandingPage from './components/LandingPage';
// import Layout from './components/Layout';
// import Dashboard from './components/Dashboard';
// import SubscriptionList from './components/SubscriptionList';
// import SubscriptionForm from './components/SubscriptionForm';
// import SecurityView from './components/SecurityView';
// import AlertsView from './components/AlertsView';
// import SettingsView from './components/SettingsView';
// import AuthPage from './components/AuthPage';
// import { User, Subscription } from './types';
// import { api } from './services/apiService';

// const ControlCenter: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
//   const [view, setView] = useState<'dashboard' | 'inventory' | 'security' | 'alerts' | 'settings'>('dashboard');
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingSub, setEditingSub] = useState<Subscription | undefined>(undefined);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [currentUser, setCurrentUser] = useState<User>(user);

//   const handleAddOrUpdateSub = async (data: Omit<Subscription, 'id' | 'is_active'>) => {
//     if (editingSub) {
//       await api.updateSubscription(editingSub.id, data);
//     } else {
//       await api.addSubscription(data);
//     }
//     setIsFormOpen(false);
//     setEditingSub(undefined);
//     setRefreshTrigger(prev => prev + 1);
//   };

//   const handleUpdateUser = (updates: Partial<User>) => {
//     const updated = { ...currentUser, ...updates };
//     setCurrentUser(updated);
//     localStorage.setItem('cusub_user', JSON.stringify(updated));
//   };

//   return (
//     <Layout
//       activeView={view}
//       onViewChange={setView}
//       onAddClick={() => {
//         setEditingSub(undefined);
//         setIsFormOpen(true);
//       }}
//       onLogout={onLogout}
//       user={currentUser}
//     >
//       {view === 'dashboard' ? (
//         <Dashboard key={`dashboard-${refreshTrigger}`} user={currentUser} onAddSub={() => setIsFormOpen(true)} />
//       ) : view === 'inventory' ? (
//         <SubscriptionList 
//           onEdit={(sub) => {
//             setEditingSub(sub);
//             setIsFormOpen(true);
//           }}
//           onRefresh={() => setRefreshTrigger(prev => prev + 1)}
//         />
//       ) : view === 'security' ? (
//         <SecurityView onPurge={onLogout} />
//       ) : view === 'settings' ? (
//         <SettingsView user={currentUser} onUpdate={handleUpdateUser} />
//       ) : (
//         <AlertsView />
//       )}

//       {isFormOpen && (
//         <SubscriptionForm
//           initialData={editingSub}
//           onClose={() => setIsFormOpen(false)}
//           onSave={handleAddOrUpdateSub}
//         />
//       )}
//     </Layout>
//   );
// };

// const App: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [showAuth, setShowAuth] = useState(false);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('cusub_user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const handleAuthSuccess = (userData: User) => {
//     setUser(userData);
//     setShowAuth(false);
//   };

//   const handleLogout = async () => {
//     await api.logout();
//     setUser(null);
//     setShowAuth(false);
//   };

//   if (!user && !showAuth) {
//     return <LandingPage onGetStarted={() => setShowAuth(true)} />;
//   }

//   if (!user && showAuth) {
//     return (
//       <AuthPage 
//         onAuthSuccess={handleAuthSuccess} 
//         onExit={() => setShowAuth(false)} 
//       />
//     );
//   }

//   return user ? <ControlCenter user={user} onLogout={handleLogout} /> : null;
// };

// export default App;


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

  useEffect(() => {
    const savedUser = localStorage.getItem('cusub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    setShowAuth(false);
  };

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
