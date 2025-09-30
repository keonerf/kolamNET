import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LoginPage from './components/LoginPage';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ImageAnalyzer from './components/ImageAnalyzer';
import KolamBoard from './components/KolamBoard';
import CameraAnalyzer from './components/CameraAnalyzer';
import { User } from '@supabase/supabase-js';

type ActiveTab = 'dashboard' | 'analyzer' | 'board' | 'camera';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setActiveTab('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'analyzer':
        return <ImageAnalyzer />;
      case 'board':
        return <KolamBoard />;
      case 'camera':
        return <CameraAnalyzer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onSignOut={handleSignOut}
      />
      <main className="pt-16">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;